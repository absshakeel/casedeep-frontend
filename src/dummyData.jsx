import dummyAvatar from "./assets/dummy-avatar.png";
import { PiArrowFatUpLight } from "react-icons/pi";
import { FaRegAddressCard } from "react-icons/fa6";
import { TbFileDollar } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";
import { AiOutlinePoweroff } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import logoImg from "./assets/logo.png";
import dummyShowCaseImage from "./assets/dummy-showcase.jpg";
import upgradeIcon from "./assets/designPickedIcons/upgrade-icon.png";
import logOutIcon from "./assets/designPickedIcons/logout-icon.png";
import profileIcon from "./assets/designPickedIcons/profile-icon.png";
import billingIcon from "./assets/designPickedIcons/billing-icon.png";
import supportIcon from "./assets/designPickedIcons/support-icon.png";
import {
  ProfilePageUserAIcons,
  ProfilePageUserBIcons,
} from "./assets/designPickedIcons";
import dummyProfilePhoto from "./assets/vercena.jpg";

export const currencyLists = [
  { name: "Afghan Afghani", countryName: "Afghanistan", symbol: "AFN" },
  { name: "Euro", countryName: "Albania", symbol: "€" },
  { name: "Albanian Lek", countryName: "Albania", symbol: "ALL" },
  { name: "Algerian Dinar", countryName: "Algeria", symbol: "DZD" },
  { name: "Angolan Kwanza", countryName: "Angola", symbol: "AOA" },
  {
    name: "East Caribbean Dollar",
    countryName: "Antigua and Barbuda",
    symbol: "XCD",
  },
  { name: "Argentine Peso", countryName: "Argentina", symbol: "ARS" },
  { name: "Armenian Dram", countryName: "Armenia", symbol: "AMD" },
  { name: "Australian Dollar", countryName: "Australia", symbol: "A$" },
  { name: "Azerbaijani Manat", countryName: "Azerbaijan", symbol: "AZN" },
  { name: "Bahamian Dollar", countryName: "Bahamas", symbol: "BSD" },
  { name: "Bahraini Dinar", countryName: "Bahrain", symbol: "BHD" },
  { name: "Bangladeshi Taka", countryName: "Bangladesh", symbol: "BDT" },
  { name: "Barbadian Dollar", countryName: "Barbados", symbol: "BBD" },
  { name: "Belarusian Ruble", countryName: "Belarus", symbol: "BYN" },
  { name: "Belize Dollar", countryName: "Belize", symbol: "BZD" },
  { name: "West African CFA Franc", countryName: "Benin", symbol: "XOF" },
  { name: "Bermudian Dollar", countryName: "Bermuda", symbol: "BMD" },
  { name: "Bhutanese Ngultrum", countryName: "Bhutan", symbol: "BTN" },
  { name: "Bolivian Boliviano", countryName: "Bolivia", symbol: "BOB" },
  {
    name: "Bosnia and Herzegovina Convertible Mark",
    countryName: "Bosnia and Herzegovina",
    symbol: "BAM",
  },
  { name: "Botswana Pula", countryName: "Botswana", symbol: "BWP" },
  { name: "Brazilian Real", countryName: "Brazil", symbol: "BRL" },
  { name: "Brunei Dollar", countryName: "Brunei", symbol: "BND" },
  { name: "Bulgarian Lev", countryName: "Bulgaria", symbol: "BGN" },
  { name: "Burundian Franc", countryName: "Burundi", symbol: "BIF" },
  { name: "Cabo Verdean Escudo", countryName: "Cabo Verde", symbol: "CVE" },
  { name: "Cambodian Riel", countryName: "Cambodia", symbol: "KHR" },
  { name: "Canadian Dollar", countryName: "Canada", symbol: "C$" },
  {
    name: "Central African CFA Franc",
    countryName: "Central African Republic",
    symbol: "XAF",
  },
  { name: "Chilean Peso", countryName: "Chile", symbol: "CLP" },
  { name: "Chinese Yuan", countryName: "China", symbol: "¥" },
  { name: "Colombian Peso", countryName: "Colombia", symbol: "COP" },
  { name: "Comorian Franc", countryName: "Comoros", symbol: "KMF" },
  {
    name: "Congolese Franc",
    countryName: "Democratic Republic of the Congo",
    symbol: "CDF",
  },
  { name: "Costa Rican Colón", countryName: "Costa Rica", symbol: "CRC" },
  { name: "Croatian Kuna", countryName: "Croatia", symbol: "HRK" },
  { name: "Cuban Peso", countryName: "Cuba", symbol: "CUP" },
  { name: "Czech Koruna", countryName: "Czech Republic", symbol: "CZK" },
  { name: "Danish Krone", countryName: "Denmark", symbol: "DKK" },
  { name: "Djiboutian Franc", countryName: "Djibouti", symbol: "DJF" },
  { name: "Dominican Peso", countryName: "Dominican Republic", symbol: "DOP" },
  { name: "Egyptian Pound", countryName: "Egypt", symbol: "EGP" },
  { name: "El Salvadoran Colón", countryName: "El Salvador", symbol: "SVC" },
  {
    name: "Equatorial Guinean CFA Franc",
    countryName: "Equatorial Guinea",
    symbol: "XAF",
  },
  { name: "Eritrean Nakfa", countryName: "Eritrea", symbol: "ERN" },
  { name: "Estonian Kroon", countryName: "Estonia", symbol: "EEK" },
  { name: "Ethiopian Birr", countryName: "Ethiopia", symbol: "ETB" },
  { name: "Fijian Dollar", countryName: "Fiji", symbol: "FJD" },
  {
    name: "Falkland Islands Pound",
    countryName: "Falkland Islands",
    symbol: "FKP",
  },
  { name: "Gambian Dalasi", countryName: "Gambia", symbol: "GMD" },
  { name: "Georgian Lari", countryName: "Georgia", symbol: "GEL" },
  { name: "Ghanaian Cedi", countryName: "Ghana", symbol: "GHS" },
  { name: "Gibraltar Pound", countryName: "Gibraltar", symbol: "GIP" },
  { name: "Greek Euro", countryName: "Greece", symbol: "€" },
  { name: "Grenadian Dollar", countryName: "Grenada", symbol: "XCD" },
  { name: "Guatemalan Quetzal", countryName: "Guatemala", symbol: "GTQ" },
  { name: "Guinean Franc", countryName: "Guinea", symbol: "GNF" },
  { name: "Guyanese Dollar", countryName: "Guyana", symbol: "GYD" },
  { name: "Haitian Gourde", countryName: "Haiti", symbol: "HTG" },
  { name: "Honduran Lempira", countryName: "Honduras", symbol: "HNL" },
  { name: "Hungarian Forint", countryName: "Hungary", symbol: "HUF" },
  { name: "Icelandic Króna", countryName: "Iceland", symbol: "ISK" },
  { name: "Indian Rupee", countryName: "India", symbol: "₹" },
  { name: "Indonesian Rupiah", countryName: "Indonesia", symbol: "IDR" },
  { name: "Iranian Rial", countryName: "Iran", symbol: "IRR" },
  { name: "Iraqi Dinar", countryName: "Iraq", symbol: "IQD" },
  { name: "Israeli New Shekel", countryName: "Israel", symbol: "₪" },
  { name: "Italian Euro", countryName: "Italy", symbol: "€" },
  { name: "Jamaican Dollar", countryName: "Jamaica", symbol: "JMD" },
  { name: "Japanese Yen", countryName: "Japan", symbol: "¥" },
  { name: "Jordanian Dinar", countryName: "Jordan", symbol: "JOD" },
  { name: "Kazakhstani Tenge", countryName: "Kazakhstan", symbol: "KZT" },
  { name: "Kenyan Shilling", countryName: "Kenya", symbol: "KES" },
  { name: "Kiribati Dollar", countryName: "Kiribati", symbol: "AUD" },
  { name: "Kuwaiti Dinar", countryName: "Kuwait", symbol: "KWD" },
  { name: "Kyrgyzstani Som", countryName: "Kyrgyzstan", symbol: "KGS" },
  { name: "Lao Kip", countryName: "Laos", symbol: "LAK" },
  { name: "Latvian Lats", countryName: "Latvia", symbol: "LVL" },
  { name: "Lebanese Pound", countryName: "Lebanon", symbol: "LBP" },
  { name: "Lesotho Loti", countryName: "Lesotho", symbol: "LSL" },
  { name: "Liberian Dollar", countryName: "Liberia", symbol: "LRD" },
  { name: "Libyan Dinar", countryName: "Libya", symbol: "LYD" },
  {
    name: "Liechtenstein Swiss Franc",
    countryName: "Liechtenstein",
    symbol: "CHF",
  },
  { name: "Lithuanian Litas", countryName: "Lithuania", symbol: "LTL" },
  { name: "Luxembourg Euro", countryName: "Luxembourg", symbol: "€" },
  { name: "Macanese Pataca", countryName: "Macau", symbol: "MOP" },
  { name: "Madagascan Ariary", countryName: "Madagascar", symbol: "MGA" },
  { name: "Malawian Kwacha", countryName: "Malawi", symbol: "MWK" },
  { name: "Malaysian Ringgit", countryName: "Malaysia", symbol: "MYR" },
  { name: "Maldivian Rufiyaa", countryName: "Maldives", symbol: "MVR" },
  { name: "Mali CFA Franc", countryName: "Mali", symbol: "XOF" },
  { name: "Mauritanian Ouguiya", countryName: "Mauritania", symbol: "MRU" },
  { name: "Mauritian Rupee", countryName: "Mauritius", symbol: "MUR" },
  { name: "Mexican Peso", countryName: "Mexico", symbol: "MXN" },
  { name: "Micronesian Dollar", countryName: "Micronesia", symbol: "USD" },
  { name: "Moldovan Leu", countryName: "Moldova", symbol: "MDL" },
  { name: "Mongolian Tugrik", countryName: "Mongolia", symbol: "MNT" },
  { name: "Moroccan Dirham", countryName: "Morocco", symbol: "MAD" },
  { name: "Mozambican Metical", countryName: "Mozambique", symbol: "MZN" },
  { name: "Myanmar Kyat", countryName: "Myanmar", symbol: "MMK" },
  { name: "Namibian Dollar", countryName: "Namibia", symbol: "NAD" },
  { name: "Nauruan Dollar", countryName: "Nauru", symbol: "AUD" },
  { name: "Nepalese Rupee", countryName: "Nepal", symbol: "NPR" },
  {
    name: "Netherlands Antillean Guilder",
    countryName: "Netherlands Antilles",
    symbol: "ANG",
  },
  { name: "New Zealand Dollar", countryName: "New Zealand", symbol: "NZ$" },
  { name: "Nigerian Naira", countryName: "Nigeria", symbol: "NGN" },
  { name: "North Korean Won", countryName: "North Korea", symbol: "KPW" },
  { name: "Norwegian Krone", countryName: "Norway", symbol: "NOK" },
  { name: "Omani Rial", countryName: "Oman", symbol: "OMR" },
  { name: "Pakistani Rupee", countryName: "Pakistan", symbol: "PKR" },
  { name: "Palauan Dollar", countryName: "Palau", symbol: "USD" },
  { name: "Panamanian Balboa", countryName: "Panama", symbol: "PAB" },
  {
    name: "Papua New Guinean Kina",
    countryName: "Papua New Guinea",
    symbol: "PGK",
  },
  { name: "Paraguayan Guarani", countryName: "Paraguay", symbol: "PYG" },
  { name: "Peruvian Nuevo Sol", countryName: "Peru", symbol: "PEN" },
  { name: "Philippine Peso", countryName: "Philippines", symbol: "PHP" },
  { name: "Polish Zloty", countryName: "Poland", symbol: "PLN" },
  { name: "Portuguese Euro", countryName: "Portugal", symbol: "€" },
  { name: "Qatari Rial", countryName: "Qatar", symbol: "QAR" },
  { name: "Romanian Leu", countryName: "Romania", symbol: "RON" },
  { name: "Russian Ruble", countryName: "Russia", symbol: "₽" },
  { name: "Rwandan Franc", countryName: "Rwanda", symbol: "RWF" },
  {
    name: "Saint Kitts and Nevis Dollar",
    countryName: "Saint Kitts and Nevis",
    symbol: "XCD",
  },
  { name: "Saint Lucian Dollar", countryName: "Saint Lucia", symbol: "XCD" },
  {
    name: "Saint Vincent and the Grenadines Dollar",
    countryName: "Saint Vincent and the Grenadines",
    symbol: "XCD",
  },
  { name: "Samoan Tala", countryName: "Samoa", symbol: "WST" },
  {
    name: "San Marinese Sammarinese Lira",
    countryName: "San Marino",
    symbol: "SML",
  },
  {
    name: "São Tomé and Príncipe Dobra",
    countryName: "São Tomé and Príncipe",
    symbol: "STN",
  },
  { name: "Saudi Riyal", countryName: "Saudi Arabia", symbol: "SAR" },
  { name: "Scottish Pound", countryName: "Scotland", symbol: "£" },
  { name: "Serbian Dinar", countryName: "Serbia", symbol: "RSD" },
  { name: "Seychellois Rupee", countryName: "Seychelles", symbol: "SCR" },
  { name: "Sierra Leonean Leone", countryName: "Sierra Leone", symbol: "SLL" },
  { name: "Singapore Dollar", countryName: "Singapore", symbol: "S$" },
  { name: "Slovak Euro", countryName: "Slovakia", symbol: "€" },
  { name: "Slovenian Euro", countryName: "Slovenia", symbol: "€" },
  {
    name: "Solomon Islands Dollar",
    countryName: "Solomon Islands",
    symbol: "SBD",
  },
  { name: "Somali Shilling", countryName: "Somalia", symbol: "SOS" },
  { name: "South African Rand", countryName: "South Africa", symbol: "ZAR" },
  { name: "South Sudanese Pound", countryName: "South Sudan", symbol: "SSP" },
  { name: "Spanish Euro", countryName: "Spain", symbol: "€" },
  { name: "Sri Lankan Rupee", countryName: "Sri Lanka", symbol: "LKR" },
  { name: "Sudanese Pound", countryName: "Sudan", symbol: "SDG" },
  { name: "Surinamese Dollar", countryName: "Suriname", symbol: "SRD" },
  { name: "Swedish Krona", countryName: "Sweden", symbol: "SEK" },
  { name: "Swiss Franc", countryName: "Switzerland", symbol: "CHF" },
  { name: "Syrian Pound", countryName: "Syria", symbol: "SYP" },
  { name: "Taiwan Dollar", countryName: "Taiwan", symbol: "TWD" },
  { name: "Tajikistani Somoni", countryName: "Tajikistan", symbol: "TJS" },
  { name: "Tanzanian Shilling", countryName: "Tanzania", symbol: "TZS" },
  { name: "Thai Baht", countryName: "Thailand", symbol: "THB" },
  { name: "Timorese Dollar", countryName: "Timor-Leste", symbol: "USD" },
  { name: "Tongan Paʻanga", countryName: "Tonga", symbol: "TOP" },
  {
    name: "Trinidad and Tobago Dollar",
    countryName: "Trinidad and Tobago",
    symbol: "TTD",
  },
  { name: "Tunisian Dinar", countryName: "Tunisia", symbol: "TND" },
  { name: "Turkish Lira", countryName: "Turkey", symbol: "₺" },
  { name: "Turkmenistani Manat", countryName: "Turkmenistan", symbol: "TMT" },
  { name: "Tuvaluan Dollar", countryName: "Tuvalu", symbol: "AUD" },
  { name: "Ugandan Shilling", countryName: "Uganda", symbol: "UGX" },
  { name: "Ukrainian Hryvnia", countryName: "Ukraine", symbol: "UAH" },
  {
    name: "United Arab Emirates Dirham",
    countryName: "United Arab Emirates",
    symbol: "AED",
  },
  { name: "United States Dollar", countryName: "United States", symbol: "USD" },
  { name: "Uruguayan Peso", countryName: "Uruguay", symbol: "UYU" },
  { name: "Uzbekistani Som", countryName: "Uzbekistan", symbol: "UZS" },
  { name: "Vanuatu Vatu", countryName: "Vanuatu", symbol: "VUV" },
  { name: "Venezuelan Bolívar", countryName: "Venezuela", symbol: "VES" },
  { name: "Vietnamese Dong", countryName: "Vietnam", symbol: "VND" },
  { name: "Yemeni Rial", countryName: "Yemen", symbol: "YER" },
  { name: "Zambian Kwacha", countryName: "Zambia", symbol: "ZMW" },
  { name: "Zimbabwean Dollar", countryName: "Zimbabwe", symbol: "ZWL" },
];

