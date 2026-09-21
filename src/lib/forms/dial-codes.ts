/**
 * Country calling codes for the enquiry form's phone field, and the guess that
 * picks one for a reader who has not chosen.
 *
 * ## why not IP geolocation
 * The obvious way to guess a caller's country is their IP, and it is the wrong
 * one here for three reasons specific to this deployment:
 *
 *   - `connect-src 'self'` (next.config.ts). A browser call to ipapi.co or any
 *     other lookup service is blocked outright, in production only, silently.
 *     Widening the CSP for a form convenience is a bad trade.
 *   - the marketing pages are static/ISR, so there is no per-request render in
 *     which a server could read a header and bake the answer in.
 *   - we self-host behind nginx, not Vercel or Cloudflare, so there is no
 *     country header to read for free — it would mean a MaxMind database on
 *     the server, plus a privacy-policy line about processing visitor IPs.
 *
 * The browser's own timezone costs none of that and is about as accurate: it
 * comes from the machine, not the network path, so it survives a VPN that an
 * IP lookup would get wrong. It is a GUESS either way, which is why the select
 * beside the field is always free to override it.
 *
 * ## the fallback chain
 * `detectDialCode` tries, in order: the IANA timezone, then the region of the
 * browser's locale, then `DEFAULT_DIAL`. Two signals rather than one because
 * each fails differently — `TZ_COUNTRY` below is curated rather than
 * exhaustive, and a locale of plain "en" carries no region at all.
 */

export type DialCountry = {
  /** ISO 3166-1 alpha-2, and the key `TZ_COUNTRY` resolves to. */
  readonly iso: string;
  readonly name: string;
  /** E.164 country calling code, with its leading `+`. */
  readonly dial: string;
};

/**
 * Where an unresolved reader starts. India rather than the US because that is
 * where the largest share of this site's enquiries come from, and because a
 * wrong default costs an Indian reader nothing — the number they type is the
 * one the code already says.
 */
export const DEFAULT_DIAL = "+91";

/**
 * Calling codes by country, sorted by name so the select reads alphabetically.
 * Shared codes are listed per country (+1 for the US, Canada and the
 * Caribbean; +7 for Russia and Kazakhstan): the reader picks a country, and
 * which of them shares a code is not their problem.
 */
