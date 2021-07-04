export interface Constituency {
  name: string;
  ons_code: string;
  region: string;
}
let region = "London";
const London: Array<Constituency> = [
  {
    name: "Barking",
    ons_code: "E14000540",
    region,
  },
  {
    name: "Battersea",
    ons_code: "E14000549",
    region,
  },
  {
    name: "Beckenham",
    ons_code: "E14000551",
    region,
  },
  {
    name: "Bermondsey and Old Southwark",
    ons_code: "E14000553",
    region,
  },
  {
    name: "Bethnal Green and Bow",
    ons_code: "E14000555",
    region,
  },
  {
    name: "Bexleyheath and Crayford",
    ons_code: "E14000558",
    region,
  },
  {
    name: "Brent Central",
    ons_code: "E14000591",
    region,
  },
  {
    name: "Brent North",
    ons_code: "E14000592",
    region,
  },
  {
    name: "Brentford and Isleworth",
    ons_code: "E14000593",
    region,
  },
  {
    name: "Bromley and Chislehurst",
    ons_code: "E14000604",
    region,
  },
  {
    name: "Camberwell and Peckham",
    ons_code: "E14000615",
    region,
  },
  {
    name: "Carshalton and Wallington",
    ons_code: "E14000621",
    region,
  },
  {
    name: "Chelsea and Fulham",
    ons_code: "E14000629",
    region,
  },
  {
    name: "Chingford and Woodford Green",
    ons_code: "E14000634",
    region,
  },
  {
    name: "Chipping Barnet",
    ons_code: "E14000636",
    region,
  },
  {
    name: "Cities of London and Westminster",
    ons_code: "E14000639",
    region,
  },
  {
    name: "Croydon Central",
    ons_code: "E14000654",
    region,
  },
  {
    name: "Croydon North",
    ons_code: "E14000655",
    region,
  },
  {
    name: "Croydon South",
    ons_code: "E14000656",
    region,
  },
  {
    name: "Dagenham and Rainham",
    ons_code: "E14000657",
    region,
  },
  {
    name: "Dulwich and West Norwood",
    ons_code: "E14000673",
    region,
  },
  {
    name: "Ealing Central and Acton",
    ons_code: "E14000674",
    region,
  },
  {
    name: "Ealing North",
    ons_code: "E14000675",
    region,
  },
  {
    name: "Ealing, Southall",
    ons_code: "E14000676",
    region,
  },
  {
    name: "East Ham",
    ons_code: "E14000679",
    region,
  },
  {
    name: "Edmonton",
    ons_code: "E14000687",
    region,
  },
  {
    name: "Eltham",
    ons_code: "E14000690",
    region,
  },
  {
    name: "Enfield North",
    ons_code: "E14000691",
    region,
  },
  {
    name: "Enfield, Southgate",
    ons_code: "E14000692",
    region,
  },
  {
    name: "Erith and Thamesmead",
    ons_code: "E14000696",
    region,
  },
  {
    name: "Feltham and Heston",
    ons_code: "E14000701",
    region,
  },
  {
    name: "Finchley and Golders Green",
    ons_code: "E14000703",
    region,
  },
  {
    name: "Greenwich and Woolwich",
    ons_code: "E14000718",
    region,
  },
  {
    name: "Hackney North and Stoke Newington",
    ons_code: "E14000720",
    region,
  },
  {
    name: "Hackney South and Shoreditch",
    ons_code: "E14000721",
    region,
  },
  {
    name: "Hammersmith",
    ons_code: "E14000726",
    region,
  },
  {
    name: "Hampstead and Kilburn",
    ons_code: "E14000727",
    region,
  },
  {
    name: "Harrow East",
    ons_code: "E14000731",
    region,
  },
  {
    name: "Harrow West",
    ons_code: "E14000732",
    region,
  },
  {
    name: "Hayes and Harlington",
    ons_code: "E14000737",
    region,
  },
  {
    name: "Hendon",
    ons_code: "E14000741",
    region,
  },
  {
    name: "Holborn and St Pancras",
    ons_code: "E14000750",
    region,
  },
  {
    name: "Hornchurch and Upminster",
    ons_code: "E14000751",
    region,
  },
  {
    name: "Hornsey and Wood Green",
    ons_code: "E14000752",
    region,
  },
  {
    name: "Ilford North",
    ons_code: "E14000759",
    region,
  },
  {
    name: "Ilford South",
    ons_code: "E14000760",
    region,
  },
  {
    name: "Islington North",
    ons_code: "E14000763",
    region,
  },
  {
    name: "Islington South and Finsbury",
    ons_code: "E14000764",
    region,
  },
  {
    name: "Kensington",
    ons_code: "E14000768",
    region,
  },
  {
    name: "Kingston and Surbiton",
    ons_code: "E14000770",
    region,
  },
  {
    name: "Lewisham East",
    ons_code: "E14000787",
    region,
  },
  {
    name: "Lewisham West and Penge",
    ons_code: "E14000788",
    region,
  },
  {
    name: "Lewisham, Deptford",
    ons_code: "E14000789",
    region,
  },
  {
    name: "Leyton and Wanstead",
    ons_code: "E14000790",
    region,
  },
  {
    name: "Mitcham and Morden",
    ons_code: "E14000823",
    region,
  },
  {
    name: "Old Bexley and Sidcup",
    ons_code: "E14000869",
    region,
  },
  {
    name: "Orpington",
    ons_code: "E14000872",
    region,
  },
  {
    name: "Poplar and Limehouse",
    ons_code: "E14000882",
    region,
  },
  {
    name: "Putney",
    ons_code: "E14000887",
    region,
  },
  {
    name: "Richmond Park",
    ons_code: "E14000896",
    region,
  },
  {
    name: "Romford",
    ons_code: "E14000900",
    region,
  },
  {
    name: "Ruislip, Northwood and Pinner",
    ons_code: "E14000906",
    region,
  },
  {
    name: "Streatham",
    ons_code: "E14000978",
    region,
  },
  {
    name: "Sutton and Cheam",
    ons_code: "E14000984",
    region,
  },
  {
    name: "Tooting",
    ons_code: "E14000998",
    region,
  },
  {
    name: "Tottenham",
    ons_code: "E14001002",
    region,
  },
  {
    name: "Twickenham",
    ons_code: "E14001005",
    region,
  },
  {
    name: "Uxbridge and South Ruislip",
    ons_code: "E14001007",
    region,
  },
  {
    name: "Vauxhall",
    ons_code: "E14001008",
    region,
  },
  {
    name: "Walthamstow",
    ons_code: "E14001013",
    region,
  },
  {
    name: "West Ham",
    ons_code: "E14001032",
    region,
  },
  {
    name: "Westminster North",
    ons_code: "E14001036",
    region,
  },
  {
    name: "Wimbledon",
    ons_code: "E14001040",
    region,
  },
];

