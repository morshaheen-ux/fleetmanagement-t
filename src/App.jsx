import { useState, useEffect, useRef } from "react";

const INITIAL_DATA = {
  companies: ["Rangone", "SBDS", "Guardian"],
  managers: [
    { name: "Hussam Hamburg", company: "SBDS" },
    { name: "Saleh Munich", company: "SBDS" },
    { name: "Saleh DBW", company: "SBDS" },
    { name: "Basel NRW", company: "SBDS" },
    { name: "Mubarak NRW", company: "SBDS" },
    { name: "Saleh Hamburg DHH", company: "SBDS" },
    { name: "Malek DRP", company: "SBDS" },
    { name: "Abu Julia Hamburg", company: "Guardian" },
    { name: "Mazen Frankfurt", company: "Guardian" },
    { name: "Mazen NRW", company: "Guardian" },
    { name: "Saleh DBW1", company: "Guardian" },
    { name: "Tarek Hannover", company: "SBDS" },
    { name: "Tarek Munich", company: "Guardian" },
    { name: "Rangone", company: "Rangone" },
    { name: "Gemietete Autos", company: "Rangone" },
  ],
  cars: [
    { id: 1, plate: "HH GM 1424", name: "Alsaour Ghofran", model: "BMW 187", city: "Hamburg", manager: "Hussam Hamburg", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 2, plate: "HH NR 1086", name: "Albouzou Mohamad Raji", model: "VW Touran", city: "Hamburg", manager: "Hussam Hamburg", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 3, plate: "HH Q 6825", name: "Kusaybany Walaa", model: "VW Golf 1KP", city: "Hamburg", manager: "Hussam Hamburg", company: "SBDS", notes: "Rangeone + SBDS", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 4, plate: "WL SD1101", name: "Budri Oliver Christopher Germa", model: "Skoda Fabia", city: "Hamburg", manager: "Hussam Hamburg", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 5, plate: "RZ OD616", name: "Inser Obada", model: "Ford Focus", city: "Hamburg", manager: "Hussam Hamburg", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 6, plate: "WL MS887", name: "Mohammed Saad Mohammed Farahaldour", model: "VW Polo 6R", city: "Hamburg", manager: "Hussam Hamburg", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 7, plate: "HH Q6018", name: "Sedighi Njibullah", model: "VW Polo 6R", city: "Hamburg", manager: "Hussam Hamburg", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 8, plate: "OH GG 9999", name: "Barho Iman", model: "VW Golf 1KP", city: "Hamburg", manager: "Hussam Hamburg", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 9, plate: "HH AA 3777", name: "Al omar Ahmed", model: "Hyundai FDH", city: "Hamburg", manager: "Hussam Hamburg", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 10, plate: "PI IX 438", name: "Almasri Mohammad", model: "Chevrolet Matiz", city: "Hamburg", manager: "Hussam Hamburg", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 11, plate: "SE BL 713", name: "Alrahmoun Abd El kareem", model: "Hyundai Motor DFH", city: "Hamburg", manager: "Hussam Hamburg", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 12, plate: "H T 554", name: "Almohamadomaralrajeh Thaer", model: "BMW 1er Reihe 187", city: "Hamburg", manager: "Hussam Hamburg", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 13, plate: "M PA2149", name: "Mihaylov Yanis Georgiev", model: "Ford Fiesta JD3", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 14, plate: "M UY7008", name: "Kheshfeh Mohamad", model: "VW Golf 1J", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 15, plate: "M EN4138", name: "Soltani Wahid Ahmad", model: "Opel Corsa", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 16, plate: "M UU1999", name: "Mousli Mohamad Nour", model: "VW Polo 6R", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "Rangeone + SBDS", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 17, plate: "M AN9864", name: "Sido Ahmad", model: "Fiat Punto 199", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 18, plate: "M JP2420", name: "Angelov Yanko Asenov", model: "Opel Corsa -C", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 19, plate: "M RA6839", name: "Samil Hasan Amish", model: "Smart forfour 454", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 20, plate: "MUC KK297", name: "Asenova Monika", model: "VW Polo 6R", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 21, plate: "M YY3735", name: "Fattouh Mohamad Nour", model: "Renault Clio R", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 22, plate: "M KO1577", name: "Alyoussef Fatema", model: "Skoda Fabia 5J", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 23, plate: "M AR284", name: "Costea Maria-Alina", model: "VW Passat 3C", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 24, plate: "M XS9550", name: "Gkaragkasidis Michail", model: "Nissan Micra K11", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 25, plate: "MUC AY888", name: "Yosifov Albert Strahilov", model: "VW Polo 6R", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 26, plate: "M XS1025", name: "Hoque Shariful", model: "Toyota YAR XP9F", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 27, plate: "M RJ1998", name: "Sharif Ramadan", model: "Hyundai Motor CZ", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 28, plate: "M FU3911", name: "Mostafa Samir Mohamed Elgendy", model: "Toyota AYGO AB1", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 29, plate: "M GB7029", name: "Azizi Rahim", model: "Opel Corsa S-D", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 30, plate: "LA AY8611", name: "Nahar Abdalla", model: "VW Bora 1J", city: "Munich", manager: "Saleh Munich", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 31, plate: "S ZK1138", name: "Alkhter Mahmud", model: "VW Polo 9N", city: "DBW Stuttgart", manager: "Saleh DBW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 32, plate: "ES XO5505", name: "Altalab Abdullah", model: "Ford Focus C-Max", city: "DBW Stuttgart", manager: "Saleh DBW", company: "SBDS", notes: "Klein zulassung Fehlt", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 33, plate: "KA ET7012", name: "Assani Layth", model: "Chrysler C200 Kompressor", city: "DBW Stuttgart", manager: "Saleh DBW", company: "SBDS", notes: "Rangeone + SBDS", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 34, plate: "NT JS 1975", name: "Jomah Mohamad", model: "Opel Agila H-B", city: "DBW Stuttgart", manager: "Saleh DBW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 35, plate: "ES RG 4321", name: "Rahal Ahmad Chaaban", model: "VW Polo 6R", city: "DBW Stuttgart", manager: "Saleh DBW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 36, plate: "S PQ1312", name: "Mawal Hasan", model: "Opel Corsa S-D", city: "DBW Stuttgart", manager: "Saleh DBW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 37, plate: "S MR80", name: "Alnajem Mohammad", model: "Seat Ibiza 6L", city: "DBW Stuttgart", manager: "Saleh DBW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 38, plate: "BB OP 19", name: "Musaiev Emin", model: "VW Golf 1J", city: "DBW Stuttgart", manager: "Saleh DBW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 39, plate: "LB AB 2022", name: "Hagyousef Abdalkader", model: "VW Golf 1K", city: "DBW Stuttgart", manager: "Saleh DBW", company: "SBDS", notes: "Klein zulassung Fehlt", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 40, plate: "ES XS 4340", name: "Al Ali Muslim", model: "Ford Jas", city: "DBW Stuttgart", manager: "Saleh DBW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 41, plate: "AC FI733", name: "Alshallal Basel", model: "Hyundai Motor MXI", city: "NRW", manager: "Basel NRW", company: "SBDS", notes: "Klein zulassung Fehlt", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 42, plate: "OS SH36", name: "Scharaf Mazen", model: "Seat Ibiza 6L", city: "NRW", manager: "Basel NRW", company: "SBDS", notes: "Mohammad Alosman", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 43, plate: "BM QQ830", name: "Al zardo Mohammad", model: "Hyundai Motor (IND)", city: "NRW", manager: "Basel NRW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 44, plate: "K MC2341", name: "Alshallal Basel", model: "VW Golf 1K", city: "NRW", manager: "Basel NRW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 45, plate: "HSK P4503", name: "Al Melham Ali", model: "Mazda 6 GG1", city: "NRW", manager: "Basel NRW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 46, plate: "BM MR4747", name: "Abdo Osman Omar", model: "Opel Corsa BM11", city: "NRW", manager: "Basel NRW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 47, plate: "D NF 2010", name: "Alghabra Nour", model: "VW Golf 1K", city: "NRW", manager: "Basel NRW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 48, plate: "BM QG898", name: "KHodrawi Mohamed", model: "Ford fiesta", city: "NRW", manager: "Basel NRW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 49, plate: "K KN1938", name: "Alsatouf Mohamad", model: "Ford Fiesta JD3", city: "NRW", manager: "Mubarak NRW", company: "SBDS", notes: "Klein zulassung Fehlt", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 50, plate: "EU F2006", name: "Altoma Mohamad Amen", model: "VW Golf 1K", city: "NRW", manager: "Mubarak NRW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 51, plate: "AH SI2890", name: "Radwan Radwan", model: "VW Polo 9N", city: "NRW", manager: "Mubarak NRW", company: "SBDS", notes: "Rangeone + SBDS", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 52, plate: "DO AN996", name: "Aleid Nawras", model: "Opel Vectra C", city: "NRW", manager: "Mubarak NRW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 53, plate: "DO HO 1122", name: "Almodhi Muayad", model: "VW Touran", city: "NRW", manager: "Mubarak NRW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 54, plate: "DO XL 541", name: "Al sattam Qusay", model: "Skoda Fabia 5J", city: "NRW", manager: "Mubarak NRW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 55, plate: "DO AP 194", name: "Alhamad Malka", model: "Renault Megane Scenic", city: "NRW", manager: "Mubarak NRW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 56, plate: "BN MS5805", name: "Kallel Mehdi", model: "Hyundai Motor PA", city: "NRW", manager: "Mubarak NRW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 57, plate: "WAN LE23", name: "Kassar Mouayad", model: "Kia Picanto BA", city: "NRW", manager: "Mubarak NRW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 58, plate: "E QH 7916", name: "Al mohamad Mohamad", model: "Toyota Yaris XP9", city: "NRW", manager: "Mubarak NRW", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 59, plate: "HH A 4898", name: "Alsayed Ahmad Mohamad Saeed", model: "Peugot 206", city: "Hamburg", manager: "Saleh Hamburg DHH", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 60, plate: "HH J 2918", name: "Youssef Abdu Alfatah", model: "VW Passar 3C", city: "Hamburg", manager: "Saleh Hamburg DHH", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 61, plate: "FS EX 131", name: "Alsoleman Mohamad Al Khaled", model: "Opel Astra GTC", city: "Hamburg", manager: "Saleh Hamburg DHH", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 62, plate: "HH JA 1727", name: "Hritani Mohamad", model: "Mitsubishi Lancer CS0", city: "Hamburg", manager: "Saleh Hamburg DHH", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 63, plate: "HH Y 3160", name: "Chemdin Yousef", model: "VW Golf 1J", city: "Hamburg", manager: "Saleh Hamburg DHH", company: "SBDS", notes: "Rangeone + SBDS", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 64, plate: "NF SZ 2020", name: "Dabaliz Mohammad", model: "Mercedes Benz C220", city: "Hamburg", manager: "Saleh Hamburg DHH", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 65, plate: "SE SL6475", name: "Alsayed Ahmad", model: "Ford Fusion JU2", city: "Hamburg", manager: "Saleh Hamburg DHH", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 66, plate: "HH TN 941", name: "Maatuk Kamel", model: "Toyota Corolla E12U", city: "Hamburg", manager: "Saleh Hamburg DHH", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 67, plate: "HG OH 2002", name: "Almohammad Alkhal", model: "Opel Corsa C", city: "Grolsheim", manager: "Malek DRP", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 68, plate: "KH Z 9598", name: "Zadran Eid Marjan", model: "Opel Corsa C", city: "Grolsheim", manager: "Malek DRP", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 69, plate: "MZ TA9811", name: "Alibrahim Taha", model: "Picanto SA", city: "Grolsheim", manager: "Malek DRP", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 70, plate: "F MN 1111", name: "Alahmad Basel", model: "VW Golf 1K", city: "Grolsheim", manager: "Malek DRP", company: "SBDS", notes: "Klein zulassung Fehlt", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 71, plate: "MZ AR 810", name: "Al Bakur Rami", model: "VW Golf 1K", city: "Grolsheim", manager: "Malek DRP", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 72, plate: "PI SY596", name: "Baza Nour Mohamed Sifelnasr", model: "Honda Jazz GE2", city: "Hamburg", manager: "Abu Julia Hamburg", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 73, plate: "HH AS 5580", name: "Aljomaa Ahmad", model: "VW Golf 1KP", city: "Hamburg", manager: "Abu Julia Hamburg", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 74, plate: "HH ML 351", name: "Hammo Abdallah", model: "VW Polo 6N", city: "Hamburg", manager: "Abu Julia Hamburg", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 75, plate: "HH MH 2112", name: "Hajem Mohamed", model: "Chevrolet Aveo Klas", city: "Hamburg", manager: "Abu Julia Hamburg", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 76, plate: "HH RI 1900", name: "Ibrahim Ramadan", model: "VW Golf 1K", city: "Hamburg", manager: "Abu Julia Hamburg", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 77, plate: "PI UX199", name: "Rasoul Khalil", model: "Honda Jazz GE3", city: "Hamburg", manager: "Abu Julia Hamburg", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 78, plate: "HH O 6802", name: "Al Hassani Mohammad Kher", model: "VW Golf 1J", city: "Hamburg", manager: "Abu Julia Hamburg", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 79, plate: "HH MI 1994", name: "Al Hamed Mohamad Faiz", model: "Ford Fiesta JH1", city: "Hamburg", manager: "Abu Julia Hamburg", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 80, plate: "HH TX 2506", name: "Mustafa Sharfan", model: "VW Polo 6R", city: "Hamburg", manager: "Abu Julia Hamburg", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 81, plate: "HH P 2985", name: "Abdelrahman Elsayed", model: "Renault Megane SCE", city: "Hamburg", manager: "Abu Julia Hamburg", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 82, plate: "OH BQ1404", name: "Yassen Heba", model: "VW Tiguan 5N", city: "Hamburg", manager: "Abu Julia Hamburg", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 83, plate: "GG RB 158", name: "Refaat Al Yousef", model: "Hyundai Motor 110", city: "Frankfurt", manager: "Mazen Frankfurt", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 84, plate: "WI JL499", name: "Ahmadi Walid", model: "Ford Fiesta JA8", city: "Frankfurt", manager: "Mazen Frankfurt", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 85, plate: "WI T1713", name: "Tarar Luqman Ahmad", model: "VW Golf", city: "Frankfurt", manager: "Mazen Frankfurt", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 86, plate: "WI QQ739", name: "Qayoomi Ahamd Tamim", model: "Hyundai 110", city: "Frankfurt", manager: "Mazen Frankfurt", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 87, plate: "OF AL 7777", name: "Badnjki Ahmad Mutaz", model: "Chrysler C 180", city: "Frankfurt", manager: "Mazen Frankfurt", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 88, plate: "DA B 1194", name: "Mardinii Giwan", model: "Fiat Panda 169", city: "Frankfurt", manager: "Mazen Frankfurt", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 89, plate: "DI MY 20", name: "Badnjki Mahmoud Yamen", model: "Opel Astra G CC", city: "Frankfurt", manager: "Mazen Frankfurt", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 90, plate: "DA NM 140", name: "Mazaal Noyreddin", model: "Ford Focus DA3", city: "Frankfurt", manager: "Mazen Frankfurt", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 91, plate: "DA BS 993", name: "Shekfa Anas", model: "Opel Zafira BC11", city: "Frankfurt", manager: "Mazen Frankfurt", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 92, plate: "UH B 474", name: "Alhusain Ali", model: "Skoda Octavia", city: "Frankfurt", manager: "Mazen Frankfurt", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 93, plate: "BO QF602", name: "Khsrof Heba / Mardinli Gewan", model: "VW Golf Plus 1KP", city: "NRW", manager: "Mazen NRW", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 94, plate: "DIN Y6", name: "Hayder Ayat", model: "VW Golf 1K", city: "NRW", manager: "Mazen NRW", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 95, plate: "VIE MH202", name: "Alhamesh Mohammed", model: "Seat ibiza 6J", city: "NRW", manager: "Mazen NRW", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 96, plate: "OAL FH102", name: "Alkhelifa Fedaa", model: "Seat Ibiza 6L", city: "NRW", manager: "Mazen NRW", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 97, plate: "GE OW 8117", name: "Al kasser Khaled", model: "Hyundai Motor IX20", city: "NRW", manager: "Mazen NRW", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 98, plate: "BO XZ695", name: "Almugharbel Yoser", model: "Skoda Fabia 6Y", city: "NRW", manager: "Mazen NRW", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 99, plate: "BO QG139", name: "Ataiaa Mohammad Eid", model: "Skoda Fabia 5J", city: "NRW", manager: "Mazen NRW", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 100, plate: "DU EA327", name: "Jansiz Mohammad Aied", model: "Chevrolet Matiz Klak", city: "NRW", manager: "Mazen NRW", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 101, plate: "LU SY 92", name: "Altawel Belal", model: "Daimler C 200 CDI", city: "DBW1", manager: "Saleh DBW1", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 102, plate: "LU HA 103", name: "Alhafiz Adnan", model: "VW Golf plus 1KP", city: "DBW1", manager: "Saleh DBW1", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 103, plate: "MA JH 30", name: "Zaien Aldin Osama", model: "BMW 316 D 3K", city: "DBW1", manager: "Saleh DBW1", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 104, plate: "MA CX 9555", name: "Mohareb Mohammed", model: "Ford fiesta JH1", city: "Frankfurt", manager: "Saleh DBW1", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 105, plate: "HD YS 200", name: "Hawari Majd", model: "Nissan micra K11", city: "Frankfurt", manager: "Saleh DBW1", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 106, plate: "MA VT 5559", name: "Shaji Omar", model: "Opel Corsa S-D", city: "Frankfurt", manager: "Saleh DBW1", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 107, plate: "H XG 617", name: "Alabdullah Zainab", model: "Ford JK8", city: "Hannover", manager: "Tarek Hannover", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 108, plate: "H ND 2001", name: "Alfares Mohammad", model: "VW Polo 9N", city: "Hannover", manager: "Tarek Hannover", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 109, plate: "H EY 4011", name: "Al Atieh Ammar", model: "Seat Ibiza 6 J", city: "Hannover", manager: "Tarek Hannover", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 110, plate: "NVP Y261", name: "Wölk Monika", model: "VW Golf 1K", city: "Hannover", manager: "Tarek Hannover", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 111, plate: "H O 441", name: "Al khorashi Asem Zaid Ali Hasan", model: "Fiat ZFA 199", city: "Hannover", manager: "Tarek Hannover", company: "SBDS", notes: "Rangeone + SBDS", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 112, plate: "H EL 660", name: "Mubarak Ali", model: "Chrysler E 220 CDI", city: "Hannover", manager: "Tarek Hannover", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 113, plate: "H XK 637", name: "Al hussein Amjad KL1J", model: "Chevrolet Cruze", city: "Hannover", manager: "Tarek Hannover", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 114, plate: "H SY 1331", name: "Afof Yassin Faed", model: "Opel Corsa -C", city: "Hannover", manager: "Tarek Hannover", company: "SBDS", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 115, plate: "M BA2917", name: "Mihaylov Asen", model: "Peugeot 2", city: "Munich", manager: "Tarek Munich", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 116, plate: "M PJ 3608", name: "Nassan Mohannad", model: "Ibiza 6J", city: "Munich", manager: "Tarek Munich", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 117, plate: "FS YX 152", name: "Al mubarek Ammar", model: "Hyundai MC", city: "Munich", manager: "Tarek Munich", company: "Guardian", notes: "Rangeone + SBDS", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 118, plate: "M DY 2120", name: "Nassan Mohannad", model: "Seat Ibiza 6L", city: "Munich", manager: "Tarek Munich", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 119, plate: "PAF ZJ 767", name: "Alkhalaf Ahmad", model: "BMW 1K4", city: "Munich", manager: "Tarek Munich", company: "Guardian", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 120, plate: "B NM 2731", name: "", model: "", city: "Berlin", manager: "Rangone", company: "Rangone", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 121, plate: "B NM 2736", name: "", model: "", city: "Berlin", manager: "Rangone", company: "Rangone", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 122, plate: "B NM 2753", name: "", model: "", city: "Berlin", manager: "Rangone", company: "Rangone", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 123, plate: "B NM 2755", name: "", model: "", city: "Berlin", manager: "Rangone", company: "Rangone", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 124, plate: "B NM 2761", name: "", model: "", city: "Berlin", manager: "Rangone", company: "Rangone", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 125, plate: "B NM 2762", name: "", model: "", city: "Berlin", manager: "Rangone", company: "Rangone", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 126, plate: "B NM 2815", name: "", model: "", city: "Berlin", manager: "Rangone", company: "Rangone", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 127, plate: "B NM 2827", name: "", model: "", city: "Berlin", manager: "Rangone", company: "Rangone", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 128, plate: "B NM 3056", name: "", model: "", city: "Berlin", manager: "Rangone", company: "Rangone", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 129, plate: "B NM 3057", name: "", model: "", city: "Berlin", manager: "Rangone", company: "Rangone", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 130, plate: "B RG 7700", name: "", model: "", city: "Berlin", manager: "Rangone", company: "Rangone", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
    { id: 131, plate: "B RG 9800", name: "", model: "", city: "Berlin", manager: "Rangone", company: "Rangone", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" },
  ],
  customTabs: [],
};

const COMPANY_COLORS = {
  Rangone: { bg: "#E6F1FB", text: "#185FA5", border: "#B5D4F4" },
  SBDS: { bg: "#EAF3DE", text: "#3B6D11", border: "#C0DD97" },
  Guardian: { bg: "#FAEEDA", text: "#854F0B", border: "#FAC775" },
};

const getCompanyColor = (company, companies) => {
  if (COMPANY_COLORS[company]) return COMPANY_COLORS[company];
  const idx = companies.indexOf(company) % 5;
  const extras = [
    { bg: "#FBEAF0", text: "#993556", border: "#F4C0D1" },
    { bg: "#EEEDFE", text: "#534AB7", border: "#CECBF6" },
    { bg: "#FCEBEB", text: "#A32D2D", border: "#F7C1C1" },
    { bg: "#E1F5EE", text: "#0F6E56", border: "#9FE1CB" },
    { bg: "#FAECE7", text: "#993C1D", border: "#F5C4B3" },
  ];
  return extras[idx] || extras[0];
};

function Badge({ company, companies }) {
  const c = getCompanyColor(company, companies);
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 500, whiteSpace: "nowrap" }}>
      {company}
    </span>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "var(--color-background-primary)", borderRadius: 12, border: "0.5px solid var(--color-border-tertiary)", padding: "1.5rem", width: "min(600px, 95vw)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--color-text-secondary)", padding: "4px 8px" }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function CarForm({ car, companies, managers, onSave, onCancel }) {
  const [form, setForm] = useState(car || { plate: "", name: "", model: "", city: "", manager: managers[0]?.name || "", company: companies[0] || "", notes: "", licensePhoto: "", currentKm: "", drivenKm: "" });
  const fileRef = useRef();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => set("licensePhoto", ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[["Plate / Kennzeichen", "plate"], ["Driver name", "name"], ["Car model", "model"], ["City", "city"]].map(([label, key]) => (
        <div key={key}>
          <label style={{ fontSize: 13, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>{label}</label>
          <input value={form[key]} onChange={e => set(key, e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
        </div>
      ))}
      <div>
        <label style={{ fontSize: 13, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Company</label>
        <select value={form.company} onChange={e => set("company", e.target.value)} style={{ width: "100%" }}>
          {companies.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label style={{ fontSize: 13, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Manager / Tab</label>
        <select value={form.manager} onChange={e => set("manager", e.target.value)} style={{ width: "100%" }}>
          {managers.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={{ fontSize: 13, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Current km</label>
          <input type="number" value={form.currentKm} onChange={e => set("currentKm", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} placeholder="e.g. 45000" />
        </div>
        <div>
          <label style={{ fontSize: 13, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Driven km</label>
          <input type="number" value={form.drivenKm} onChange={e => set("drivenKm", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} placeholder="e.g. 1200" />
        </div>
      </div>
      <div>
        <label style={{ fontSize: 13, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Notes</label>
        <input value={form.notes} onChange={e => set("notes", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
      </div>
      <div>
        <label style={{ fontSize: 13, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Driving license photo</label>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => fileRef.current.click()} style={{ fontSize: 13 }}>
            <i className="ti ti-upload" style={{ marginRight: 4 }} aria-hidden="true" />Upload photo
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
          {form.licensePhoto && <span style={{ fontSize: 12, color: "var(--color-text-success)" }}>✓ Photo uploaded</span>}
        </div>
        {form.licensePhoto && (
          <div style={{ marginTop: 8, position: "relative", display: "inline-block" }}>
            <img src={form.licensePhoto} alt="License" style={{ maxWidth: 200, maxHeight: 120, borderRadius: 6, border: "0.5px solid var(--color-border-tertiary)" }} />
            <button onClick={() => set("licensePhoto", "")} style={{ position: "absolute", top: -6, right: -6, borderRadius: "50%", width: 20, height: 20, padding: 0, fontSize: 12, lineHeight: "20px", textAlign: "center" }}>×</button>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={() => onSave(form)} style={{ background: "var(--color-background-info)", color: "var(--color-text-info)", borderColor: "var(--color-border-info)" }}>Save car</button>
      </div>
    </div>
  );
}

function CarDetail({ car, companies, managers, onEdit, onClose }) {
  return (
    <div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: "1rem" }}>
        {car.licensePhoto && (
          <div>
            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 4px" }}>Driving license</p>
            <img src={car.licensePhoto} alt="License" style={{ maxWidth: 180, maxHeight: 110, borderRadius: 8, border: "0.5px solid var(--color-border-tertiary)" }} />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
            {[
              ["Plate", car.plate],
              ["Driver", car.name || "—"],
              ["Model", car.model || "—"],
              ["City", car.city || "—"],
              ["Company", car.company],
              ["Manager / Tab", car.manager],
              ["Current km", car.currentKm ? Number(car.currentKm).toLocaleString() + " km" : "—"],
              ["Driven km", car.drivenKm ? Number(car.drivenKm).toLocaleString() + " km" : "—"],
              ["Notes", car.notes || "—"],
            ].map(([k, v]) => (
              <tr key={k}>
                <td style={{ padding: "4px 8px 4px 0", color: "var(--color-text-secondary)", whiteSpace: "nowrap", verticalAlign: "top" }}>{k}</td>
                <td style={{ padding: "4px 0", fontWeight: k === "Plate" ? 500 : 400 }}>{k === "Company" ? <Badge company={v} companies={companies} /> : v}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button onClick={onClose}>Close</button>
        <button onClick={onEdit} style={{ background: "var(--color-background-info)", color: "var(--color-text-info)", borderColor: "var(--color-border-info)" }}>
          <i className="ti ti-edit" style={{ marginRight: 4 }} aria-hidden="true" />Edit
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [filterCompany, setFilterCompany] = useState("All");
  const [modal, setModal] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [editingCar, setEditingCar] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("fleetData");
    if (saved) {
      try { setData(JSON.parse(saved)); } catch { setData(INITIAL_DATA); }
    } else {
      setData(INITIAL_DATA);
    }
  }, []);

  const save = (newData) => {
    setData(newData);
    localStorage.setItem("fleetData", JSON.stringify(newData));
  };

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const exportBackup = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fleet-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify("Backup downloaded");
  };

  const importBackup = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target.result);
        save(parsed);
        notify("Backup restored successfully");
      } catch { notify("Invalid backup file"); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  if (!data) return <div style={{ padding: "2rem", color: "var(--color-text-secondary)" }}>Loading...</div>;

  const allTabs = [
    { id: "all", label: "All cars" },
    { id: "dashboard", label: "Dashboard" },
    ...data.managers.map(m => ({ id: m.name, label: m.name, company: m.company })),
    ...data.customTabs.map(t => ({ id: t.id, label: t.label, custom: true })),
    { id: "settings", label: "Settings" },
  ];

  const getTabCars = (tabId) => {
    let cars = data.cars;
    if (tabId === "all" || tabId === "dashboard") return cars;
    const customTab = data.customTabs.find(t => t.id === tabId);
    if (customTab) return cars.filter(c => customTab.carIds?.includes(c.id));
    return cars.filter(c => c.manager === tabId);
  };

  const filteredCars = getTabCars(activeTab).filter(car => {
    const q = search.toLowerCase();
    const matchSearch = !q || [car.plate, car.name, car.model, car.city, car.manager, car.company].some(f => f?.toLowerCase().includes(q));
    const matchCompany = filterCompany === "All" || car.company === filterCompany;
    return matchSearch && matchCompany;
  });

  const addCar = (form) => {
    const newCar = { ...form, id: Date.now() };
    save({ ...data, cars: [...data.cars, newCar] });
    setModal(null);
    notify("Car added");
  };

  const updateCar = (form) => {
    save({ ...data, cars: data.cars.map(c => c.id === editingCar.id ? { ...c, ...form } : c) });
    setEditingCar(null);
    setSelectedCar({ ...editingCar, ...form });
    setModal("detail");
    notify("Car updated");
  };

  const deleteCar = (id) => {
    if (!confirm("Delete this car?")) return;
    save({ ...data, cars: data.cars.filter(c => c.id !== id) });
    setModal(null);
    setSelectedCar(null);
    notify("Car deleted");
  };

  const addCompany = (name) => {
    if (!name.trim() || data.companies.includes(name.trim())) return;
    save({ ...data, companies: [...data.companies, name.trim()] });
    notify("Company added");
  };

  const addManager = (name, company) => {
    if (!name.trim()) return;
    save({ ...data, managers: [...data.managers, { name: name.trim(), company }] });
    notify("Manager tab added");
  };

  const addCustomTab = (label) => {
    if (!label.trim()) return;
    const id = "custom_" + Date.now();
    save({ ...data, customTabs: [...data.customTabs, { id, label: label.trim(), carIds: [] }] });
    setActiveTab(id);
    notify("New tab added");
  };

  const companyCounts = data.companies.reduce((acc, c) => {
    acc[c] = data.cars.filter(car => car.company === c).length;
    return acc;
  }, {});

  const managerCounts = data.managers.reduce((acc, m) => {
    acc[m.name] = data.cars.filter(c => c.manager === m.name).length;
    return acc;
  }, {});

  const importRef = useRef();

  return (
    <div style={{ fontFamily: "var(--font-sans)", minHeight: "100vh", background: "var(--color-background-tertiary)" }}>
      <h2 className="sr-only">Fleet Management System</h2>

      {notification && (
        <div style={{ position: "fixed", top: 16, right: 16, zIndex: 2000, background: "var(--color-background-success)", color: "var(--color-text-success)", border: "0.5px solid var(--color-border-success)", borderRadius: 8, padding: "10px 16px", fontSize: 14 }}>
          {notification}
        </div>
      )}

      <div style={{ background: "var(--color-background-primary)", borderBottom: "0.5px solid var(--color-border-tertiary)", padding: "0 1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0 0", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 8 }}>
            <i className="ti ti-car" style={{ fontSize: 20, color: "var(--color-text-secondary)" }} aria-hidden="true" />
            <span style={{ fontWeight: 500, fontSize: 15 }}>Fleet Manager</span>
          </div>
          <div style={{ display: "flex", gap: 4, flex: 1, overflowX: "auto", paddingBottom: 0 }}>
            {[{ id: "all", label: "All cars" }, { id: "dashboard", label: "Dashboard" }].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ borderRadius: "6px 6px 0 0", borderBottom: activeTab === t.id ? "2px solid var(--color-text-primary)" : "2px solid transparent", background: "none", border: "none", borderBottom: activeTab === t.id ? "2px solid var(--color-text-primary)" : "2px solid transparent", padding: "6px 12px", fontSize: 13, fontWeight: activeTab === t.id ? 500 : 400, cursor: "pointer", whiteSpace: "nowrap", color: activeTab === t.id ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}>
                {t.label}
              </button>
            ))}
            {data.managers.map(m => {
              const c = getCompanyColor(m.company, data.companies);
              return (
                <button key={m.name} onClick={() => setActiveTab(m.name)} style={{ borderRadius: "6px 6px 0 0", background: "none", border: "none", borderBottom: activeTab === m.name ? `2px solid ${c.text}` : "2px solid transparent", padding: "6px 12px", fontSize: 13, fontWeight: activeTab === m.name ? 500 : 400, cursor: "pointer", whiteSpace: "nowrap", color: activeTab === m.name ? c.text : "var(--color-text-secondary)" }}>
                  {m.name}
                </button>
              );
            })}
            {data.customTabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ borderRadius: "6px 6px 0 0", background: "none", border: "none", borderBottom: activeTab === t.id ? "2px solid var(--color-text-info)" : "2px solid transparent", padding: "6px 12px", fontSize: 13, fontWeight: activeTab === t.id ? 500 : 400, cursor: "pointer", whiteSpace: "nowrap", color: activeTab === t.id ? "var(--color-text-info)" : "var(--color-text-secondary)" }}>
                {t.label}
              </button>
            ))}
            <button onClick={() => setActiveTab("settings")} style={{ borderRadius: "6px 6px 0 0", background: "none", border: "none", borderBottom: activeTab === "settings" ? "2px solid var(--color-text-primary)" : "2px solid transparent", padding: "6px 12px", fontSize: 13, cursor: "pointer", color: activeTab === "settings" ? "var(--color-text-primary)" : "var(--color-text-secondary)", whiteSpace: "nowrap" }}>
              <i className="ti ti-settings" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: "1rem" }}>
        {activeTab === "dashboard" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: "1.5rem" }}>
              <div style={{ background: "var(--color-background-secondary)", borderRadius: 8, padding: "1rem" }}>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 4px" }}>Total cars</p>
                <p style={{ fontSize: 24, fontWeight: 500, margin: 0 }}>{data.cars.length}</p>
              </div>
              {data.companies.map(c => (
                <div key={c} style={{ background: "var(--color-background-secondary)", borderRadius: 8, padding: "1rem" }}>
                  <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 4px" }}>{c}</p>
                  <p style={{ fontSize: 24, fontWeight: 500, margin: 0 }}>{companyCounts[c] || 0}</p>
                </div>
              ))}
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 500, marginBottom: 12 }}>Cars per manager</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {data.managers.map(m => {
                const count = managerCounts[m.name] || 0;
                const c = getCompanyColor(m.company, data.companies);
                const max = Math.max(...Object.values(managerCounts), 1);
                return (
                  <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                    <span style={{ width: 160, color: "var(--color-text-secondary)", textAlign: "right", flexShrink: 0 }}>{m.name}</span>
                    <div style={{ flex: 1, background: "var(--color-background-secondary)", borderRadius: 4, height: 16, overflow: "hidden" }}>
                      <div style={{ width: `${(count / max) * 100}%`, background: c.text, height: "100%", borderRadius: 4, minWidth: count > 0 ? 4 : 0 }} />
                    </div>
                    <span style={{ width: 24, fontWeight: 500 }}>{count}</span>
                    <Badge company={m.company} companies={data.companies} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div style={{ maxWidth: 560 }}>
            <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 12 }}>Backup & restore</h3>
            <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
              <button onClick={exportBackup}><i className="ti ti-download" style={{ marginRight: 4 }} aria-hidden="true" />Export backup</button>
              <button onClick={() => importRef.current.click()}><i className="ti ti-upload" style={{ marginRight: 4 }} aria-hidden="true" />Import backup</button>
              <input ref={importRef} type="file" accept=".json" style={{ display: "none" }} onChange={importBackup} />
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 12 }}>Companies</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              {data.companies.map(c => <Badge key={c} company={c} companies={data.companies} />)}
            </div>
            <AddForm label="Add company" placeholder="Company name" onAdd={addCompany} />

            <h3 style={{ fontSize: 16, fontWeight: 500, margin: "1.5rem 0 12px" }}>Manager tabs</h3>
            <div style={{ marginBottom: 12 }}>
              <AddManagerForm companies={data.companies} onAdd={addManager} />
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 500, margin: "1.5rem 0 12px" }}>Custom tabs</h3>
            <AddForm label="Add tab" placeholder="Tab name" onAdd={addCustomTab} />
            {data.customTabs.length > 0 && (
              <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {data.customTabs.map(t => (
                  <span key={t.id} style={{ background: "var(--color-background-info)", color: "var(--color-text-info)", borderRadius: 6, padding: "2px 10px", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                    {t.label}
                    <button onClick={() => { if (confirm("Delete this tab?")) save({ ...data, customTabs: data.customTabs.filter(x => x.id !== t.id) }); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 12, color: "var(--color-text-info)" }}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab !== "dashboard" && activeTab !== "settings" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search plate, name, model..." style={{ flex: 1, minWidth: 200 }} />
              <select value={filterCompany} onChange={e => setFilterCompany(e.target.value)}>
                <option>All</option>
                {data.companies.map(c => <option key={c}>{c}</option>)}
              </select>
              <button onClick={() => setModal("add")} style={{ background: "var(--color-background-info)", color: "var(--color-text-info)", borderColor: "var(--color-border-info)", whiteSpace: "nowrap" }}>
                <i className="ti ti-plus" style={{ marginRight: 4 }} aria-hidden="true" />Add car
              </button>
            </div>

            <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 8 }}>{filteredCars.length} car{filteredCars.length !== 1 ? "s" : ""}</div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, tableLayout: "fixed" }}>
                <thead>
                  <tr style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                    {["Plate", "Driver", "Model", "City", "Company", "Tab", "Current km", "Driven km", "Notes", "License", ""].map((h, i) => (
                      <th key={i} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 500, color: "var(--color-text-secondary)", whiteSpace: "nowrap", width: i === 1 ? 160 : i === 10 ? 60 : "auto" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCars.map(car => (
                    <tr key={car.id} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)", cursor: "pointer" }}
                      onClick={() => { setSelectedCar(car); setModal("detail"); }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--color-background-secondary)"}
                      onMouseLeave={e => e.currentTarget.style.background = ""}>
                      <td style={{ padding: "8px 10px", fontWeight: 500, whiteSpace: "nowrap" }}>{car.plate}</td>
                      <td style={{ padding: "8px 10px", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{car.name || "—"}</td>
                      <td style={{ padding: "8px 10px", whiteSpace: "nowrap" }}>{car.model || "—"}</td>
                      <td style={{ padding: "8px 10px", whiteSpace: "nowrap" }}>{car.city || "—"}</td>
                      <td style={{ padding: "8px 10px" }}><Badge company={car.company} companies={data.companies} /></td>
                      <td style={{ padding: "8px 10px", color: "var(--color-text-secondary)", whiteSpace: "nowrap", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis" }}>{car.manager}</td>
                      <td style={{ padding: "8px 10px", whiteSpace: "nowrap" }}>{car.currentKm ? Number(car.currentKm).toLocaleString() + " km" : "—"}</td>
                      <td style={{ padding: "8px 10px", whiteSpace: "nowrap" }}>{car.drivenKm ? Number(car.drivenKm).toLocaleString() + " km" : "—"}</td>
                      <td style={{ padding: "8px 10px", color: "var(--color-text-secondary)", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{car.notes || "—"}</td>
                      <td style={{ padding: "8px 10px" }}>
                        {car.licensePhoto ? <i className="ti ti-id" style={{ color: "var(--color-text-success)", fontSize: 16 }} title="License photo available" /> : <span style={{ color: "var(--color-text-tertiary)" }}>—</span>}
                      </td>
                      <td style={{ padding: "8px 10px" }}>
                        <button onClick={e => { e.stopPropagation(); deleteCar(car.id); }} style={{ padding: "2px 6px", fontSize: 12 }}>
                          <i className="ti ti-trash" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCars.length === 0 && (
                    <tr><td colSpan={11} style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-secondary)" }}>No cars found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {modal === "add" && (
        <Modal title="Add new car" onClose={() => setModal(null)}>
          <CarForm companies={data.companies} managers={data.managers} onSave={addCar} onCancel={() => setModal(null)} />
        </Modal>
      )}

      {modal === "detail" && selectedCar && (
        <Modal title={selectedCar.plate} onClose={() => { setModal(null); setSelectedCar(null); }}>
          <CarDetail car={selectedCar} companies={data.companies} managers={data.managers}
            onEdit={() => { setEditingCar(selectedCar); setModal("edit"); }}
            onClose={() => { setModal(null); setSelectedCar(null); }} />
        </Modal>
      )}

      {modal === "edit" && editingCar && (
        <Modal title="Edit car" onClose={() => { setModal("detail"); setEditingCar(null); }}>
          <CarForm car={editingCar} companies={data.companies} managers={data.managers}
            onSave={updateCar} onCancel={() => { setModal("detail"); setEditingCar(null); }} />
        </Modal>
      )}
    </div>
  );
}

function AddForm({ label, placeholder, onAdd }) {
  const [val, setVal] = useState("");
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <input value={val} onChange={e => setVal(e.target.value)} placeholder={placeholder} onKeyDown={e => e.key === "Enter" && (onAdd(val), setVal(""))} style={{ flex: 1 }} />
      <button onClick={() => { onAdd(val); setVal(""); }}>{label}</button>
    </div>
  );
}

function AddManagerForm({ companies, onAdd }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState(companies[0] || "");
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Manager name" style={{ flex: 1, minWidth: 140 }} />
      <select value={company} onChange={e => setCompany(e.target.value)}>
        {companies.map(c => <option key={c}>{c}</option>)}
      </select>
      <button onClick={() => { onAdd(name, company); setName(""); }}>Add manager</button>
    </div>
  );
}