export const DIAL_CODES: readonly DialCountry[] = [
  { iso: "AF", name: "Afghanistan", dial: "+93" },
  { iso: "AL", name: "Albania", dial: "+355" },
  { iso: "DZ", name: "Algeria", dial: "+213" },
  { iso: "AD", name: "Andorra", dial: "+376" },
  { iso: "AO", name: "Angola", dial: "+244" },
  { iso: "AG", name: "Antigua and Barbuda", dial: "+1" },
  { iso: "AR", name: "Argentina", dial: "+54" },
  { iso: "AM", name: "Armenia", dial: "+374" },
  { iso: "AW", name: "Aruba", dial: "+297" },
  { iso: "AU", name: "Australia", dial: "+61" },
  { iso: "AT", name: "Austria", dial: "+43" },
  { iso: "AZ", name: "Azerbaijan", dial: "+994" },
  { iso: "BS", name: "Bahamas", dial: "+1" },
  { iso: "BH", name: "Bahrain", dial: "+973" },
  { iso: "BD", name: "Bangladesh", dial: "+880" },
  { iso: "BB", name: "Barbados", dial: "+1" },
  { iso: "BY", name: "Belarus", dial: "+375" },
  { iso: "BE", name: "Belgium", dial: "+32" },
  { iso: "BZ", name: "Belize", dial: "+501" },
  { iso: "BJ", name: "Benin", dial: "+229" },
  { iso: "BM", name: "Bermuda", dial: "+1" },
  { iso: "BT", name: "Bhutan", dial: "+975" },
  { iso: "BO", name: "Bolivia", dial: "+591" },
  { iso: "BA", name: "Bosnia and Herzegovina", dial: "+387" },
  { iso: "BW", name: "Botswana", dial: "+267" },
  { iso: "BR", name: "Brazil", dial: "+55" },
  { iso: "BN", name: "Brunei", dial: "+673" },
  { iso: "BG", name: "Bulgaria", dial: "+359" },
  { iso: "BF", name: "Burkina Faso", dial: "+226" },
  { iso: "BI", name: "Burundi", dial: "+257" },
  { iso: "KH", name: "Cambodia", dial: "+855" },
  { iso: "CM", name: "Cameroon", dial: "+237" },
  { iso: "CA", name: "Canada", dial: "+1" },
  { iso: "CV", name: "Cape Verde", dial: "+238" },
  { iso: "KY", name: "Cayman Islands", dial: "+1" },
  { iso: "CF", name: "Central African Republic", dial: "+236" },
  { iso: "TD", name: "Chad", dial: "+235" },
  { iso: "CL", name: "Chile", dial: "+56" },
  { iso: "CN", name: "China", dial: "+86" },
  { iso: "CO", name: "Colombia", dial: "+57" },
  { iso: "KM", name: "Comoros", dial: "+269" },
  { iso: "CG", name: "Congo", dial: "+242" },
  { iso: "CD", name: "Congo (DRC)", dial: "+243" },
  { iso: "CR", name: "Costa Rica", dial: "+506" },
  { iso: "CI", name: "Cote d’Ivoire", dial: "+225" },
  { iso: "HR", name: "Croatia", dial: "+385" },
  { iso: "CU", name: "Cuba", dial: "+53" },
  { iso: "CY", name: "Cyprus", dial: "+357" },
  { iso: "CZ", name: "Czechia", dial: "+420" },
  { iso: "DK", name: "Denmark", dial: "+45" },
  { iso: "DJ", name: "Djibouti", dial: "+253" },
  { iso: "DM", name: "Dominica", dial: "+1" },
  { iso: "DO", name: "Dominican Republic", dial: "+1" },
  { iso: "EC", name: "Ecuador", dial: "+593" },
  { iso: "EG", name: "Egypt", dial: "+20" },
  { iso: "SV", name: "El Salvador", dial: "+503" },
  { iso: "GQ", name: "Equatorial Guinea", dial: "+240" },
  { iso: "ER", name: "Eritrea", dial: "+291" },
  { iso: "EE", name: "Estonia", dial: "+372" },
  { iso: "SZ", name: "Eswatini", dial: "+268" },
  { iso: "ET", name: "Ethiopia", dial: "+251" },
  { iso: "FJ", name: "Fiji", dial: "+679" },
  { iso: "FI", name: "Finland", dial: "+358" },
  { iso: "FR", name: "France", dial: "+33" },
  { iso: "GA", name: "Gabon", dial: "+241" },
  { iso: "GM", name: "Gambia", dial: "+220" },
  { iso: "GE", name: "Georgia", dial: "+995" },
  { iso: "DE", name: "Germany", dial: "+49" },
  { iso: "GH", name: "Ghana", dial: "+233" },
  { iso: "GI", name: "Gibraltar", dial: "+350" },
  { iso: "GR", name: "Greece", dial: "+30" },
  { iso: "GL", name: "Greenland", dial: "+299" },
  { iso: "GD", name: "Grenada", dial: "+1" },
  { iso: "GT", name: "Guatemala", dial: "+502" },
  { iso: "GN", name: "Guinea", dial: "+224" },
  { iso: "GY", name: "Guyana", dial: "+592" },
  { iso: "HT", name: "Haiti", dial: "+509" },
  { iso: "HN", name: "Honduras", dial: "+504" },
  { iso: "HK", name: "Hong Kong", dial: "+852" },
  { iso: "HU", name: "Hungary", dial: "+36" },
  { iso: "IS", name: "Iceland", dial: "+354" },
  { iso: "IN", name: "India", dial: "+91" },
  { iso: "ID", name: "Indonesia", dial: "+62" },
  { iso: "IR", name: "Iran", dial: "+98" },
  { iso: "IQ", name: "Iraq", dial: "+964" },
  { iso: "IE", name: "Ireland", dial: "+353" },
  { iso: "IL", name: "Israel", dial: "+972" },
  { iso: "IT", name: "Italy", dial: "+39" },
  { iso: "JM", name: "Jamaica", dial: "+1" },
  { iso: "JP", name: "Japan", dial: "+81" },
  { iso: "JO", name: "Jordan", dial: "+962" },
  { iso: "KZ", name: "Kazakhstan", dial: "+7" },
  { iso: "KE", name: "Kenya", dial: "+254" },
  { iso: "KW", name: "Kuwait", dial: "+965" },
  { iso: "KG", name: "Kyrgyzstan", dial: "+996" },
  { iso: "LA", name: "Laos", dial: "+856" },
  { iso: "LV", name: "Latvia", dial: "+371" },
  { iso: "LB", name: "Lebanon", dial: "+961" },
  { iso: "LS", name: "Lesotho", dial: "+266" },
  { iso: "LR", name: "Liberia", dial: "+231" },
  { iso: "LY", name: "Libya", dial: "+218" },
  { iso: "LI", name: "Liechtenstein", dial: "+423" },
  { iso: "LT", name: "Lithuania", dial: "+370" },
  { iso: "LU", name: "Luxembourg", dial: "+352" },
  { iso: "MO", name: "Macao", dial: "+853" },
  { iso: "MG", name: "Madagascar", dial: "+261" },
  { iso: "MW", name: "Malawi", dial: "+265" },
  { iso: "MY", name: "Malaysia", dial: "+60" },
  { iso: "MV", name: "Maldives", dial: "+960" },
  { iso: "ML", name: "Mali", dial: "+223" },
  { iso: "MT", name: "Malta", dial: "+356" },
  { iso: "MR", name: "Mauritania", dial: "+222" },
  { iso: "MU", name: "Mauritius", dial: "+230" },
  { iso: "MX", name: "Mexico", dial: "+52" },
  { iso: "MD", name: "Moldova", dial: "+373" },
  { iso: "MC", name: "Monaco", dial: "+377" },
  { iso: "MN", name: "Mongolia", dial: "+976" },
  { iso: "ME", name: "Montenegro", dial: "+382" },
  { iso: "MA", name: "Morocco", dial: "+212" },
  { iso: "MZ", name: "Mozambique", dial: "+258" },
  { iso: "MM", name: "Myanmar", dial: "+95" },
  { iso: "NA", name: "Namibia", dial: "+264" },
  { iso: "NP", name: "Nepal", dial: "+977" },
  { iso: "NL", name: "Netherlands", dial: "+31" },
  { iso: "NZ", name: "New Zealand", dial: "+64" },
  { iso: "NI", name: "Nicaragua", dial: "+505" },
  { iso: "NE", name: "Niger", dial: "+227" },
  { iso: "NG", name: "Nigeria", dial: "+234" },
  { iso: "MK", name: "North Macedonia", dial: "+389" },
  { iso: "NO", name: "Norway", dial: "+47" },
  { iso: "OM", name: "Oman", dial: "+968" },
  { iso: "PK", name: "Pakistan", dial: "+92" },
  { iso: "PS", name: "Palestine", dial: "+970" },
  { iso: "PA", name: "Panama", dial: "+507" },
  { iso: "PG", name: "Papua New Guinea", dial: "+675" },
  { iso: "PY", name: "Paraguay", dial: "+595" },
  { iso: "PE", name: "Peru", dial: "+51" },
  { iso: "PH", name: "Philippines", dial: "+63" },
  { iso: "PL", name: "Poland", dial: "+48" },
  { iso: "PT", name: "Portugal", dial: "+351" },
  { iso: "PR", name: "Puerto Rico", dial: "+1" },
  { iso: "QA", name: "Qatar", dial: "+974" },
  { iso: "RO", name: "Romania", dial: "+40" },
  { iso: "RU", name: "Russia", dial: "+7" },
  { iso: "RW", name: "Rwanda", dial: "+250" },
  { iso: "SA", name: "Saudi Arabia", dial: "+966" },
  { iso: "SN", name: "Senegal", dial: "+221" },
  { iso: "RS", name: "Serbia", dial: "+381" },
  { iso: "SC", name: "Seychelles", dial: "+248" },
  { iso: "SL", name: "Sierra Leone", dial: "+232" },
  { iso: "SG", name: "Singapore", dial: "+65" },
  { iso: "SK", name: "Slovakia", dial: "+421" },
  { iso: "SI", name: "Slovenia", dial: "+386" },
  { iso: "SO", name: "Somalia", dial: "+252" },
  { iso: "ZA", name: "South Africa", dial: "+27" },
  { iso: "KR", name: "South Korea", dial: "+82" },
  { iso: "SS", name: "South Sudan", dial: "+211" },
  { iso: "ES", name: "Spain", dial: "+34" },
  { iso: "LK", name: "Sri Lanka", dial: "+94" },
  { iso: "SD", name: "Sudan", dial: "+249" },
  { iso: "SR", name: "Suriname", dial: "+597" },
  { iso: "SE", name: "Sweden", dial: "+46" },
  { iso: "CH", name: "Switzerland", dial: "+41" },
  { iso: "SY", name: "Syria", dial: "+963" },
  { iso: "TW", name: "Taiwan", dial: "+886" },
  { iso: "TJ", name: "Tajikistan", dial: "+992" },
  { iso: "TZ", name: "Tanzania", dial: "+255" },
  { iso: "TH", name: "Thailand", dial: "+66" },
  { iso: "TG", name: "Togo", dial: "+228" },
  { iso: "TT", name: "Trinidad and Tobago", dial: "+1" },
  { iso: "TN", name: "Tunisia", dial: "+216" },
  { iso: "TR", name: "Turkiye", dial: "+90" },
  { iso: "TM", name: "Turkmenistan", dial: "+993" },
  { iso: "UG", name: "Uganda", dial: "+256" },
  { iso: "UA", name: "Ukraine", dial: "+380" },
  { iso: "AE", name: "United Arab Emirates", dial: "+971" },
  { iso: "GB", name: "United Kingdom", dial: "+44" },
  { iso: "US", name: "United States", dial: "+1" },
  { iso: "UY", name: "Uruguay", dial: "+598" },
  { iso: "UZ", name: "Uzbekistan", dial: "+998" },
  { iso: "VE", name: "Venezuela", dial: "+58" },
  { iso: "VN", name: "Vietnam", dial: "+84" },
  { iso: "YE", name: "Yemen", dial: "+967" },
  { iso: "ZM", name: "Zambia", dial: "+260" },
  { iso: "ZW", name: "Zimbabwe", dial: "+263" },
];