export const languageList = [
  { countryCode: "AF", name: "Pashto", langCode: "ps" },
  { countryCode: "AF", name: "Dari", langCode: "fa" },
  { countryCode: "AL", name: "Albanian", langCode: "sq" },
  { countryCode: "DZ", name: "Arabic", langCode: "ar" },
  { countryCode: "AO", name: "Portuguese", langCode: "pt" },
  { countryCode: "AG", name: "English", langCode: "en" },
  { countryCode: "AR", name: "Spanish", langCode: "es" },
  { countryCode: "AM", name: "Armenian", langCode: "hy" },
  { countryCode: "AU", name: "English", langCode: "en" },
  { countryCode: "AZ", name: "Azerbaijani", langCode: "az" },
  { countryCode: "BS", name: "English", langCode: "en" },
  { countryCode: "BH", name: "Arabic", langCode: "ar" },
  { countryCode: "BD", name: "Bengali", langCode: "bn" },
  { countryCode: "BB", name: "English", langCode: "en" },
  { countryCode: "BY", name: "Belarusian", langCode: "be" },
  { countryCode: "BY", name: "Russian", langCode: "ru" },
  { countryCode: "BZ", name: "English", langCode: "en" },
  { countryCode: "BJ", name: "French", langCode: "fr" },
  { countryCode: "BM", name: "English", langCode: "en" },
  { countryCode: "BT", name: "Dzongkha", langCode: "dz" },
  { countryCode: "BO", name: "Spanish", langCode: "es" },
  { countryCode: "BO", name: "Quechua", langCode: "qu" },
  { countryCode: "BA", name: "Bosnian", langCode: "bs" },
  { countryCode: "BA", name: "Croatian", langCode: "hr" },
  { countryCode: "BA", name: "Serbian", langCode: "sr" },
  { countryCode: "BW", name: "Tswana", langCode: "tn" },
  { countryCode: "BR", name: "Portuguese", langCode: "pt" },
  { countryCode: "BN", name: "Malay", langCode: "ms" },
  { countryCode: "BG", name: "Bulgarian", langCode: "bg" },
  { countryCode: "BF", name: "French", langCode: "fr" },
  { countryCode: "BI", name: "Kirundi", langCode: "rn" },
  { countryCode: "BI", name: "French", langCode: "fr" },
  { countryCode: "CV", name: "Portuguese", langCode: "pt" },
  { countryCode: "KH", name: "Khmer", langCode: "km" },
  { countryCode: "CA", name: "English", langCode: "en" },
  { countryCode: "CA", name: "French", langCode: "fr" },
  { countryCode: "CF", name: "French", langCode: "fr" },
  { countryCode: "CF", name: "Sango", langCode: "sg" },
  { countryCode: "CL", name: "Spanish", langCode: "es" },
  { countryCode: "CN", name: "Mandarin", langCode: "zh" },
  { countryCode: "CO", name: "Spanish", langCode: "es" },
  { countryCode: "KM", name: "Comorian", langCode: "kw" },
  { countryCode: "KM", name: "Arabic", langCode: "ar" },
  { countryCode: "CD", name: "French", langCode: "fr" },
  { countryCode: "CD", name: "Lingala", langCode: "ln" },
  { countryCode: "CR", name: "Spanish", langCode: "es" },
  { countryCode: "HR", name: "Croatian", langCode: "hr" },
  { countryCode: "CU", name: "Spanish", langCode: "es" },
  { countryCode: "CZ", name: "Czech", langCode: "cs" },
  { countryCode: "DK", name: "Danish", langCode: "da" },
  { countryCode: "DJ", name: "Arabic", langCode: "ar" },
  { countryCode: "DJ", name: "French", langCode: "fr" },
  { countryCode: "DO", name: "Spanish", langCode: "es" },
  { countryCode: "EG", name: "Arabic", langCode: "ar" },
  { countryCode: "SV", name: "Spanish", langCode: "es" },
  { countryCode: "GQ", name: "Spanish", langCode: "es" },
  { countryCode: "GQ", name: "French", langCode: "fr" },
  { countryCode: "GQ", name: "Portuguese", langCode: "pt" },
  { countryCode: "ER", name: "Tigrinya", langCode: "ti" },
  { countryCode: "ER", name: "Arabic", langCode: "ar" },
  { countryCode: "EE", name: "Estonian", langCode: "et" },
  { countryCode: "ET", name: "Amharic", langCode: "am" },
  { countryCode: "FJ", name: "Fijian", langCode: "fj" },
  { countryCode: "FJ", name: "English", langCode: "en" },
  { countryCode: "FK", name: "English", langCode: "en" },
  { countryCode: "FM", name: "English", langCode: "en" },
  { countryCode: "GA", name: "French", langCode: "fr" },
  { countryCode: "GM", name: "English", langCode: "en" },
  { countryCode: "GE", name: "Georgian", langCode: "ka" },
  { countryCode: "GH", name: "English", langCode: "en" },
  { countryCode: "GI", name: "English", langCode: "en" },
  { countryCode: "GR", name: "Greek", langCode: "el" },
  { countryCode: "GD", name: "English", langCode: "en" },
  { countryCode: "GT", name: "Spanish", langCode: "es" },
  { countryCode: "GU", name: "English", langCode: "en" },
  { countryCode: "GW", name: "Portuguese", langCode: "pt" },
  { countryCode: "GY", name: "English", langCode: "en" },
  { countryCode: "HT", name: "Haitian Creole", langCode: "ht" },
  { countryCode: "HT", name: "French", langCode: "fr" },
  { countryCode: "HN", name: "Spanish", langCode: "es" },
  { countryCode: "HU", name: "Hungarian", langCode: "hu" },
  { countryCode: "IS", name: "Icelandic", langCode: "is" },
  { countryCode: "IN", name: "Hindi", langCode: "hi" },
  { countryCode: "IN", name: "English", langCode: "en" },
  { countryCode: "ID", name: "Indonesian", langCode: "id" },
  { countryCode: "IR", name: "Persian", langCode: "fa" },
  { countryCode: "IQ", name: "Arabic", langCode: "ar" },
  { countryCode: "IL", name: "Hebrew", langCode: "he" },
  { countryCode: "IT", name: "Italian", langCode: "it" },
  { countryCode: "JM", name: "English", langCode: "en" },
  { countryCode: "JP", name: "Japanese", langCode: "ja" },
  { countryCode: "JO", name: "Arabic", langCode: "ar" },
  { countryCode: "KZ", name: "Kazakh", langCode: "kk" },
  { countryCode: "KZ", name: "Russian", langCode: "ru" },
  { countryCode: "KE", name: "Swahili", langCode: "sw" },
  { countryCode: "KE", name: "English", langCode: "en" },
  { countryCode: "KI", name: "English", langCode: "en" },
  { countryCode: "KI", name: "Gilbertese", langCode: "gil" },
  { countryCode: "KW", name: "Arabic", langCode: "ar" },
  { countryCode: "KG", name: "Kyrgyz", langCode: "ky" },
  { countryCode: "KG", name: "Russian", langCode: "ru" },
  { countryCode: "LA", name: "Lao", langCode: "lo" },
  { countryCode: "LV", name: "Latvian", langCode: "lv" },
  { countryCode: "LB", name: "Arabic", langCode: "ar" },
  { countryCode: "LS", name: "Sesotho", langCode: "st" },
  { countryCode: "LR", name: "English", langCode: "en" },
  { countryCode: "LY", name: "Arabic", langCode: "ar" },
  { countryCode: "LI", name: "German", langCode: "de" },
  { countryCode: "LT", name: "Lithuanian", langCode: "lt" },
  { countryCode: "LU", name: "Luxembourgish", langCode: "lb" },
  { countryCode: "LU", name: "French", langCode: "fr" },
  { countryCode: "LU", name: "German", langCode: "de" },
  { countryCode: "MO", name: "Chinese", langCode: "zh" },
  { countryCode: "MO", name: "Portuguese", langCode: "pt" },
  { countryCode: "MG", name: "Malagasy", langCode: "mg" },
  { countryCode: "MG", name: "French", langCode: "fr" },
  { countryCode: "MW", name: "Chichewa", langCode: "ny" },
  { countryCode: "MW", name: "English", langCode: "en" },
  { countryCode: "MY", name: "Malay", langCode: "ms" },
  { countryCode: "MV", name: "Dhivehi", langCode: "dv" },
  { countryCode: "ML", name: "Bambara", langCode: "bm" },
  { countryCode: "ML", name: "French", langCode: "fr" },
  { countryCode: "MR", name: "Arabic", langCode: "ar" },
  { countryCode: "MR", name: "Pulaar", langCode: "ff" },
  { countryCode: "MU", name: "English", langCode: "en" },
  { countryCode: "MU", name: "French", langCode: "fr" },
  { countryCode: "MX", name: "Spanish", langCode: "es" },
  { countryCode: "FM", name: "English", langCode: "en" },
  { countryCode: "MD", name: "Romanian", langCode: "ro" },
  { countryCode: "MN", name: "Mongolian", langCode: "mn" },
  { countryCode: "MA", name: "Arabic", langCode: "ar" },
  { countryCode: "MA", name: "Berber", langCode: "ber" },
  { countryCode: "MZ", name: "Portuguese", langCode: "pt" },
  { countryCode: "MM", name: "Burmese", langCode: "my" },
  { countryCode: "NA", name: "English", langCode: "en" },
  { countryCode: "NA", name: "Afrikaans", langCode: "af" },
  { countryCode: "NP", name: "Nepali", langCode: "ne" },
  { countryCode: "NL", name: "Dutch", langCode: "nl" },
  { countryCode: "NL", name: "Frisian", langCode: "fy" },
  { countryCode: "NC", name: "French", langCode: "fr" },
  { countryCode: "NZ", name: "English", langCode: "en" },
  { countryCode: "NG", name: "English", langCode: "en" },
  { countryCode: "KP", name: "Korean", langCode: "ko" },
  { countryCode: "KR", name: "Korean", langCode: "ko" },
  { countryCode: "NO", name: "Norwegian", langCode: "no" },
  { countryCode: "OM", name: "Arabic", langCode: "ar" },
  { countryCode: "PK", name: "Urdu", langCode: "ur" },
  { countryCode: "PK", name: "English", langCode: "en" },
  { countryCode: "PW", name: "English", langCode: "en" },
  { countryCode: "PA", name: "Spanish", langCode: "es" },
  { countryCode: "PA", name: "Panamanian Spanish", langCode: "es-PA" },
  { countryCode: "PG", name: "Hiri Motu", langCode: "ho" },
  { countryCode: "PG", name: "Tok Pisin", langCode: "tpi" },
  { countryCode: "PY", name: "Spanish", langCode: "es" },
  { countryCode: "PY", name: "Guaraní", langCode: "gn" },
  { countryCode: "PE", name: "Spanish", langCode: "es" },
  { countryCode: "PE", name: "Quechua", langCode: "qu" },
  { countryCode: "PH", name: "Filipino", langCode: "fil" },
  { countryCode: "PH", name: "English", langCode: "en" },
  { countryCode: "PL", name: "Polish", langCode: "pl" },
  { countryCode: "PT", name: "Portuguese", langCode: "pt" },
  { countryCode: "QA", name: "Arabic", langCode: "ar" },
  { countryCode: "RO", name: "Romanian", langCode: "ro" },
  { countryCode: "RU", name: "Russian", langCode: "ru" },
  { countryCode: "RW", name: "Kinyarwanda", langCode: "rw" },
  { countryCode: "RW", name: "French", langCode: "fr" },
  { countryCode: "KN", name: "English", langCode: "en" },
  { countryCode: "LC", name: "English", langCode: "en" },
  { countryCode: "VC", name: "English", langCode: "en" },
  { countryCode: "WS", name: "Samoan", langCode: "sm" },
  { countryCode: "SM", name: "Italian", langCode: "it" },
  { countryCode: "ST", name: "Portuguese", langCode: "pt" },
  { countryCode: "SA", name: "Arabic", langCode: "ar" },
  { countryCode: "SC", name: "Seychellois Creole", langCode: "crs" },
  { countryCode: "SC", name: "French", langCode: "fr" },
  { countryCode: "SC", name: "English", langCode: "en" },
  { countryCode: "SL", name: "English", langCode: "en" },
  { countryCode: "SG", name: "English", langCode: "en" },
  { countryCode: "SG", name: "Mandarin", langCode: "zh" },
  { countryCode: "SG", name: "Malay", langCode: "ms" },
  { countryCode: "SG", name: "Tamil", langCode: "ta" },
  { countryCode: "SK", name: "Slovak", langCode: "sk" },
  { countryCode: "SI", name: "Slovenian", langCode: "sl" },
  { countryCode: "SB", name: "Solomon Islands Pidgin", langCode: "sbi" },
  { countryCode: "SO", name: "Somali", langCode: "so" },
  { countryCode: "SO", name: "Arabic", langCode: "ar" },
  { countryCode: "ZA", name: "Afrikaans", langCode: "af" },
  { countryCode: "ZA", name: "English", langCode: "en" },
  { countryCode: "ZA", name: "Zulu", langCode: "zu" },
  { countryCode: "ZA", name: "Xhosa", langCode: "xh" },
  { countryCode: "SS", name: "English", langCode: "en" },
  { countryCode: "SS", name: "Arabic", langCode: "ar" },
  { countryCode: "ES", name: "Spanish", langCode: "es" },
  { countryCode: "LK", name: "Sinhala", langCode: "si" },
  { countryCode: "LK", name: "Tamil", langCode: "ta" },
  { countryCode: "SD", name: "Arabic", langCode: "ar" },
  { countryCode: "SR", name: "Dutch", langCode: "nl" },
  { countryCode: "SV", name: "Spanish", langCode: "es" },
  { countryCode: "SE", name: "Swedish", langCode: "sv" },
  { countryCode: "CH", name: "German", langCode: "de" },
  { countryCode: "CH", name: "French", langCode: "fr" },
  { countryCode: "CH", name: "Italian", langCode: "it" },
  { countryCode: "CH", name: "Romansh", langCode: "rm" },
  { countryCode: "SY", name: "Arabic", langCode: "ar" },
  { countryCode: "TW", name: "Mandarin", langCode: "zh" },
  { countryCode: "TJ", name: "Tajik", langCode: "tg" },
  { countryCode: "TZ", name: "Swahili", langCode: "sw" },
  { countryCode: "TZ", name: "English", langCode: "en" },
  { countryCode: "TH", name: "Thai", langCode: "th" },
  { countryCode: "TL", name: "Tetum", langCode: "tet" },
  { countryCode: "TL", name: "Portuguese", langCode: "pt" },
  { countryCode: "TO", name: "Tongan", langCode: "to" },
  { countryCode: "TT", name: "English", langCode: "en" },
  { countryCode: "TN", name: "Arabic", langCode: "ar" },
  { countryCode: "TR", name: "Turkish", langCode: "tr" },
  { countryCode: "TM", name: "Turkmen", langCode: "tk" },
  { countryCode: "TV", name: "Tuvaluan", langCode: "tvl" },
  { countryCode: "UG", name: "English", langCode: "en" },
  { countryCode: "UG", name: "Luganda", langCode: "lg" },
  { countryCode: "UA", name: "Ukrainian", langCode: "uk" },
  { countryCode: "AE", name: "Arabic", langCode: "ar" },
  { countryCode: "US", name: "English", langCode: "en" },
  { countryCode: "UY", name: "Spanish", langCode: "es" },
  { countryCode: "UZ", name: "Uzbek", langCode: "uz" },
  { countryCode: "VU", name: "Bislama", langCode: "bi" },
  { countryCode: "VU", name: "English", langCode: "en" },
  { countryCode: "VU", name: "French", langCode: "fr" },
  { countryCode: "VE", name: "Spanish", langCode: "es" },
  { countryCode: "VN", name: "Vietnamese", langCode: "vi" },
  { countryCode: "YE", name: "Arabic", langCode: "ar" },
  { countryCode: "ZM", name: "English", langCode: "en" },
  { countryCode: "ZW", name: "English", langCode: "en" },
  { countryCode: "ZW", name: "Shona", langCode: "sn" },
  { countryCode: "ZW", name: "Sindebele", langCode: "nd" },
];