region = "North West";
const NW: Array<Constituency> = [
  {
    name: "Altrincham and Sale West",
    ons_code: "E14000532",
    region,
  },
  {
    name: "Ashton-under-Lyne",
    ons_code: "E14000537",
    region,
  },
  {
    name: "Barrow and Furness",
    ons_code: "E14000543",
    region,
  },
  {
    name: "Birkenhead",
    ons_code: "E14000559",
    region,
  },
  {
    name: "Blackburn",
    ons_code: "E14000570",
    region,
  },
  {
    name: "Blackley and Broughton",
    ons_code: "E14000571",
    region,
  },
  {
    name: "Blackpool North and Cleveleys",
    ons_code: "E14000572",
    region,
  },
  {
    name: "Blackpool South",
    ons_code: "E14000573",
    region,
  },
  {
    name: "Bolton North East",
    ons_code: "E14000578",
    region,
  },
  {
    name: "Bolton South East",
    ons_code: "E14000579",
    region,
  },
  {
    name: "Bolton West",
    ons_code: "E14000580",
    region,
  },
  {
    name: "Bootle",
    ons_code: "E14000581",
    region,
  },
  {
    name: "Burnley",
    ons_code: "E14000609",
    region,
  },
  {
    name: "Bury North",
    ons_code: "E14000611",
    region,
  },
  {
    name: "Bury South",
    ons_code: "E14000612",
    region,
  },
  {
    name: "Carlisle",
    ons_code: "E14000620",
    region,
  },
  {
    name: "Cheadle",
    ons_code: "E14000627",
    region,
  },
  {
    name: "Chorley",
    ons_code: "E14000637",
    region,
  },
  {
    name: "City of Chester",
    ons_code: "E14000640",
    region,
  },
  {
    name: "Congleton",
    ons_code: "E14000646",
    region,
  },
  {
    name: "Copeland",
    ons_code: "E14000647",
    region,
  },
  {
    name: "Crewe and Nantwich",
    ons_code: "E14000653",
    region,
  },
  {
    name: "Denton and Reddish",
    ons_code: "E14000661",
    region,
  },
  {
    name: "Eddisbury",
    ons_code: "E14000686",
    region,
  },
  {
    name: "Ellesmere Port and Neston",
    ons_code: "E14000688",
    region,
  },
  {
    name: "Fylde",
    ons_code: "E14000706",
    region,
  },
  {
    name: "Garston and Halewood",
    ons_code: "E14000708",
    region,
  },
  {
    name: "Halton",
    ons_code: "E14000725",
    region,
  },
  {
    name: "Hazel Grove",
    ons_code: "E14000738",
    region,
  },
  {
    name: "Heywood and Middleton",
    ons_code: "E14000747",
    region,
  },
  {
    name: "Hyndburn",
    ons_code: "E14000758",
    region,
  },
  {
    name: "Knowsley",
    ons_code: "E14000775",
    region,
  },
  {
    name: "Lancaster and Fleetwood",
    ons_code: "E14000776",
    region,
  },
  {
    name: "Leigh",
    ons_code: "E14000785",
    region,
  },
  {
    name: "Liverpool, Riverside",
    ons_code: "E14000793",
    region,
  },
  {
    name: "Liverpool, Walton",
    ons_code: "E14000794",
    region,
  },
  {
    name: "Liverpool, Wavertree",
    ons_code: "E14000795",
    region,
  },
  {
    name: "Liverpool, West Derby",
    ons_code: "E14000796",
    region,
  },
  {
    name: "Macclesfield",
    ons_code: "E14000802",
    region,
  },
  {
    name: "Makerfield",
    ons_code: "E14000805",
    region,
  },
  {
    name: "Manchester Central",
    ons_code: "E14000807",
    region,
  },
  {
    name: "Manchester, Gorton",
    ons_code: "E14000808",
    region,
  },
  {
    name: "Manchester, Withington",
    ons_code: "E14000809",
    region,
  },
  {
    name: "Morecambe and Lunesdale",
    ons_code: "E14000825",
    region,
  },
  {
    name: "Oldham East and Saddleworth",
    ons_code: "E14000870",
    region,
  },
  {
    name: "Oldham West and Royton",
    ons_code: "E14000871",
    region,
  },
  {
    name: "Pendle",
    ons_code: "E14000875",
    region,
  },
  {
    name: "Penrith and The Border",
    ons_code: "E14000877",
    region,
  },
  {
    name: "Preston",
    ons_code: "E14000885",
    region,
  },
  {
    name: "Ribble Valley",
    ons_code: "E14000894",
    region,
  },
  {
    name: "Rochdale",
    ons_code: "E14000897",
    region,
  },
  {
    name: "Rossendale and Darwen",
    ons_code: "E14000902",
    region,
  },
  {
    name: "Salford and Eccles",
    ons_code: "E14000911",
    region,
  },
  {
    name: "Sefton Central",
    ons_code: "E14000916",
    region,
  },
  {
    name: "South Ribble",
    ons_code: "E14000943",
    region,
  },
  {
    name: "Southport",
    ons_code: "E14000958",
    region,
  },
  {
    name: "St Helens North",
    ons_code: "E14000962",
    region,
  },
  {
    name: "St Helens South and Whiston",
    ons_code: "E14000963",
    region,
  },
  {
    name: "Stalybridge and Hyde",
    ons_code: "E14000967",
    region,
  },
  {
    name: "Stockport",
    ons_code: "E14000969",
    region,
  },
  {
    name: "Stretford and Urmston",
    ons_code: "E14000979",
    region,
  },
  {
    name: "Tatton",
    ons_code: "E14000987",
    region,
  },
  {
    name: "Wallasey",
    ons_code: "E14001010",
    region,
  },
  {
    name: "Warrington North",
    ons_code: "E14001017",
    region,
  },
  {
    name: "Warrington South",
    ons_code: "E14001018",
    region,
  },
  {
    name: "Weaver Vale",
    ons_code: "E14001024",
    region,
  },
  {
    name: "West Lancashire",
    ons_code: "E14001033",
    region,
  },
  {
    name: "Westmorland and Lonsdale",
    ons_code: "E14001037",
    region,
  },
  {
    name: "Wigan",
    ons_code: "E14001039",
    region,
  },
  {
    name: "Wirral South",
    ons_code: "E14001043",
    region,
  },
  {
    name: "Wirral West",
    ons_code: "E14001044",
    region,
  },
  {
    name: "Workington",
    ons_code: "E14001053",
    region,
  },
  {
    name: "Worsley and Eccles South",
    ons_code: "E14001054",
    region,
  },
  {
    name: "Wyre and Preston North",
    ons_code: "E14001057",
    region,
  },
  {
    name: "Wythenshawe and Sale East",
    ons_code: "E14001059",
    region,
  },
];