/**
 * IANA timezone to ISO country.
 *
 * Curated, not exhaustive: the full table is ~450 zones, and this field does
 * not earn that weight in a bundle that ships above the fold on every landing
 * page. What is here is the zone list for the markets this site sells into,
 * plus the populous zones generally. A missing zone is not a failure —
 * `detectDialCode` falls through to the locale's region, and past that to
 * `DEFAULT_DIAL`.
 *
 * Aliases matter: browsers still report `Asia/Calcutta` for India and
 * `Asia/Saigon` for Vietnam, so both spellings are listed.
 */
export const TZ_COUNTRY: Readonly<Record<string, string>> = {
  // South Asia
  "Asia/Kolkata": "IN",
  "Asia/Calcutta": "IN",
  "Asia/Karachi": "PK",
  "Asia/Dhaka": "BD",
  "Asia/Colombo": "LK",
  "Asia/Kathmandu": "NP",
  "Asia/Thimphu": "BT",
  "Asia/Kabul": "AF",
  "Indian/Maldives": "MV",
  // Middle East
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Asia/Qatar": "QA",
  "Asia/Bahrain": "BH",
  "Asia/Kuwait": "KW",
  "Asia/Muscat": "OM",
  "Asia/Amman": "JO",
  "Asia/Beirut": "LB",
  "Asia/Jerusalem": "IL",
  "Asia/Tel_Aviv": "IL",
  "Asia/Baghdad": "IQ",
  "Asia/Tehran": "IR",
  "Asia/Damascus": "SY",
  "Asia/Aden": "YE",
  "Asia/Hebron": "PS",
  "Asia/Gaza": "PS",
  // East and South-East Asia
  "Asia/Shanghai": "CN",
  "Asia/Chongqing": "CN",
  "Asia/Urumqi": "CN",
  "Asia/Hong_Kong": "HK",
  "Asia/Macau": "MO",
  "Asia/Taipei": "TW",
  "Asia/Tokyo": "JP",
  "Asia/Seoul": "KR",
  "Asia/Singapore": "SG",
  "Asia/Kuala_Lumpur": "MY",
  "Asia/Kuching": "MY",
  "Asia/Jakarta": "ID",
  "Asia/Makassar": "ID",
  "Asia/Jayapura": "ID",
  "Asia/Manila": "PH",
  "Asia/Bangkok": "TH",
  "Asia/Ho_Chi_Minh": "VN",
  "Asia/Saigon": "VN",
  "Asia/Phnom_Penh": "KH",
  "Asia/Vientiane": "LA",
  "Asia/Yangon": "MM",
  "Asia/Ulaanbaatar": "MN",
  "Asia/Brunei": "BN",
  // Central Asia and the Caucasus
  "Asia/Almaty": "KZ",
  "Asia/Tashkent": "UZ",
  "Asia/Bishkek": "KG",
  "Asia/Dushanbe": "TJ",
  "Asia/Ashgabat": "TM",
  "Asia/Tbilisi": "GE",
  "Asia/Yerevan": "AM",
  "Asia/Baku": "AZ",
  // Europe
  "Europe/London": "GB",
  "Europe/Dublin": "IE",
  "Europe/Lisbon": "PT",
  "Europe/Madrid": "ES",
  "Europe/Paris": "FR",
  "Europe/Brussels": "BE",
  "Europe/Amsterdam": "NL",
  "Europe/Luxembourg": "LU",
  "Europe/Berlin": "DE",
  "Europe/Zurich": "CH",
  "Europe/Vienna": "AT",
  "Europe/Rome": "IT",
  "Europe/Malta": "MT",
  "Europe/Athens": "GR",
  "Europe/Nicosia": "CY",
  "Asia/Nicosia": "CY",
  "Europe/Istanbul": "TR",
  "Europe/Copenhagen": "DK",
  "Europe/Oslo": "NO",
  "Europe/Stockholm": "SE",
  "Europe/Helsinki": "FI",
  "Europe/Tallinn": "EE",
  "Europe/Riga": "LV",
  "Europe/Vilnius": "LT",
  "Europe/Warsaw": "PL",
  "Europe/Prague": "CZ",
  "Europe/Bratislava": "SK",
  "Europe/Budapest": "HU",
  "Europe/Ljubljana": "SI",
  "Europe/Zagreb": "HR",
  "Europe/Sarajevo": "BA",
  "Europe/Belgrade": "RS",
  "Europe/Podgorica": "ME",
  "Europe/Skopje": "MK",
  "Europe/Tirane": "AL",
  "Europe/Sofia": "BG",
  "Europe/Bucharest": "RO",
  "Europe/Chisinau": "MD",
  "Europe/Kyiv": "UA",
  "Europe/Kiev": "UA",
  "Europe/Minsk": "BY",
  "Europe/Moscow": "RU",
  "Asia/Yekaterinburg": "RU",
  "Asia/Novosibirsk": "RU",
  "Asia/Vladivostok": "RU",
  "Europe/Reykjavik": "IS",
  "Europe/Monaco": "MC",
  "Europe/Andorra": "AD",
  "Europe/Vaduz": "LI",
  "Europe/Gibraltar": "GI",
  // Africa
  "Africa/Cairo": "EG",
  "Africa/Lagos": "NG",
  "Africa/Accra": "GH",
  "Africa/Abidjan": "CI",
  "Africa/Dakar": "SN",
  "Africa/Nairobi": "KE",
  "Africa/Kampala": "UG",
  "Africa/Dar_es_Salaam": "TZ",
  "Africa/Kigali": "RW",
  "Africa/Addis_Ababa": "ET",
  "Africa/Khartoum": "SD",
  "Africa/Juba": "SS",
  "Africa/Johannesburg": "ZA",
  "Africa/Harare": "ZW",
  "Africa/Lusaka": "ZM",
  "Africa/Gaborone": "BW",
  "Africa/Windhoek": "NA",
  "Africa/Maputo": "MZ",
  "Africa/Luanda": "AO",
  "Africa/Kinshasa": "CD",
  "Africa/Lubumbashi": "CD",
  "Africa/Brazzaville": "CG",
  "Africa/Douala": "CM",
  "Africa/Libreville": "GA",
  "Africa/Casablanca": "MA",
  "Africa/Algiers": "DZ",
  "Africa/Tunis": "TN",
  "Africa/Tripoli": "LY",
  "Indian/Mauritius": "MU",
  // Americas
  "America/New_York": "US",
  "America/Detroit": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Phoenix": "US",
  "America/Los_Angeles": "US",
  "America/Anchorage": "US",
  "Pacific/Honolulu": "US",
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "America/Edmonton": "CA",
  "America/Winnipeg": "CA",
  "America/Halifax": "CA",
  "America/St_Johns": "CA",
  "America/Mexico_City": "MX",
  "America/Monterrey": "MX",
  "America/Tijuana": "MX",
  "America/Guatemala": "GT",
  "America/El_Salvador": "SV",
  "America/Tegucigalpa": "HN",
  "America/Managua": "NI",
  "America/Costa_Rica": "CR",
  "America/Panama": "PA",
  "America/Havana": "CU",
  "America/Jamaica": "JM",
  "America/Port-au-Prince": "HT",
  "America/Santo_Domingo": "DO",
  "America/Puerto_Rico": "PR",
  "America/Bogota": "CO",
  "America/Caracas": "VE",
  "America/Guayaquil": "EC",
  "America/Lima": "PE",
  "America/La_Paz": "BO",
  "America/Santiago": "CL",
  "America/Asuncion": "PY",
  "America/Montevideo": "UY",
  "America/Argentina/Buenos_Aires": "AR",
  "America/Sao_Paulo": "BR",
  "America/Bahia": "BR",
  "America/Fortaleza": "BR",
  "America/Manaus": "BR",
  "America/Guyana": "GY",
  "America/Paramaribo": "SR",
  "America/Belize": "BZ",
  "America/Nassau": "BS",
  "America/Barbados": "BB",
  "America/Bermuda": "BM",
  "America/Cayman": "KY",
  "America/Aruba": "AW",
  "America/Godthab": "GL",
  "America/Nuuk": "GL",
  // Oceania
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
  "Australia/Brisbane": "AU",
  "Australia/Perth": "AU",
  "Australia/Adelaide": "AU",
  "Australia/Darwin": "AU",
  "Australia/Hobart": "AU",
  "Pacific/Auckland": "NZ",
  "Pacific/Fiji": "FJ",
  "Pacific/Port_Moresby": "PG",
};