export const dummyKeywords = [
  "Interior Desgin",
  "Flooring and Tiling",
  "Walling",
  "Carpentry",
  "Electric Work",
  "Plumbing",
  "Appliance Installation",
  "Window Treatements",
  "Furniture Making",
  "Lightning",
  "Paint",
  "Water Supply",
];
export const topPicks = [
  {
    provider: {
      name: "America Wisdom World Corporation",
      type: "Architectural Designer",
      rating: 8.2,
      region: "Taiwan",
      image: dummyAvatar,
      designation: "Architectural Designer",
    },
    keywords: [
      "Walling",
      "Carpentry",
      "Flooring",
      "Interior Desgin",
      "Painting Carpentry",
      "Window Treatements",
      "Furniture Making",
    ],
    otherProjects: [
      { type: "Architectural Design" },
      { type: "Architectural Design" },
      { type: "Architectural Design" },
      { type: "Architectural Design" },
      { type: "Architectural Design" },
      { type: "Architectural Design" },
      { type: "Architectural Design" },
      { type: "Architectural Design" },
      { type: "Architectural Design" },
    ],
  },
  {
    provider: {
      name: "America Wisdom World Corporation",
      type: "Architectural Designer",
      rating: 8.2,
      region: "Taiwan",
      image: dummyAvatar,
      designation: "Architectural Designer",
    },
    keywords: ["Walling", "Carpentry", "Flooring", "Interior Desgin"],
    otherProjects: [
      { type: "Architectural Design" },
      { type: "Architectural Design" },
      { type: "Architectural Design" },
      { type: "Architectural Design" },
      { type: "Architectural Design" },
      { type: "Architectural Design" },
      { type: "Architectural Design" },
      { type: "Architectural Design" },
      { type: "Architectural Design" },
    ],
  },
];