region = "East Of England";
const E: Array<Constituency> = [
  {
    name: "Basildon and Billericay",
    ons_code: "E14000544",
    region,
  },
  {
    name: "Bedford",
    ons_code: "E14000552",
    region,
  },
  {
    name: "Braintree",
    ons_code: "E14000590",
    region,
  },
  {
    name: "Brentwood and Ongar",
    ons_code: "E14000594",
    region,
  },
  {
    name: "Broadland",
    ons_code: "E14000603",
    region,
  },
  {
    name: "Broxbourne",
    ons_code: "E14000606",
    region,
  },
  {
    name: "Bury St Edmunds",
    ons_code: "E14000613",
    region,
  },
  {
    name: "Cambridge",
    ons_code: "E14000617",
    region,
  },
  {
    name: "Castle Point",
    ons_code: "E14000622",
    region,
  },
  {
    name: "Central Suffolk and North Ipswich",
    ons_code: "E14000624",
    region,
  },
  {
    name: "Chelmsford",
    ons_code: "E14000628",
    region,
  },
  {
    name: "Clacton",
    ons_code: "E14000642",
    region,
  },
  {
    name: "Colchester",
    ons_code: "E14000644",
    region,
  },
  {
    name: "Epping Forest",
    ons_code: "E14000693",
    region,
  },
  {
    name: "Great Yarmouth",
    ons_code: "E14000717",
    region,
  },
  {
    name: "Harlow",
    ons_code: "E14000729",
    region,
  },
  {
    name: "Harwich and North Essex",
    ons_code: "E14000734",
    region,
  },
  {
    name: "Hemel Hempstead",
    ons_code: "E14000739",
    region,
  },
  {
    name: "Hertford and Stortford",
    ons_code: "E14000744",
    region,
  },
  {
    name: "Hertsmere",
    ons_code: "E14000745",
    region,
  },
  {
    name: "Hitchin and Harpenden",
    ons_code: "E14000749",
    region,
  },
  {
    name: "Huntingdon",
    ons_code: "E14000757",
    region,
  },
  {
    name: "Ipswich",
    ons_code: "E14000761",
    region,
  },
  {
    name: "Luton North",
    ons_code: "E14000800",
    region,
  },
  {
    name: "Luton South",
    ons_code: "E14000801",
    region,
  },
  {
    name: "Maldon",
    ons_code: "E14000806",
    region,
  },
  {
    name: "Mid Bedfordshire",
    ons_code: "E14000813",
    region,
  },
  {
    name: "Mid Norfolk",
    ons_code: "E14000816",
    region,
  },
  {
    name: "North East Bedfordshire",
    ons_code: "E14000841",
    region,
  },
  {
    name: "North East Cambridgeshire",
    ons_code: "E14000842",
    region,
  },
  {
    name: "North East Hertfordshire",
    ons_code: "E14000845",
    region,
  },
  {
    name: "North Norfolk",
    ons_code: "E14000848",
    region,
  },
  {
    name: "North West Cambridgeshire",
    ons_code: "E14000855",
    region,
  },
  {
    name: "North West Norfolk",
    ons_code: "E14000859",
    region,
  },
  {
    name: "Norwich North",
    ons_code: "E14000863",
    region,
  },
  {
    name: "Norwich South",
    ons_code: "E14000864",
    region,
  },
  {
    name: "Peterborough",
    ons_code: "E14000878",
    region,
  },
  {
    name: "Rayleigh and Wickford",
    ons_code: "E14000888",
    region,
  },
  {
    name: "Rochford and Southend East",
    ons_code: "E14000899",
    region,
  },
  {
    name: "Saffron Walden",
    ons_code: "E14000910",
    region,
  },
  {
    name: "South Basildon and East Thurrock",
    ons_code: "E14000933",
    region,
  },
  {
    name: "South Cambridgeshire",
    ons_code: "E14000934",
    region,
  },
  {
    name: "South East Cambridgeshire",
    ons_code: "E14000937",
    region,
  },
  {
    name: "South Norfolk",
    ons_code: "E14000941",
    region,
  },
  {
    name: "South Suffolk",
    ons_code: "E14000946",
    region,
  },
  {
    name: "South West Bedfordshire",
    ons_code: "E14000949",
    region,
  },
  {
    name: "South West Hertfordshire",
    ons_code: "E14000951",
    region,
  },
  {
    name: "South West Norfolk",
    ons_code: "E14000952",
    region,
  },
  {
    name: "Southend West",
    ons_code: "E14000957",
    region,
  },
  {
    name: "St Albans",
    ons_code: "E14000960",
    region,
  },
  {
    name: "Stevenage",
    ons_code: "E14000968",
    region,
  },
  {
    name: "Suffolk Coastal",
    ons_code: "E14000981",
    region,
  },
  {
    name: "Thurrock",
    ons_code: "E14000995",
    region,
  },
  {
    name: "Watford",
    ons_code: "E14001021",
    region,
  },
  {
    name: "Waveney",
    ons_code: "E14001022",
    region,
  },
  {
    name: "Welwyn Hatfield",
    ons_code: "E14001027",
    region,
  },
  {
    name: "West Suffolk",
    ons_code: "E14001034",
    region,
  },
  {
    name: "Witham",
    ons_code: "E14001045",
    region,
  },
];

region = "Wales";
const Wales: Array<Constituency> = [
  {
    name: "Aberavon",
    ons_code: "W07000049",
    region,
  },
  {
    name: "Aberconwy",
    ons_code: "W07000058",
    region,
  },
  {
    name: "Alyn and Deeside",
    ons_code: "W07000043",
    region,
  },
  {
    name: "Arfon",
    ons_code: "W07000057",
    region,
  },
  {
    name: "Blaenau Gwent",
    ons_code: "W07000072",
    region,
  },
  {
    name: "Brecon and Radnorshire",
    ons_code: "W07000068",
    region,
  },
  {
    name: "Bridgend",
    ons_code: "W07000073",
    region,
  },
  {
    name: "Caerphilly",
    ons_code: "W07000076",
    region,
  },
  {
    name: "Cardiff Central",
    ons_code: "W07000050",
    region,
  },
  {
    name: "Cardiff North",
    ons_code: "W07000051",
    region,
  },
  {
    name: "Cardiff South and Penarth",
    ons_code: "W07000080",
    region,
  },
  {
    name: "Cardiff West",
    ons_code: "W07000079",
    region,
  },
  {
    name: "Carmarthen East and Dinefwr",
    ons_code: "W07000067",
    region,
  },
  {
    name: "Carmarthen West and South Pembrokeshire",
    ons_code: "W07000066",
    region,
  },
  {
    name: "Ceredigion",
    ons_code: "W07000064",
    region,
  },
  {
    name: "Clwyd South",
    ons_code: "W07000062",
    region,
  },
  {
    name: "Clwyd West",
    ons_code: "W07000059",
    region,
  },
  {
    name: "Cynon Valley",
    ons_code: "W07000070",
    region,
  },
  {
    name: "Delyn",
    ons_code: "W07000042",
    region,
  },
  {
    name: "Dwyfor Meirionnydd",
    ons_code: "W07000061",
    region,
  },
  {
    name: "Gower",
    ons_code: "W07000046",
    region,
  },
  {
    name: "Islwyn",
    ons_code: "W07000077",
    region,
  },
  {
    name: "Llanelli",
    ons_code: "W07000045",
    region,
  },
  {
    name: "Merthyr Tydfil and Rhymney",
    ons_code: "W07000071",
    region,
  },
  {
    name: "Monmouth",
    ons_code: "W07000054",
    region,
  },
  {
    name: "Montgomeryshire",
    ons_code: "W07000063",
    region,
  },
  {
    name: "Neath",
    ons_code: "W07000069",
    region,
  },
  {
    name: "Newport East",
    ons_code: "W07000055",
    region,
  },
  {
    name: "Newport West",
    ons_code: "W07000056",
    region,
  },
  {
    name: "Ogmore",
    ons_code: "W07000074",
    region,
  },
  {
    name: "Pontypridd",
    ons_code: "W07000075",
    region,
  },
  {
    name: "Preseli Pembrokeshire",
    ons_code: "W07000065",
    region,
  },
  {
    name: "Rhondda",
    ons_code: "W07000052",
    region,
  },
  {
    name: "Swansea East",
    ons_code: "W07000048",
    region,
  },
  {
    name: "Swansea West",
    ons_code: "W07000047",
    region,
  },
  {
    name: "Torfaen",
    ons_code: "W07000053",
    region,
  },
  {
    name: "Vale of Clwyd",
    ons_code: "W07000060",
    region,
  },
  {
    name: "Vale of Glamorgan",
    ons_code: "W07000078",
    region,
  },
  {
    name: "Wrexham",
    ons_code: "W07000044",
    region,
  },
  {
    name: "Ynys Môn",
    ons_code: "W07000041",
    region,
  },
];