const BY_ISO = new Map(DIAL_CODES.map((c) => [c.iso, c]));

/** The calling code for an ISO country, or `null` if the list has no such country. */
export function dialForCountry(iso: string): string | null {
  return BY_ISO.get(iso.toUpperCase())?.dial ?? null;
}

/** The browser's IANA timezone, or "" where the API is missing or throws. */
function readTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    return "";
  }
}

/**
 * The region of the browser's own locale — "en-IN" gives IN directly, and a
 * language-only "ta" gives IN once maximized. A plain "en" maximizes to US,
 * which is a real guess rather than a good one; it only ever runs when the
 * timezone told us nothing.
 */
function readLocaleRegion(): string {
  try {
    const tag = typeof navigator === "undefined" ? "" : navigator.language;
    if (!tag) return "";
    return new Intl.Locale(tag).maximize().region ?? "";
  } catch {
    return "";
  }
}

/**
 * Best guess at the reader's calling code. Browser-only — on the server there
 * is no timezone to read and this returns `DEFAULT_DIAL`, which is what the
 * field renders with until it mounts.
 */
export function detectDialCode(): string {
  const zone = readTimeZone();
  const fromZone = zone ? TZ_COUNTRY[zone] : undefined;
  if (fromZone) {
    const dial = dialForCountry(fromZone);
    if (dial) return dial;
  }
  const region = readLocaleRegion();
  if (region) {
    const dial = dialForCountry(region);
    if (dial) return dial;
  }
  return DEFAULT_DIAL;
}

/**
 * Split a stored phone value back into a calling code and the rest, for a
 * field that is re-rendered from a value it emitted earlier.
 *
 * Longest match wins. No code in `DIAL_CODES` is currently a prefix of
 * another — every NANP country is filed under a bare "+1", so a Trinidad
 * number keeps its 868 in the national part — but the rule is what keeps that
 * true by construction if one ever is, and `dial-codes.test.ts` fails if the
 * assumption breaks.
 */
export function splitPhone(value: string): { dial: string; national: string } {
  const v = value.trim();
  if (!v.startsWith("+")) return { dial: "", national: v };
  let best = "";
  for (const { dial } of DIAL_CODES) {
    if (v.startsWith(dial) && dial.length > best.length) best = dial;
  }
  if (!best) return { dial: "", national: v };
  return { dial: best, national: v.slice(best.length).trim() };
}