export const providerProfileOptions = [
  "Profile",
  "Showcase",
  "Pricing",
  "Order Now",
];
export const profileDropdownOptions = [
  {
    title: "Dashboard",
    url:"/dashboard",
    icon: (
      <img
        height={130}
        width={30}
        className="object-fit-cover"
        src={upgradeIcon}
      />
    ),
  },
  {
    title: "Upgrade",
    url:"/profile/settings",
    icon: (
      <img
        height={130}
        width={30}
        className="object-fit-cover"
        src={upgradeIcon}
      />
    ),
  },
  {
    title: "Profile",
    url:"/profile/settings",
    icon: (
      <img
        height={130}
        width={30}
        className="object-fit-cover"
        src={profileIcon}
      />
    ),
  },
  {
    title: "Profile",
    url:"/profile",
    icon: (
      <img
        height={130}
        width={30}
        className="object-fit-cover"
        src={profileIcon}
      />
    ),
  },
  {
    title: "Billing",
    icon: (
      <img
        height={130}
        width={30}
        className="object-fit-cover"
        src={billingIcon}
      />
    ),
  },
  {
    title: "Support",
    icon: (
      <img
        height={130}
        width={30}
        className="object-fit-cover"
        src={supportIcon}
      />
    ),
  },
  {
    title: "Log out",
    url:"/logout",
    icon: (
      <img
        height={130}
        width={30}
        className="object-fit-cover"
        src={logOutIcon}
      />
    ),
  },
];