region = "Scotland";
const Scotland: Array<Constituency> = [
  {
    name: "Aberdeen North",
    ons_code: "S14000001",
    region,
  },
  {
    name: "Aberdeen South",
    ons_code: "S14000002",
    region,
  },
  {
    name: "Airdrie and Shotts",
    ons_code: "S14000003",
    region,
  },
  {
    name: "Angus",
    ons_code: "S14000004",
    region,
  },
  {
    name: "Argyll and Bute",
    ons_code: "S14000005",
    region,
  },
  {
    name: "Ayr, Carrick and Cumnock",
    ons_code: "S14000006",
    region,
  },
  {
    name: "Banff and Buchan",
    ons_code: "S14000007",
    region,
  },
  {
    name: "Berwickshire, Roxburgh and Selkirk",
    ons_code: "S14000008",
    region,
  },
  {
    name: "Caithness, Sutherland and Easter Ross",
    ons_code: "S14000009",
    region,
  },
  {
    name: "Central Ayrshire",
    ons_code: "S14000010",
    region,
  },
  {
    name: "Coatbridge, Chryston and Bellshill",
    ons_code: "S14000011",
    region,
  },
  {
    name: "Cumbernauld, Kilsyth and Kirkintilloch East",
    ons_code: "S14000012",
    region,
  },
  {
    name: "Dumfries and Galloway",
    ons_code: "S14000013",
    region,
  },
  {
    name: "Dumfriesshire, Clydesdale and Tweeddale",
    ons_code: "S14000014",
    region,
  },
  {
    name: "Dundee East",
    ons_code: "S14000015",
    region,
  },
  {
    name: "Dundee West",
    ons_code: "S14000016",
    region,
  },
  {
    name: "Dunfermline and West Fife",
    ons_code: "S14000017",
    region,
  },
  {
    name: "East Dunbartonshire",
    ons_code: "S14000018",
    region,
  },
  {
    name: "East Kilbride, Strathaven and Lesmahagow",
    ons_code: "S14000019",
    region,
  },
  {
    name: "East Lothian",
    ons_code: "S14000020",
    region,
  },
  {
    name: "East Renfrewshire",
    ons_code: "S14000021",
    region,
  },
  {
    name: "Edinburgh East",
    ons_code: "S14000022",
    region,
  },
  {
    name: "Edinburgh North and Leith",
    ons_code: "S14000023",
    region,
  },
  {
    name: "Edinburgh South",
    ons_code: "S14000024",
    region,
  },
  {
    name: "Edinburgh South West",
    ons_code: "S14000025",
    region,
  },
  {
    name: "Edinburgh West",
    ons_code: "S14000026",
    region,
  },
  {
    name: "Falkirk",
    ons_code: "S14000028",
    region,
  },
  {
    name: "Glasgow Central",
    ons_code: "S14000029",
    region,
  },
  {
    name: "Glasgow East",
    ons_code: "S14000030",
    region,
  },
  {
    name: "Glasgow North",
    ons_code: "S14000031",
    region,
  },
  {
    name: "Glasgow North East",
    ons_code: "S14000032",
    region,
  },
  {
    name: "Glasgow North West",
    ons_code: "S14000033",
    region,
  },
  {
    name: "Glasgow South",
    ons_code: "S14000034",
    region,
  },
  {
    name: "Glasgow South West",
    ons_code: "S14000035",
    region,
  },
  {
    name: "Glenrothes",
    ons_code: "S14000036",
    region,
  },
  {
    name: "Gordon",
    ons_code: "S14000037",
    region,
  },
  {
    name: "Inverclyde",
    ons_code: "S14000038",
    region,
  },
  {
    name: "Inverness, Nairn, Badenoch and Strathspey",
    ons_code: "S14000039",
    region,
  },
  {
    name: "Kilmarnock and Loudoun",
    ons_code: "S14000040",
    region,
  },
  {
    name: "Kirkcaldy and Cowdenbeath",
    ons_code: "S14000041",
    region,
  },
  {
    name: "Lanark and Hamilton East",
    ons_code: "S14000042",
    region,
  },
  {
    name: "Linlithgow and East Falkirk",
    ons_code: "S14000043",
    region,
  },
  {
    name: "Livingston",
    ons_code: "S14000044",
    region,
  },
  {
    name: "Midlothian",
    ons_code: "S14000045",
    region,
  },
  {
    name: "Moray",
    ons_code: "S14000046",
    region,
  },
  {
    name: "Motherwell and Wishaw",
    ons_code: "S14000047",
    region,
  },
  {
    name: "Na h-Eileanan an Iar",
    ons_code: "S14000027",
    region,
  },
  {
    name: "North Ayrshire and Arran",
    ons_code: "S14000048",
    region,
  },
  {
    name: "North East Fife",
    ons_code: "S14000049",
    region,
  },
  {
    name: "Ochil and South Perthshire",
    ons_code: "S14000050",
    region,
  },
  {
    name: "Orkney and Shetland",
    ons_code: "S14000051",
    region,
  },
  {
    name: "Paisley and Renfrewshire North",
    ons_code: "S14000052",
    region,
  },
  {
    name: "Paisley and Renfrewshire South",
    ons_code: "S14000053",
    region,
  },
  {
    name: "Perth and North Perthshire",
    ons_code: "S14000054",
    region,
  },
  {
    name: "Ross, Skye and Lochaber",
    ons_code: "S14000055",
    region,
  },
  {
    name: "Rutherglen and Hamilton West",
    ons_code: "S14000056",
    region,
  },
  {
    name: "Stirling",
    ons_code: "S14000057",
    region,
  },
  {
    name: "West Aberdeenshire and Kincardine",
    ons_code: "S14000058",
    region,
  },
  {
    name: "West Dunbartonshire",
    ons_code: "S14000059",
    region,
  },
];

