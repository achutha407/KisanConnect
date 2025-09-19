#include <WiFi.h>
#include <HTTPClient.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>
#include <DHT.h>

// ---------- WiFi + Thingspeak ----------
const char* ssid = "YOUR_WIFI";
const char* password = "YOUR_PASS";
String apiKey = "RO0Z4UWSNP3500CM";
const char* server = "http://api.thingspeak.com/update";

// ---------- Sensors ----------
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

#define SOILPIN 34
#define LDRPIN 35
#define TRIGPIN 27
#define ECHOPIN 26
#define RELAYPIN 25
#define MAGPIN 32

// ---------- OLED ----------
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  Serial.begin(115200);
  delay(10000); // startup delay so you can dip sensors

  pinMode(RELAYPIN, OUTPUT);
  pinMode(TRIGPIN, OUTPUT);
  pinMode(ECHOPIN, INPUT);
  pinMode(MAGPIN, INPUT);

  dht.begin();

  // OLED init
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED not found");
    for (;;);
  }
  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(WHITE);
  display.setCursor(0, 10);
  display.println("Smart Farm");
  display.display();
  delay(2000);

  // WiFi init
  WiFi.begin(ssid, password);
  display.clearDisplay();
  display.setCursor(0, 0);
  display.setTextSize(1);
  display.println("WiFi Connecting...");
  display.display();

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("WiFi Connected");
  display.display();
  delay(1000);
}

void loop() {
  // --- Read sensors ---
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  int soil = analogRead(SOILPIN);
  int ldr = analogRead(LDRPIN);

  // ultrasonic distance
  digitalWrite(TRIGPIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIGPIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIGPIN, LOW);
  long duration = pulseIn(ECHOPIN, HIGH);
  int distance = duration * 0.034 / 2;

  // magnetic sensor
  int mag = digitalRead(MAGPIN);

  // --- Show on Serial ---
  Serial.print("Temp: "); Serial.print(t);
  Serial.print(" Hum: "); Serial.print(h);
  Serial.print(" Soil: "); Serial.print(soil);
  Serial.print(" LDR: "); Serial.print(ldr);
  Serial.print(" Dist: "); Serial.print(distance);
  Serial.print(" Magnet: "); Serial.println(mag);

  // --- Show on OLED ---
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("Farm Monitor");
  display.setTextSize(1);
  display.setCursor(0, 12);
  display.printf("T:%.1fC H:%.1f%%", t, h);
  display.setCursor(0, 24);
  display.printf("Soil:%d", soil);
  display.setCursor(0, 36);
  display.printf("Light:%d", ldr);
  display.setCursor(0, 48);
  display.printf("Dist:%dcm Mag:%d", distance, mag);
  display.display();

  // --- Relay control (example) ---
  if (soil > 3000) {
    digitalWrite(RELAYPIN, HIGH); // water ON
  } else {
    digitalWrite(RELAYPIN, LOW); // water OFF
  }

  // --- Send to ThingSpeak ---
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = server;
    url += "?api_key=" + apiKey;
    url += "&field1=" + String(t);
    url += "&field2=" + String(h);
    url += "&field3=" + String(soil);
    url += "&field4=" + String(ldr);
    url += "&field5=" + String(distance);
    url += "&field6=" + String(mag);

    http.begin(url.c_str());
    int httpCode = http.GET();
    if (httpCode > 0) {
      Serial.println("ThingSpeak Updated!");
    } else {
      Serial.println("Update Failed");
    }
    http.end();
  }

  delay(20000); // 20 sec gap for ThingSpeak
}