export const profilePageUserAOptions = [
  {
    icon: ProfilePageUserAIcons?.basicInfo,
    title: "Basic Info",
    link: "/profile/basic-info",
  },
  {
    icon: ProfilePageUserAIcons?.qrCode,
    title: "QR Code",
    link: "/profile/qr-code",
  },
  {
    icon: ProfilePageUserAIcons?.star,
    title: "Ratings",
    link: "/profile/ratings",
  },
  {
    icon: ProfilePageUserAIcons?.honors,
    title: "Honors",
    link: "/profile/honors",
  },
  {
    icon: ProfilePageUserAIcons?.manageAccount,
    title: "Manage Account",
    link: "/profile/manage-account",
  },
  {
    icon: ProfilePageUserAIcons?.paymentAccount,
    title: "Recieving Account",
    link: "/profile/payment",
  },
  {
    icon: ProfilePageUserAIcons?.signature,
    title: "Signature",
    link: "/profile/signature",
  },
  {
    icon: ProfilePageUserAIcons?.certification,
    title: "Certification",
    link: "/profile/certification",
  },
  { icon: ProfilePageUserAIcons?.invites,
     title: "Invites",
     link: "/profile/invites",
    },
  {
    icon: ProfilePageUserAIcons?.disputeVote,
    title: "Dispute Vote",
    link: "/profile/dispute-vote",
  },
  {
    icon: ProfilePageUserAIcons?.feedback,
    title: "Feedback",
    link: "/profile/feedback",
  },
  {
    icon: ProfilePageUserAIcons?.switchTo,
    title: "Switch to Client",
    link: "",
  },
];
export const profilePageUserBOptions = [
  {
    icon: ProfilePageUserBIcons?.basicInfo,
    title: "Basic Info",
    link: "/profile/basic-info",
  },
  {
    icon: ProfilePageUserBIcons?.qrCode,
    title: "QR Code",
    link: "/profile/qr-code",
  },
  {
    icon: ProfilePageUserBIcons?.star,
    title: "Ratings",
    link: "/profile/ratings",
  },
  {
    icon: ProfilePageUserBIcons?.honors,
    title: "Honors",
    link: "/profile/honors",
  },
  {
    icon: ProfilePageUserBIcons?.manageAccount,
    title: "Manage Account",
    link: "/profile/manage-account",
  },
  {
    icon: ProfilePageUserBIcons?.paymentAccount,
    title: "Payment Account",
    link: "/profile/payment",
  },
  {
    icon: ProfilePageUserBIcons?.signature,
    title: "Signature",
    link: "/profile/signature",
  },
  {
    icon: ProfilePageUserBIcons?.certification,
    title: "Disclaimer",
    link: "/profile/settings",
  },
  {
    icon: ProfilePageUserBIcons?.invites,
    title: "Invites",
    link: "/profile/invites",
  },
  {
    icon: ProfilePageUserBIcons?.disputeVote,
    title: "Dispute Vote",
    link: "/profile/dispute-vote",
  },
  {
    icon: ProfilePageUserBIcons?.feedback,
    title: "Feedback",
    link: "/profile/feedback",
  },
  {
    icon: ProfilePageUserBIcons?.switchTo,
    title: "Switch to Provider",
    link: "/profile/settings",
  },
];
export const dummyShowCaseItems = [
  {
    type: "Architectural Design",
    id: 1,
    isFavourite: true,
    role: "client",
    items: [
      { type: "image", src: dummyShowCaseImage },
      { type: "video", src: "/show-case-video.mp4" },
      { type: "image", src: dummyShowCaseImage },
      { type: "image", src: dummyShowCaseImage },
    ],
  },
  { type: "Architectural Design", id: 2, isFavourite: false,items: [
    { type: "image", src: dummyShowCaseImage },
    { type: "video", src: "/show-case-video.mp4" },
    { type: "image", src: dummyShowCaseImage },
    { type: "image", src: dummyShowCaseImage },
  ] },
  { type: "Architectural Design", id: 3, isFavourite: false, role: "client",items: [
    { type: "image", src: dummyShowCaseImage },
    { type: "video", src: "/show-case-video.mp4" },
    { type: "image", src: dummyShowCaseImage },
    { type: "image", src: dummyShowCaseImage },
  ] },
  { type: "Architectural Design", id: 4, isFavourite: false, role: "client",items: [
    { type: "image", src: dummyShowCaseImage },
    { type: "video", src: "/show-case-video.mp4" },
    { type: "image", src: dummyShowCaseImage },
    { type: "image", src: dummyShowCaseImage },
  ] },
  { type: "Architectural Design", id: 5, isFavourite: false,items: [
    { type: "image", src: dummyShowCaseImage },
    { type: "video", src: "/show-case-video.mp4" },
    { type: "image", src: dummyShowCaseImage },
    { type: "image", src: dummyShowCaseImage },
  ] },
  { type: "Architectural Design", id: 6, isFavourite: false,items: [
    { type: "image", src: dummyShowCaseImage },
    { type: "video", src: "/show-case-video.mp4" },
    { type: "image", src: dummyShowCaseImage },
    { type: "image", src: dummyShowCaseImage },
  ] },
  { type: "Architectural Design", id: 7, isFavourite: false, role: "client",items: [
    { type: "image", src: dummyShowCaseImage },
    { type: "video", src: "/show-case-video.mp4" },
    { type: "image", src: dummyShowCaseImage },
    { type: "image", src: dummyShowCaseImage },
  ] },
  { type: "Architectural Design", id: 8, isFavourite: false ,items: [
    { type: "image", src: dummyShowCaseImage },
    { type: "video", src: "/show-case-video.mp4" },
    { type: "image", src: dummyShowCaseImage },
    { type: "image", src: dummyShowCaseImage },
  ]},
  { type: "Architectural Design", id: 9, isFavourite: true ,items: [
    { type: "image", src: dummyShowCaseImage },
    { type: "video", src: "/show-case-video.mp4" },
    { type: "image", src: dummyShowCaseImage },
    { type: "image", src: dummyShowCaseImage },
  ]},
  { type: "Architectural Design", id: 10, isFavourite: false,items: [
    { type: "image", src: dummyShowCaseImage },
    { type: "video", src: "/show-case-video.mp4" },
    { type: "image", src: dummyShowCaseImage },
    { type: "image", src: dummyShowCaseImage },
  ] },
  { type: "Architectural Design", id: 11, isFavourite: false,items: [
    { type: "image", src: dummyShowCaseImage },
    { type: "video", src: "/show-case-video.mp4" },
    { type: "image", src: dummyShowCaseImage },
    { type: "image", src: dummyShowCaseImage },
  ] },
  { type: "Architectural Design", id: 12, isFavourite: false ,
    items: [
      { type: "image", src: dummyShowCaseImage },
      { type: "video", src: "/show-case-video.mp4" },
      { type: "image", src: dummyShowCaseImage },
      { type: "image", src: dummyShowCaseImage },
    ]
  },
];