region = "South East";
const SE: Array<Constituency> = [
  {
    name: "Aldershot",
    ons_code: "E14000530",
    region,
  },
  {
    name: "Arundel and South Downs",
    ons_code: "E14000534",
    region,
  },
  {
    name: "Ashford",
    ons_code: "E14000536",
    region,
  },
  {
    name: "Aylesbury",
    ons_code: "E14000538",
    region,
  },
  {
    name: "Banbury",
    ons_code: "E14000539",
    region,
  },
  {
    name: "Basingstoke",
    ons_code: "E14000545",
    region,
  },
  {
    name: "Beaconsfield",
    ons_code: "E14000550",
    region,
  },
  {
    name: "Bexhill and Battle",
    ons_code: "E14000557",
    region,
  },
  {
    name: "Bognor Regis and Littlehampton",
    ons_code: "E14000576",
    region,
  },
  {
    name: "Bracknell",
    ons_code: "E14000586",
    region,
  },
  {
    name: "Brighton, Kemptown",
    ons_code: "E14000597",
    region,
  },
  {
    name: "Brighton, Pavilion",
    ons_code: "E14000598",
    region,
  },
  {
    name: "Buckingham",
    ons_code: "E14000608",
    region,
  },
  {
    name: "Canterbury",
    ons_code: "E14000619",
    region,
  },
  {
    name: "Chatham and Aylesford",
    ons_code: "E14000626",
    region,
  },
  {
    name: "Chesham and Amersham",
    ons_code: "E14000631",
    region,
  },
  {
    name: "Chichester",
    ons_code: "E14000633",
    region,
  },
  {
    name: "Crawley",
    ons_code: "E14000652",
    region,
  },
  {
    name: "Dartford",
    ons_code: "E14000659",
    region,
  },
  {
    name: "Dover",
    ons_code: "E14000670",
    region,
  },
  {
    name: "East Hampshire",
    ons_code: "E14000680",
    region,
  },
  {
    name: "East Surrey",
    ons_code: "E14000681",
    region,
  },
  {
    name: "East Worthing and Shoreham",
    ons_code: "E14000682",
    region,
  },
  {
    name: "Eastbourne",
    ons_code: "E14000684",
    region,
  },
  {
    name: "Eastleigh",
    ons_code: "E14000685",
    region,
  },
  {
    name: "Epsom and Ewell",
    ons_code: "E14000694",
    region,
  },
  {
    name: "Esher and Walton",
    ons_code: "E14000697",
    region,
  },
  {
    name: "Fareham",
    ons_code: "E14000699",
    region,
  },
  {
    name: "Faversham and Mid Kent",
    ons_code: "E14000700",
    region,
  },
  {
    name: "Folkestone and Hythe",
    ons_code: "E14000704",
    region,
  },
  {
    name: "Gillingham and Rainham",
    ons_code: "E14000711",
    region,
  },
  {
    name: "Gosport",
    ons_code: "E14000713",
    region,
  },
  {
    name: "Gravesham",
    ons_code: "E14000715",
    region,
  },
  {
    name: "Guildford",
    ons_code: "E14000719",
    region,
  },
  {
    name: "Hastings and Rye",
    ons_code: "E14000735",
    region,
  },
  {
    name: "Havant",
    ons_code: "E14000736",
    region,
  },
  {
    name: "Henley",
    ons_code: "E14000742",
    region,
  },
  {
    name: "Horsham",
    ons_code: "E14000753",
    region,
  },
  {
    name: "Hove",
    ons_code: "E14000755",
    region,
  },
  {
    name: "Isle of Wight",
    ons_code: "E14000762",
    region,
  },
  {
    name: "Lewes",
    ons_code: "E14000786",
    region,
  },
  {
    name: "Maidenhead",
    ons_code: "E14000803",
    region,
  },
  {
    name: "Maidstone and The Weald",
    ons_code: "E14000804",
    region,
  },
  {
    name: "Meon Valley",
    ons_code: "E14000811",
    region,
  },
  {
    name: "Mid Sussex",
    ons_code: "E14000817",
    region,
  },
  {
    name: "Milton Keynes North",
    ons_code: "E14000821",
    region,
  },
  {
    name: "Milton Keynes South",
    ons_code: "E14000822",
    region,
  },
  {
    name: "Mole Valley",
    ons_code: "E14000824",
    region,
  },
  {
    name: "New Forest East",
    ons_code: "E14000827",
    region,
  },
  {
    name: "New Forest West",
    ons_code: "E14000828",
    region,
  },
  {
    name: "Newbury",
    ons_code: "E14000830",
    region,
  },
  {
    name: "North East Hampshire",
    ons_code: "E14000844",
    region,
  },
  {
    name: "North Thanet",
    ons_code: "E14000852",
    region,
  },
  {
    name: "North West Hampshire",
    ons_code: "E14000857",
    region,
  },
  {
    name: "Oxford East",
    ons_code: "E14000873",
    region,
  },
  {
    name: "Oxford West and Abingdon",
    ons_code: "E14000874",
    region,
  },
  {
    name: "Portsmouth North",
    ons_code: "E14000883",
    region,
  },
  {
    name: "Portsmouth South",
    ons_code: "E14000884",
    region,
  },
  {
    name: "Reading East",
    ons_code: "E14000889",
    region,
  },
  {
    name: "Reading West",
    ons_code: "E14000890",
    region,
  },
  {
    name: "Reigate",
    ons_code: "E14000893",
    region,
  },
  {
    name: "Rochester and Strood",
    ons_code: "E14000898",
    region,
  },
  {
    name: "Romsey and Southampton North",
    ons_code: "E14000901",
    region,
  },
  {
    name: "Runnymede and Weybridge",
    ons_code: "E14000907",
    region,
  },
  {
    name: "Sevenoaks",
    ons_code: "E14000918",
    region,
  },
  {
    name: "Sittingbourne and Sheppey",
    ons_code: "E14000927",
    region,
  },
  {
    name: "Slough",
    ons_code: "E14000930",
    region,
  },
  {
    name: "South Thanet",
    ons_code: "E14000948",
    region,
  },
  {
    name: "South West Surrey",
    ons_code: "E14000953",
    region,
  },
  {
    name: "Southampton, Itchen",
    ons_code: "E14000955",
    region,
  },
  {
    name: "Southampton, Test",
    ons_code: "E14000956",
    region,
  },
  {
    name: "Spelthorne",
    ons_code: "E14000959",
    region,
  },
  {
    name: "Surrey Heath",
    ons_code: "E14000983",
    region,
  },
  {
    name: "Tonbridge and Malling",
    ons_code: "E14000997",
    region,
  },
  {
    name: "Tunbridge Wells",
    ons_code: "E14001004",
    region,
  },
  {
    name: "Wantage",
    ons_code: "E14001015",
    region,
  },
  {
    name: "Wealden",
    ons_code: "E14001023",
    region,
  },
  {
    name: "Winchester",
    ons_code: "E14001041",
    region,
  },
  {
    name: "Windsor",
    ons_code: "E14001042",
    region,
  },
  {
    name: "Witney",
    ons_code: "E14001046",
    region,
  },
  {
    name: "Woking",
    ons_code: "E14001047",
    region,
  },
  {
    name: "Wokingham",
    ons_code: "E14001048",
    region,
  },
  {
    name: "Worthing West",
    ons_code: "E14001055",
    region,
  },
  {
    name: "Wycombe",
    ons_code: "E14001056",
    region,
  },
];

region = "West Midlands";
const WestMidlands: Array<Constituency> = [
  {
    name: "Aldridge-Brownhills",
    ons_code: "E14000531",
    region,
  },
  {
    name: "Birmingham, Edgbaston",
    ons_code: "E14000560",
    region,
  },
  {
    name: "Birmingham, Erdington",
    ons_code: "E14000561",
    region,
  },
  {
    name: "Birmingham, Hall Green",
    ons_code: "E14000562",
    region,
  },
  {
    name: "Birmingham, Hodge Hill",
    ons_code: "E14000563",
    region,
  },
  {
    name: "Birmingham, Ladywood",
    ons_code: "E14000564",
    region,
  },
  {
    name: "Birmingham, Northfield",
    ons_code: "E14000565",
    region,
  },
  {
    name: "Birmingham, Perry Barr",
    ons_code: "E14000566",
    region,
  },
  {
    name: "Birmingham, Selly Oak",
    ons_code: "E14000567",
    region,
  },
  {
    name: "Birmingham, Yardley",
    ons_code: "E14000568",
    region,
  },
  {
    name: "Bromsgrove",
    ons_code: "E14000605",
    region,
  },
  {
    name: "Burton",
    ons_code: "E14000610",
    region,
  },
  {
    name: "Cannock Chase",
    ons_code: "E14000618",
    region,
  },
  {
    name: "Coventry North East",
    ons_code: "E14000649",
    region,
  },
  {
    name: "Coventry North West",
    ons_code: "E14000650",
    region,
  },
  {
    name: "Coventry South",
    ons_code: "E14000651",
    region,
  },
  {
    name: "Dudley North",
    ons_code: "E14000671",
    region,
  },
  {
    name: "Dudley South",
    ons_code: "E14000672",
    region,
  },
  {
    name: "Halesowen and Rowley Regis",
    ons_code: "E14000722",
    region,
  },
  {
    name: "Hereford and South Herefordshire",
    ons_code: "E14000743",
    region,
  },
  {
    name: "Kenilworth and Southam",
    ons_code: "E14000767",
    region,
  },
  {
    name: "Lichfield",
    ons_code: "E14000791",
    region,
  },
  {
    name: "Ludlow",
    ons_code: "E14000799",
    region,
  },
  {
    name: "Meriden",
    ons_code: "E14000812",
    region,
  },
  {
    name: "Mid Worcestershire",
    ons_code: "E14000818",
    region,
  },
  {
    name: "Newcastle-under-Lyme",
    ons_code: "E14000834",
    region,
  },
  {
    name: "North Herefordshire",
    ons_code: "E14000847",
    region,
  },
  {
    name: "North Shropshire",
    ons_code: "E14000849",
    region,
  },
  {
    name: "North Warwickshire",
    ons_code: "E14000854",
    region,
  },
  {
    name: "Nuneaton",
    ons_code: "E14000868",
    region,
  },
  {
    name: "Redditch",
    ons_code: "E14000892",
    region,
  },
  {
    name: "Rugby",
    ons_code: "E14000905",
    region,
  },
  {
    name: "Shrewsbury and Atcham",
    ons_code: "E14000926",
    region,
  },
  {
    name: "Solihull",
    ons_code: "E14000931",
    region,
  },
  {
    name: "South Staffordshire",
    ons_code: "E14000945",
    region,
  },
  {
    name: "Stafford",
    ons_code: "E14000965",
    region,
  },
  {
    name: "Staffordshire Moorlands",
    ons_code: "E14000966",
    region,
  },
  {
    name: "Stoke-on-Trent Central",
    ons_code: "E14000972",
    region,
  },
  {
    name: "Stoke-on-Trent North",
    ons_code: "E14000973",
    region,
  },
  {
    name: "Stoke-on-Trent South",
    ons_code: "E14000974",
    region,
  },
  {
    name: "Stone",
    ons_code: "E14000975",
    region,
  },
  {
    name: "Stourbridge",
    ons_code: "E14000976",
    region,
  },
  {
    name: "Stratford-on-Avon",
    ons_code: "E14000977",
    region,
  },
  {
    name: "Sutton Coldfield",
    ons_code: "E14000985",
    region,
  },
  {
    name: "Tamworth",
    ons_code: "E14000986",
    region,
  },
  {
    name: "Telford",
    ons_code: "E14000989",
    region,
  },
  {
    name: "The Wrekin",
    ons_code: "E14000992",
    region,
  },
  {
    name: "Walsall North",
    ons_code: "E14001011",
    region,
  },
  {
    name: "Walsall South",
    ons_code: "E14001012",
    region,
  },
  {
    name: "Warley",
    ons_code: "E14001016",
    region,
  },
  {
    name: "Warwick and Leamington",
    ons_code: "E14001019",
    region,
  },
  {
    name: "West Bromwich East",
    ons_code: "E14001029",
    region,
  },
  {
    name: "West Bromwich West",
    ons_code: "E14001030",
    region,
  },
  {
    name: "West Worcestershire",
    ons_code: "E14001035",
    region,
  },
  {
    name: "Wolverhampton North East",
    ons_code: "E14001049",
    region,
  },
  {
    name: "Wolverhampton South East",
    ons_code: "E14001050",
    region,
  },
  {
    name: "Wolverhampton South West",
    ons_code: "E14001051",
    region,
  },
  {
    name: "Worcester",
    ons_code: "E14001052",
    region,
  },
  {
    name: "Wyre Forest",
    ons_code: "E14001058",
    region,
  },
];

region = "East Midlands";
const EastMidlands: Array<Constituency> = [
  {
    name: "Amber Valley",
    ons_code: "E14000533",
    region,
  },
  {
    name: "Ashfield",
    ons_code: "E14000535",
    region,
  },
  {
    name: "Bassetlaw",
    ons_code: "E14000546",
    region,
  },
  {
    name: "Bolsover",
    ons_code: "E14000577",
    region,
  },
  {
    name: "Boston and Skegness",
    ons_code: "E14000582",
    region,
  },
  {
    name: "Bosworth",
    ons_code: "E14000583",
    region,
  },
  {
    name: "Broxtowe",
    ons_code: "E14000607",
    region,
  },
  {
    name: "Charnwood",
    ons_code: "E14000625",
    region,
  },
  {
    name: "Chesterfield",
    ons_code: "E14000632",
    region,
  },
  {
    name: "Corby",
    ons_code: "E14000648",
    region,
  },
  {
    name: "Daventry",
    ons_code: "E14000660",
    region,
  },
  {
    name: "Derby North",
    ons_code: "E14000662",
    region,
  },
  {
    name: "Derby South",
    ons_code: "E14000663",
    region,
  },
  {
    name: "Derbyshire Dales",
    ons_code: "E14000664",
    region,
  },
  {
    name: "Erewash",
    ons_code: "E14000695",
    region,
  },
  {
    name: "Gainsborough",
    ons_code: "E14000707",
    region,
  },
  {
    name: "Gedling",
    ons_code: "E14000710",
    region,
  },
  {
    name: "Grantham and Stamford",
    ons_code: "E14000714",
    region,
  },
  {
    name: "Harborough",
    ons_code: "E14000728",
    region,
  },
  {
    name: "High Peak",
    ons_code: "E14000748",
    region,
  },
  {
    name: "Kettering",
    ons_code: "E14000769",
    region,
  },
  {
    name: "Leicester East",
    ons_code: "E14000782",
    region,
  },
  {
    name: "Leicester South",
    ons_code: "E14000783",
    region,
  },
  {
    name: "Leicester West",
    ons_code: "E14000784",
    region,
  },
  {
    name: "Lincoln",
    ons_code: "E14000792",
    region,
  },
  {
    name: "Loughborough",
    ons_code: "E14000797",
    region,
  },
  {
    name: "Louth and Horncastle",
    ons_code: "E14000798",
    region,
  },
  {
    name: "Mansfield",
    ons_code: "E14000810",
    region,
  },
  {
    name: "Mid Derbyshire",
    ons_code: "E14000814",
    region,
  },
  {
    name: "Newark",
    ons_code: "E14000829",
    region,
  },
  {
    name: "North East Derbyshire",
    ons_code: "E14000843",
    region,
  },
  {
    name: "North West Leicestershire",
    ons_code: "E14000858",
    region,
  },
  {
    name: "Northampton North",
    ons_code: "E14000861",
    region,
  },
  {
    name: "Northampton South",
    ons_code: "E14000862",
    region,
  },
  {
    name: "Nottingham East",
    ons_code: "E14000865",
    region,
  },
  {
    name: "Nottingham North",
    ons_code: "E14000866",
    region,
  },
  {
    name: "Nottingham South",
    ons_code: "E14000867",
    region,
  },
  {
    name: "Rushcliffe",
    ons_code: "E14000908",
    region,
  },
  {
    name: "Rutland and Melton",
    ons_code: "E14000909",
    region,
  },
  {
    name: "Sherwood",
    ons_code: "E14000924",
    region,
  },
  {
    name: "Sleaford and North Hykeham",
    ons_code: "E14000929",
    region,
  },
  {
    name: "South Derbyshire",
    ons_code: "E14000935",
    region,
  },
  {
    name: "South Holland and The Deepings",
    ons_code: "E14000939",
    region,
  },
  {
    name: "South Leicestershire",
    ons_code: "E14000940",
    region,
  },
  {
    name: "South Northamptonshire",
    ons_code: "E14000942",
    region,
  },
  {
    name: "Wellingborough",
    ons_code: "E14001025",
    region,
  },
];