export const dummyProfilePricing = [
  {
    title: "Package",
    price: `$10`,
    subtitle: "text here",
    points: [
      { text: "text 1 here ", isChecked: true },
      { text: "text 2 here", isChecked: false },
    ],
  },
  {
    title: "Package",
    price: `$20`,
    subtitle: "text here",
    points: [
      { text: "text 1 here ", isChecked: true },
      { text: "text 2 here", isChecked: false },
    ],
  },
];

export const dummyOrderTemplates = [
  { title: "Interior" },
  { title: "Carpenting" },
  { title: "Walling" },
  { title: "Painting" },
  { title: "Wiring" },
  { title: "Appliance installation" },
];

export const dummyUsers = [
  { name: "Syna", photo: dummyProfilePhoto, id: 1, isOnline: true },
  { name: "Alicina", photo: dummyProfilePhoto, id: 2 },
  { name: "Servine", photo: dummyProfilePhoto, id: 3 },
  { name: "Donal Trump", photo: dummyProfilePhoto, id: 4 },
  { name: "Miss Elva", photo: dummyProfilePhoto, id: 5 },
];
export const dummyTimeLists = {
  ams: [
    "7:00 - 8:00",
    "8:00 - 9:00",
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
  ],
  pms: [
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18 :00 - 19:00",
  ],
};