region = "Yorkshire & the Humber";
const Yorkshire: Array<Constituency> = [
  {
    name: "Barnsley Central",
    ons_code: "E14000541",
    region,
  },
  {
    name: "Barnsley East",
    ons_code: "E14000542",
    region,
  },
  {
    name: "Batley and Spen",
    ons_code: "E14000548",
    region,
  },
  {
    name: "Beverley and Holderness",
    ons_code: "E14000556",
    region,
  },
  {
    name: "Bradford East",
    ons_code: "E14000587",
    region,
  },
  {
    name: "Bradford South",
    ons_code: "E14000588",
    region,
  },
  {
    name: "Bradford West",
    ons_code: "E14000589",
    region,
  },
  {
    name: "Brigg and Goole",
    ons_code: "E14000596",
    region,
  },
  {
    name: "Calder Valley",
    ons_code: "E14000614",
    region,
  },
  {
    name: "Cleethorpes",
    ons_code: "E14000643",
    region,
  },
  {
    name: "Colne Valley",
    ons_code: "E14000645",
    region,
  },
  {
    name: "Dewsbury",
    ons_code: "E14000666",
    region,
  },
  {
    name: "Don Valley",
    ons_code: "E14000667",
    region,
  },
  {
    name: "Doncaster Central",
    ons_code: "E14000668",
    region,
  },
  {
    name: "Doncaster North",
    ons_code: "E14000669",
    region,
  },
  {
    name: "East Yorkshire",
    ons_code: "E14000683",
    region,
  },
  {
    name: "Elmet and Rothwell",
    ons_code: "E14000689",
    region,
  },
  {
    name: "Great Grimsby",
    ons_code: "E14000716",
    region,
  },
  {
    name: "Halifax",
    ons_code: "E14000723",
    region,
  },
  {
    name: "Haltemprice and Howden",
    ons_code: "E14000724",
    region,
  },
  {
    name: "Harrogate and Knaresborough",
    ons_code: "E14000730",
    region,
  },
  {
    name: "Hemsworth",
    ons_code: "E14000740",
    region,
  },
  {
    name: "Huddersfield",
    ons_code: "E14000756",
    region,
  },
  {
    name: "Keighley",
    ons_code: "E14000766",
    region,
  },
  {
    name: "Kingston upon Hull East",
    ons_code: "E14000771",
    region,
  },
  {
    name: "Kingston upon Hull North",
    ons_code: "E14000772",
    region,
  },
  {
    name: "Kingston upon Hull West and Hessle",
    ons_code: "E14000773",
    region,
  },
  {
    name: "Leeds Central",
    ons_code: "E14000777",
    region,
  },
  {
    name: "Leeds East",
    ons_code: "E14000778",
    region,
  },
  {
    name: "Leeds North East",
    ons_code: "E14000779",
    region,
  },
  {
    name: "Leeds North West",
    ons_code: "E14000780",
    region,
  },
  {
    name: "Leeds West",
    ons_code: "E14000781",
    region,
  },
  {
    name: "Morley and Outwood",
    ons_code: "E14000826",
    region,
  },
  {
    name: "Normanton, Pontefract and Castleford",
    ons_code: "E14000836",
    region,
  },
  {
    name: "Penistone and Stocksbridge",
    ons_code: "E14000876",
    region,
  },
  {
    name: "Pudsey",
    ons_code: "E14000886",
    region,
  },
  {
    name: "Richmond (Yorks)",
    ons_code: "E14000895",
    region,
  },
  {
    name: "Rother Valley",
    ons_code: "E14000903",
    region,
  },
  {
    name: "Rotherham",
    ons_code: "E14000904",
    region,
  },
  {
    name: "Scarborough and Whitby",
    ons_code: "E14000913",
    region,
  },
  {
    name: "Scunthorpe",
    ons_code: "E14000914",
    region,
  },
  {
    name: "Selby and Ainsty",
    ons_code: "E14000917",
    region,
  },
  {
    name: "Sheffield Central",
    ons_code: "E14000919",
    region,
  },
  {
    name: "Sheffield South East",
    ons_code: "E14000920",
    region,
  },
  {
    name: "Sheffield, Brightside and Hillsborough",
    ons_code: "E14000921",
    region,
  },
  {
    name: "Sheffield, Hallam",
    ons_code: "E14000922",
    region,
  },
  {
    name: "Sheffield, Heeley",
    ons_code: "E14000923",
    region,
  },
  {
    name: "Shipley",
    ons_code: "E14000925",
    region,
  },
  {
    name: "Skipton and Ripon",
    ons_code: "E14000928",
    region,
  },
  {
    name: "Thirsk and Malton",
    ons_code: "E14000993",
    region,
  },
  {
    name: "Wakefield",
    ons_code: "E14001009",
    region,
  },
  {
    name: "Wentworth and Dearne",
    ons_code: "E14001028",
    region,
  },
  {
    name: "York Central",
    ons_code: "E14001061",
    region,
  },
  {
    name: "York Outer",
    ons_code: "E14001062",
    region,
  },
];

region = "South West";
const SW: Array<Constituency> = [
  {
    name: "Bath",
    ons_code: "E14000547",
    region,
  },
  {
    name: "Bournemouth East",
    ons_code: "E14000584",
    region,
  },
  {
    name: "Bournemouth West",
    ons_code: "E14000585",
    region,
  },
  {
    name: "Bridgwater and West Somerset",
    ons_code: "E14000595",
    region,
  },
  {
    name: "Bristol East",
    ons_code: "E14000599",
    region,
  },
  {
    name: "Bristol North West",
    ons_code: "E14000600",
    region,
  },
  {
    name: "Bristol South",
    ons_code: "E14000601",
    region,
  },
  {
    name: "Bristol West",
    ons_code: "E14000602",
    region,
  },
  {
    name: "Camborne and Redruth",
    ons_code: "E14000616",
    region,
  },
  {
    name: "Central Devon",
    ons_code: "E14000623",
    region,
  },
  {
    name: "Cheltenham",
    ons_code: "E14000630",
    region,
  },
  {
    name: "Chippenham",
    ons_code: "E14000635",
    region,
  },
  {
    name: "Christchurch",
    ons_code: "E14000638",
    region,
  },
  {
    name: "Devizes",
    ons_code: "E14000665",
    region,
  },
  {
    name: "East Devon",
    ons_code: "E14000678",
    region,
  },
  {
    name: "Exeter",
    ons_code: "E14000698",
    region,
  },
  {
    name: "Filton and Bradley Stoke",
    ons_code: "E14000702",
    region,
  },
  {
    name: "Forest of Dean",
    ons_code: "E14000705",
    region,
  },
  {
    name: "Gloucester",
    ons_code: "E14000712",
    region,
  },
  {
    name: "Kingswood",
    ons_code: "E14000774",
    region,
  },
  {
    name: "Mid Dorset and North Poole",
    ons_code: "E14000815",
    region,
  },
  {
    name: "Newton Abbot",
    ons_code: "E14000835",
    region,
  },
  {
    name: "North Cornwall",
    ons_code: "E14000837",
    region,
  },
  {
    name: "North Devon",
    ons_code: "E14000838",
    region,
  },
  {
    name: "North Dorset",
    ons_code: "E14000839",
    region,
  },
  {
    name: "North East Somerset",
    ons_code: "E14000846",
    region,
  },
  {
    name: "North Somerset",
    ons_code: "E14000850",
    region,
  },
  {
    name: "North Swindon",
    ons_code: "E14000851",
    region,
  },
  {
    name: "North Wiltshire",
    ons_code: "E14000860",
    region,
  },
  {
    name: "Plymouth, Moor View",
    ons_code: "E14000879",
    region,
  },
  {
    name: "Plymouth, Sutton and Devonport",
    ons_code: "E14000880",
    region,
  },
  {
    name: "Poole",
    ons_code: "E14000881",
    region,
  },
  {
    name: "Salisbury",
    ons_code: "E14000912",
    region,
  },
  {
    name: "Somerton and Frome",
    ons_code: "E14000932",
    region,
  },
  {
    name: "South Dorset",
    ons_code: "E14000936",
    region,
  },
  {
    name: "South East Cornwall",
    ons_code: "E14000938",
    region,
  },
  {
    name: "South Swindon",
    ons_code: "E14000947",
    region,
  },
  {
    name: "South West Devon",
    ons_code: "E14000950",
    region,
  },
  {
    name: "South West Wiltshire",
    ons_code: "E14000954",
    region,
  },
  {
    name: "St Austell and Newquay",
    ons_code: "E14000961",
    region,
  },
  {
    name: "St Ives",
    ons_code: "E14000964",
    region,
  },
  {
    name: "Stroud",
    ons_code: "E14000980",
    region,
  },
  {
    name: "Taunton Deane",
    ons_code: "E14000988",
    region,
  },
  {
    name: "Tewkesbury",
    ons_code: "E14000990",
    region,
  },
  {
    name: "The Cotswolds",
    ons_code: "E14000991",
    region,
  },
  {
    name: "Thornbury and Yate",
    ons_code: "E14000994",
    region,
  },
  {
    name: "Tiverton and Honiton",
    ons_code: "E14000996",
    region,
  },
  {
    name: "Torbay",
    ons_code: "E14000999",
    region,
  },
  {
    name: "Torridge and West Devon",
    ons_code: "E14001000",
    region,
  },
  {
    name: "Totnes",
    ons_code: "E14001001",
    region,
  },
  {
    name: "Truro and Falmouth",
    ons_code: "E14001003",
    region,
  },
  {
    name: "Wells",
    ons_code: "E14001026",
    region,
  },
  {
    name: "West Dorset",
    ons_code: "E14001031",
    region,
  },
  {
    name: "Weston-super-Mare",
    ons_code: "E14001038",
    region,
  },
  {
    name: "Yeovil",
    ons_code: "E14001060",
    region,
  },
];

region = "Northern Ireland";
const NI: Array<Constituency> = [
  {
    name: "Belfast East",
    ons_code: "N06000001",
    region,
  },
  {
    name: "Belfast North",
    ons_code: "N06000002",
    region,
  },
  {
    name: "Belfast South",
    ons_code: "N06000003",
    region,
  },
  {
    name: "Belfast West",
    ons_code: "N06000004",
    region,
  },
  {
    name: "East Antrim",
    ons_code: "N06000005",
    region,
  },
  {
    name: "East Londonderry",
    ons_code: "N06000006",
    region,
  },
  {
    name: "Fermanagh and South Tyrone",
    ons_code: "N06000007",
    region,
  },
  {
    name: "Foyle",
    ons_code: "N06000008",
    region,
  },
  {
    name: "Lagan Valley",
    ons_code: "N06000009",
    region,
  },
  {
    name: "Mid Ulster",
    ons_code: "N06000010",
    region,
  },
  {
    name: "Newry and Armagh",
    ons_code: "N06000011",
    region,
  },
  {
    name: "North Antrim",
    ons_code: "N06000012",
    region,
  },
  {
    name: "North Down",
    ons_code: "N06000013",
    region,
  },
  {
    name: "South Antrim",
    ons_code: "N06000014",
    region,
  },
  {
    name: "South Down",
    ons_code: "N06000015",
    region,
  },
  {
    name: "Strangford",
    ons_code: "N06000016",
    region,
  },
  {
    name: "Upper Bann",
    ons_code: "N06000017",
    region,
  },
  {
    name: "West Tyrone",
    ons_code: "N06000018",
    region,
  },
];

region = "North East";
const NE: Array<Constituency> = [
  {
    name: "Berwick-upon-Tweed",
    ons_code: "E14000554",
    region,
  },
  {
    name: "Bishop Auckland",
    ons_code: "E14000569",
    region,
  },
  {
    name: "Blaydon",
    ons_code: "E14000574",
    region,
  },
  {
    name: "Blyth Valley",
    ons_code: "E14000575",
    region,
  },
  {
    name: "City of Durham",
    ons_code: "E14000641",
    region,
  },
  {
    name: "Darlington",
    ons_code: "E14000658",
    region,
  },
  {
    name: "Easington",
    ons_code: "E14000677",
    region,
  },
  {
    name: "Gateshead",
    ons_code: "E14000709",
    region,
  },
  {
    name: "Hartlepool",
    ons_code: "E14000733",
    region,
  },
  {
    name: "Hexham",
    ons_code: "E14000746",
    region,
  },
  {
    name: "Houghton and Sunderland South",
    ons_code: "E14000754",
    region,
  },
  {
    name: "Jarrow",
    ons_code: "E14000765",
    region,
  },
  {
    name: "Middlesbrough",
    ons_code: "E14000819",
    region,
  },
  {
    name: "Middlesbrough South and East Cleveland",
    ons_code: "E14000820",
    region,
  },
  {
    name: "Newcastle upon Tyne Central",
    ons_code: "E14000831",
    region,
  },
  {
    name: "Newcastle upon Tyne East",
    ons_code: "E14000832",
    region,
  },
  {
    name: "Newcastle upon Tyne North",
    ons_code: "E14000833",
    region,
  },
  {
    name: "North Durham",
    ons_code: "E14000840",
    region,
  },
  {
    name: "North Tyneside",
    ons_code: "E14000853",
    region,
  },
  {
    name: "North West Durham",
    ons_code: "E14000856",
    region,
  },
  {
    name: "Redcar",
    ons_code: "E14000891",
    region,
  },
  {
    name: "Sedgefield",
    ons_code: "E14000915",
    region,
  },
  {
    name: "South Shields",
    ons_code: "E14000944",
    region,
  },
  {
    name: "Stockton North",
    ons_code: "E14000970",
    region,
  },
  {
    name: "Stockton South",
    ons_code: "E14000971",
    region,
  },
  {
    name: "Sunderland Central",
    ons_code: "E14000982",
    region,
  },
  {
    name: "Tynemouth",
    ons_code: "E14001006",
    region,
  },
  {
    name: "Wansbeck",
    ons_code: "E14001014",
    region,
  },
  {
    name: "Washington and Sunderland West",
    ons_code: "E14001020",
    region,
  },
];

const constituencies: Array<Constituency> = London.concat(
  NW,
  E,
  Wales,
  Scotland,
  SE,
  WestMidlands,
  EastMidlands,
  Yorkshire,
  SW,
  NI,
  NE
);
constituencies.sort((constituencyA, constituencyB) =>
  constituencyA.name > constituencyB.name ? 1 : -1
);

export {
  London,
  NW,
  E,
  Wales,
  Scotland,
  SE,
  WestMidlands,
  EastMidlands,
  Yorkshire,
  SW,
  NI,
  NE,
  constituencies,
};

export const regions = [
  London[0].region,
  NW[0].region,
  E[0].region,
  Wales[0].region,
  Scotland[0].region,
  SE[0].region,
  WestMidlands[0].region,
  EastMidlands[0].region,
  Yorkshire[0].region,
  SW[0].region,
  NI[0].region,
  NE[0].region,
];