export const dummyBookings = [
  {
    communicationSummary:
      "Initial meeting to discuss design preferences and space functionality.",
    type: "Interior Design",
    time: `10:00 - 15:00`,
    date: "07/09/2024",
    projectScale: 30,
    scaleUnit: "sq ft",
    budgetRange: "500$ - 1500$",
    status: "Upcomming",
    isRead: false,
  },
  {
    communicationSummary:
      "Final review of design drafts and material selection.",
    type: "Interior Design",
    time: `11:00 - 16:00`,
    date: "08/09/2024",
    projectScale: 20,
    scaleUnit: "rooms",
    budgetRange: "1000$ - 3000$",
    status: "Starting Soon",
    isRead: false,
  },
  {
    communicationSummary:
      "Site visit to assess current conditions and discuss renovation plans.",
    type: "Interior Design",
    time: `09:00 - 12:00`,
    date: "09/09/2024",
    projectScale: 40,
    scaleUnit: "sq ft",
    budgetRange: "200$ - 800$",
    status: "Completed",
    isRead: true,
  },
  {
    communicationSummary:
      "Consultation for color schemes and furniture layout.",
    type: "Interior Design",
    time: `14:00 - 17:00`,
    date: "10/09/2024",
    projectScale: 15,
    scaleUnit: "rooms",
    budgetRange: "300$ - 700$",
    status: "Upcomming",
    isRead: false,
  },
  {
    communicationSummary: "Discussion on lighting options and room ambiance.",
    type: "Interior Design",
    time: `13:00 - 18:00`,
    date: "11/09/2024",
    projectScale: 25,
    scaleUnit: "sq ft",
    budgetRange: "150$ - 600$",
    status: "Starting Soon",
    isRead: false,
  },
  {
    communicationSummary: "Evaluation of flooring options and textures.",
    type: "Interior Design",
    time: `10:00 - 13:00`,
    date: "12/09/2024",
    projectScale: 35,
    scaleUnit: "sq ft",
    budgetRange: "400$ - 1200$",
    status: "Completed",
    isRead: true,
  },
  {
    communicationSummary: "Review of final design and sign-off for execution.",
    type: "Interior Design",
    time: `15:00 - 18:00`,
    date: "13/09/2024",
    projectScale: 10,
    scaleUnit: "rooms",
    budgetRange: "200$ - 500$",
    status: "Starting Soon",
    isRead: false,
  },
  {
    communicationSummary: "Pre-installation walk-through and preparation.",
    type: "Interior Design",
    time: `09:00 - 14:00`,
    date: "14/09/2024",
    projectScale: 45,
    scaleUnit: "sq ft",
    budgetRange: "800$ - 2000$",
    status: "Starting Soon",
    isRead: false,
  },
  {
    communicationSummary: "Final adjustments and styling touches.",
    type: "Interior Design",
    time: `11:00 - 16:00`,
    date: "15/09/2024",
    projectScale: 25,
    scaleUnit: "sq ft",
    budgetRange: "600$ - 1500$",
    status: "Completed",
    isRead: true,
  },
  {
    communicationSummary: "Post-project review and client feedback session.",
    type: "Interior Design",
    time: `12:00 - 15:00`,
    date: "16/09/2024",
    projectScale: 30,
    scaleUnit: "rooms",
    budgetRange: "100$ - 400$",
    status: "Starting Soon",
    isRead: false,
  },
  {
    communicationSummary: "Evaluation of maintenance and aftercare needs.",
    type: "Interior Design",
    time: `10:00 - 13:00`,
    date: "17/09/2024",
    projectScale: 50,
    scaleUnit: "sq ft",
    budgetRange: "200$ - 800$",
    status: "Cancelled",
    isRead: false,
  },
];

export const dummyOrders = [
  {
    type: "Interior Design",
    corporation: "America Wisdom World Corporation",
    orderDate: Date.now(),
    deliveryDate: Date.now() + 300000000, // ~3.5 days from now
    total: "US$97,000",
    status: "Awaiting Confirmation",
    id: 1,
    isRead: true,
  },
  {
    type: "Construction",
    corporation: "Global Build Inc.",
    orderDate: Date.now() - 86400000, // 1 day ago
    deliveryDate: Date.now() + 604800000, // 7 days from now
    total: "US$150,000",
    status: "In Progress",
    id: 2,
  },
  {
    type: "Furniture",
    corporation: "Home Comfort Co.",
    orderDate: Date.now() - 172800000, // 2 days ago
    deliveryDate: Date.now() + 86400000, // 1 day from now
    total: "US$25,000",
    status: "Awaiting Delivery",
    id: 3,
  },
  {
    type: "Landscape Design",
    corporation: "Green Thumb Enterprises",
    orderDate: Date.now() - 259200000, // 3 days ago
    deliveryDate: Date.now() - 86400000, // 1 day ago
    total: "US$32,000",
    status: "Quote/Accept",
    id: 4,
  },
  {
    type: "Renovation",
    corporation: "Urban Renewal Ltd.",
    orderDate: Date.now() - 432000000, // 5 days ago
    deliveryDate: Date.now() + 1209600000, // 14 days from now
    total: "US$200,000",
    status: "Cancelled",
    id: 5,
  },
  {
    type: "Electrical Works",
    corporation: "Bright Sparks Electrical",
    orderDate: Date.now() - 604800000, // 7 days ago
    deliveryDate: Date.now() + 259200000, // 3 days from now
    total: "US$45,000",
    status: "Quote/Accept",
    id: 6,
  },
  {
    type: "Plumbing",
    corporation: "Water Works Ltd.",
    orderDate: Date.now() - 43200000, // 12 hours ago
    deliveryDate: Date.now() + 259200000, // 3 days from now
    total: "US$15,000",
    status: "In Progress",
    id: 7,
  },
  {
    type: "HVAC",
    corporation: "Climate Control Systems",
    orderDate: Date.now() - 864000000, // 10 days ago
    deliveryDate: Date.now() + 432000000, // 5 days from now
    total: "US$60,000",
    status: "Awaiting Delivery",
    id: 8,
  },
  {
    type: "Painting",
    corporation: "Colorful Walls",
    orderDate: Date.now() - 604800000, // 7 days ago
    deliveryDate: Date.now() + 86400000, // 1 day from now
    total: "US$10,000",
    status: "Delivered",
    id: 9,
  },
  {
    type: "Roofing",
    corporation: "Top Notch Roofing",
    orderDate: Date.now() - 259200000, // 3 days ago
    deliveryDate: Date.now() + 518400000, // 6 days from now
    total: "US$80,000",
    status: "Awaiting Confirmation",
    id: 10,
  },
];

export const dummyIntroDescription = `Hello, my name is John Smith, and I am a Senior Interior Designer at Creative Spaces Design Co., where I have had the pleasure of transforming residential and commercial spaces into stunning, functional environments for over 15 years.

From a young age, I was captivated by the power of design to shape our experiences and improve our daily lives. This passion led me to pursue a Bachelor’s degree in Interior Architecture from the University of California, Berkeley
`;