"use strict";

(() => {
  const byId = (id) => document.getElementById(id);

    const screenIds = [
    "home-screen",
    "difficulty-screen",
    "club-screen",
    "briefing-screen",
    "careers-screen"
  ];

  const difficultyNames = {
    rookie: "Rookie",
    professional: "Professional",
    veteran: "Veteran",
    legendary: "Legendary"
  };

  const previewClubs = [
    {
      id: "sunderland",
      name: "Sunderland",
      initials: "SAFC",
      country: "England",
      league: "Championship",
      colour: "#d33349",
      introduction:
        "A proud footballing past and a fresh chapter to write. " +
        "Can you bring top-flight football back to Wearside, " +
        "then build a team worthy of its history?",
      honours: [
        [6, "English league titles", "Last won: 1936"],
        [2, "FA Cups", "Last won: 1973"],
        [1, "Charity Shield", "Won: 1936"]
      ]
    },
    {
      id: "ipswich",
      name: "Ipswich Town",
      initials: "ITFC",
      country: "England",
      league: "Championship",
      colour: "#3269c0",
      introduction:
        "From European glory to a new Championship chapter. " +
        "Build on a rich history and guide the Tractor Boys " +
        "towards a return to the top flight.",
      honours: [
        [1, "English league title", "Won: 1962"],
        [1, "FA Cup", "Won: 1978"],
        [1, "UEFA Cup", "Won: 1981"]
      ]
    },
    {
      id: "leicester",
      name: "Leicester City",
      initials: "LCFC",
      country: "England",
      league: "Championship",
      colour: "#2453b8",
      introduction:
        "The fairytale champions face a fresh challenge " +
        "in the Championship. Can you lead their recovery " +
        "and write the next remarkable chapter?",
      honours: [
        [1, "Premier League title", "Won: 2016"],
        [1, "FA Cup", "Won: 2021"],
        [3, "League Cups", "Last won: 2000"]
      ]
    }
  ];

  // Historical FM24 club-guide Rating values, not player ratings or media predictions.
  // Source: https://sortitoutsi.net/football-manager-2024/database
  const startingClubRatings = Object.freeze(Object.fromEntries(
    Object.entries({
      5: "2000082632 93030438",
      11: "23403819",
      23: "129132",
      31: "4300046",
      37: "78041593",
      38: "74009641",
      40: "23318717",
      41: "74010190",
      42: "74000850 74036914 351038",
      43: "34053971 115942 23501368 352718 351050 350443 350954 74010199",
      44: "1931 355549 1942 1944 130939 74000966",
      45: "2000015950 129129 23501362 2000288034 23500747 130170 130171 350939 352119 354575 1928 351079",
      46: "7642394 5623377 23501094 130167 350949 74057168 350942 1936 74009639 74001453 74032559 74010202 36518155",
      47: "40012017 23501281 23501076 414230 1280 130172 416240 2537 4300229 350239",
      48: "135356 130032 130159 52004979 130173 7800917 93050950 4300678 93018994 4303997 2608 1106011 8104684 610653 1927 1937 1301340",
      49: "5623165 40038846 47001127 23501271 23501090 23500764 414171 414179 116303 2158 1105064 2579 2558 611596 2639 2621 1938",
      50: "23461802 5512155 40035631 5512183 40030275 5623127 135371 414175 116334 23136391 2580 4300731 2634 1101812 93030437 2609 2625 1301344 637 1932 351064",
      51: "647 23387230 23501058 23501071 1900709 4203036 2514 1827 68001174 1829 93063381 611417 93019001 1800 2566 2598 2645 68017422 2557",
      52: "5638118 7400961 40026598 2000278767 47085621 23501107 1272 130162 416241 130031 1784 4300728 93056640 1805 802270 4300353 93056988 6410420 4300771 68002003 2159 616339 8100363 2506 4300754 2593 2176 358409",
      53: "7481153 409 2000082636 523 611 657 5103927 133677 2000027899 5622735 5622859 135528 485706 8403700 130176 52098789 5626771 1810 2151 1836 2643 93053134 1804 2161 93154509 2627 4300358 619816 2678 71050719 74032523 114804 1943 36500003",
      54: "7500399 1035522 2104 27155310 534 27147895 5103640 90018556 5103719 8325039 5622732 2000004192 5622744 41010810 41021342 5622866 2000115816 23486440 130174 416239 1275 130175 5201742 7800516 1102540 1841 6410294 4300655 1103728 1101151 4300018 1801 68020055 619060 619064 1840 485831 74032529 36512955 36500008",
      55: "17026902 7500394 22033716 2000078112 2000082648 27017889 541 2139 2141 27128372 928485 5103697 90060453 5103900 5103663 712 716 5103671 733 112031 5100145 133669 2000003588 2000004194 5622745 7747141 5623382 41061715 135362 1101511 1273 83301114 4100013 589 1300918 57031764 1558 1562 5395665 68002700 1818 4300744 8113017 2603 2150 2658 1102772 4302207 70043025 71033268",
      56: "485662 130881 2000125448 7483392 2000255116 23318347 23492352 552 5100019 5100088 635 90018558 8325012 715 608 134732 629 5100123 5103643 5100186 5100225 5100139 129191 129170 129208 133676 7400959 135512 135491 135534 2000183212 135521 135500 41003984 7746334 107352 792316 788856 786525 135359 23396078 5623370 1288 1432 55001075 2454 84107097 2493 725038 725060 83163969 734119 1300920 587 1300916 2000082862 1540 5201527 1554 1600 1000037 1609 63010727 814632 93097541 8104219 1823 4300347 1103878 93030439 2165 130367",
      57: "1300134 485682 485671 34039002 23366052 930105 933945 512 615 5100031 29066004 29130446 82070144 30019954 30015287 5100132 8325049 727 514129 510222 7400958 39002395 2000185211 41001022 107330 775154 775160 107354 135382 135368 1274 116331 52065322 2455 83111318 84107152 83202832 2473 590 5100326 52086656 5201786 1598 63000888 1613 2000183268 63000895 7563786 67000108 618372 93058662 93143640 2518 2175 2172 4300693 70080983 71016304 1888 2000190107 2000032127 36500015 36500001 36510163",
      58: "1300111 17037713 17033577 485667 1300119 224 206 130856 7500915 7506018 930248 539 507 5100217 5100015 30021186 5100078 5100210 813 129185 129659 7841979 7840005 41060486 135494 2000273329 107346 788847 788933 107342 135351 135377 1276 801870 1479 734125 2427 8878352 2450 84108481 57065617 57061123 1599 1548 1564 1588 1601 2000260278 65028800 65033935 814071 4212278 814898 67259056 814840 6410547 620906 1833 93052720 68017475 68012711 70080976 71100093 484458 36500009",
      59: "485674 17041311 202 204 18104893 2000181440 19273578 22040114 1300197 138447 23340823 943835 508 562 5100192 5100163 36006475 7840110 1300640 39001207 7840114 1079 135497 7741454 135515 7861698 7860423 1094 7862560 788910 766164 1339 755792 1412 53000245 1399 2435 7000097 729707 733870 2401 109042 2423 7000008 55012090 729461 84107162 2479 741496 2478 7542454 57057268 63000893 1301169 63011669 138174 5680075 67040945 109009 7446432 67129170 67129155 93052555 2168 2668 2170 1868 71046355 71100095 71026832 5316335 2000032124 71091269",
      60: "17000059 17040498 188 282 539814 22067423 1300201 353 7500389 130781 2000183928 480 8601358 643 5100157 90002300 669 743 822 687626 678102 7840141 3400446 135531 116145 5622862 5622746 42106427 7868750 42102908 1088 792248 776288 786400 107339 483870 106696 1414 2428 55027091 2413 84107058 55056925 2437 2446 55038928 1300922 57053599 57110301 57048549 1583 1590 23501219 1624 63011666 62126751 65034030 65039591 65045804 814437 814059 4212156 102029 1503465 7443983 4203018 1503308 4212400 67224671 67034790 2000111526 71017165 71100478 36510164",
      61: "17004083 8160007 6600094 19220160 22019542 20502997 20502986 2000238561 661680 136197 136153 136281 136237 136208 25001307 520 925050 502 573 601 109212 5103760 655 703 714 707 129179 514046 129658 676958 36018144 7521266 38004848 7521273 1072 39048732 7742801 116144 5622879 5622747 2000185227 7862785 42006473 7862872 7861702 783801 107341 1277 1279 1281 1328 1294 1416 1291 1298 1316 53000361 1403 1409 2720 725011 1486 55001072 2466 2471 2447 7000476 2444 598 593 52085341 57151105 57066631 57131211 57055056 1519 1539 5410640 5777059 138169 64000667 5688086 2000197676 65025773 65028789 65025781 2000034500 65045816 2000127078 4212901 7442930 1667 4212275 1503260 6703397 67016709 4212118 67173955 67090031 2000282424 67291347 814968 1697 6706364 93055260 1825 8103641 1788 1808 1863 70080498 70081535 1867 450550 70078650 130351 71076802 1940 36500002",
      62: "5602973 1300113 5410568 7485067 1300125 254 2000181439 536364 536240 19270038 116384 20502989 2000078066 131162 23463130 5652987 116156 478 493 5100153 29106539 661 30010181 739 744 33007394 677885 36000499 1300565 23405909 1049 38019804 1063 1300641 7840140 1073 5622736 41021352 2000090667 41051597 1300665 7864760 107328 788854 107289 107305 775187 786372 106694 1278 1351 1355 1374 1387 1397 759312 1318 1332 5000207 77029556 1446 1300879 714240 7000003 55001110 2484 2463 83314396 109037 1495 592 57080206 57141891 57000777 1551 1563 136464 7560016 63032360 7580828 7581081 7580709 7582048 5410639 1638 1641 5682979 66010583 7452056 109011 1767 4212313 4212292 4212151 4212102 67181500 2097 7446368 814662 2000034640 2000034652 1676 67000113 67276809 4200483 1792 1807 1843 2180 459181 70078180 8478376 454194 70081334 70061794 70002930 70081029 70061827 130868",
      63: "5604963 5601448 16036182 130875 130879 130877 2000022413 2000173149 2000181444 292 19363420 22034856 20502988 20502985 20502987 130784 23199255 412 416 131229 24021028 430 650441 24059190 24014012 126423 136158 516 27035536 930210 2121 542 640 581 731 605 694 521643 817 521105 1300376 129168 881 2000020418 2000188795 129699 129704 129657 133674 7521304 7521258 7521283 38037178 1071 1074 41053239 1082 1413262 780521 775165 786558 786384 107301 788904 485686 8404703 2000193551 136013 51045865 1282 1284 1330 109106 750633 130127 2410 55000307 2405 1484 2407 4102502 597 57153289 2000105301 1502 1522 58148228 130510 5203872 1541 1542 1572 5743879 131125 128656 1627 5410637 1636 65028128 65010405 66039783 136423 66002956 66032900 4200564 67040821 4200575 1740 4212243 4212419 2000112559 4212395 67118675 109023 4212372 814350 1786 1791 1798 1842 1101813 1831 137897 137912 70081336 457419 453682 71098591 8825225 1915",
      64: "137958 5609646 16077360 527945 2000173150 2000173154 169 2000181438 319141 301284 22003932 7500388 352 354 20503663 5250437 130779 131135 23487243 34039025 2200063 661027 1300245 24059986 130859 5645563 109210 5100047 687 723 725 1300378 818 976 38013493 7524224 1056 38017639 1070 7861687 1102 1130 7983711 2217 832138 700206 831366 1187 107303 786547 775166 51008744 51052402 51047275 5666338 5661013 1022 1283 1295 1392 1301 1344 717313 1451 714221 717332 2000040208 2460 2456 2393 2440 2420 588 599 57000252 57161868 1301102 58046584 130515 1557 1571 1591 136468 5740640 5742993 5774738 62085128 62063172 120783 1615 7563783 63025380 65039207 66010556 67060765 2092 814086 67083655 1752 2094 4200572 1750 67041048 1776 67156323 2000034642 1684 1503411 4212115 4202262 1699 67173952 2677 619076 70080997 130340 70054564 1301254 71075348 5512789 5512556 130852 5512787 36500004",
      65: "426430 15086549 130837 137947 16123919 6002479 307 485665 216 900678 301208 301306 107240 7501927 22087833 130797 75035851 130796 5250433 130785 130789 5260969 76045729 2000273045 5261737 442 126302 631 636 641 646 658 729 634 811 510307 2068 855 1991 874 2085 978 36043527 1059 4300030 1078 116140 42074476 1300671 1142 43156731 831197 1153 43124315 1162 1413274 700059 1104 2185 43152205 2212 43007150 2216 7983747 43269673 43079093 107314 786559 107283 2000017421 51039162 1005 1042 1430 1336 1300612 77002090 54003060 714200 129585 2384 2404 2394 55056835 58148224 130550 130511 58066512 1577 1586 5743000 136460 5766280 5754056 130873 7560050 65010424 2000067907 65036389 66029603 5710867 106812 6706369 67105977 67243415 109027 4212284 109005 1723 1665 67148466 4212111 67152828 1811 1844 70054558 70078171 70061796 70054576 130355 70078177 1881 70042997 2000053380",
      66: "8457492 1300491 15086550 5605072 101154 303 199 107205 107230 301323 319160 341 351 356 104363 130788 406 23447397 414 5261738 309353 76003535 1300309 465 5640780 504 521 4001706 5103834 607 616 109206 656 816 857 843 827 2075 2083 876844 979 975 1054 130823 1069 1076 42027989 7860421 1089 1096 1091 1145 43006436 108985 2219 2231 1131 108986 700060 7983734 43204872 43210768 7100042 51008732 51051210 1043 1289 103283 1396 800118 5290571 96012813 129580 96000060 129565 710017 129567 55000308 591 596 58145316 1530 130501 130561 5742987 5748006 5744631 5745180 1951 63035357 130872 1620 5410642 7581525 62176216 2000044276 131270 65039568 2000038055 130775 200373 66034891 1743 1746 814935 1689 4203033 814590 4212406 67290895 67174187 67070379 67089705 67180027 2153 1839 1848 1101431 137917 130820 1862 130354 70028001 71016825 71105155 5512782 78014931 5512780 130848 115039",
      67: "952724 130220 123001 15004168 16309710 160 159 298 18008817 233 248 107203 7506471 22033833 138156 5250445 5250442 23292170 116403 130804 130803 312 309348 658353 1300307 5647950 467 524 481 624 651 689 710 5110769 681 151027 693 5103842 839 860 838 955 121201 121183 879516 959 935 2249 943 957 879643 129661 38042162 1068 1066 1101637 1083 1087 1090 700198 2218 1144 2191 43018336 43065074 788837 47024031 47053664 102356 106028 1002 1017 994 1044 1380 1312 308104 77017082 129577 1454 715911 715912 1458 2387 1477 55000306 2391 2395 1596 1592 1301374 1954 120779 128652 2000034502 66006663 66011708 106813 2093 4203006 4212228 1666 67016725 1751 1716 2157 1817 1857 5720002 454840 453567 455675 70061824 1884 71099430 71045065 1923 1924",
      68: "3101508 3101514 1300489 1300490 15035999 106363 228 539089 301304 107210 328 2106553 120921 5260325 309346 76019314 76033284 5261740 130801 662735 106749 470 472 926867 626 674 675 698 702 720 741 85052735 876 2072 873 2009 904 933 121196 958 1300567 130821 38004842 7521327 1080 1095 2229 1157 1158 2222 43036943 2193 1138 2224 1194 23195015 1000 1001 1003 1033 1326 1404 763464 5290626 5290560 77016717 710052 1462 1300881 1474 2406 736258 2386 2416 1500 7540447 57170797 57152989 57086204 57113687 130496 58126754 130498 1555 1581 1593 1597 1556 62030404 1950 6400020 62031842 62159794 64000753 1632 1630 130772 65035889 1646 5705626 106818 5707530 109017 1695 1675 810130 1739 1796 2588 2164 1809 514173 1874 70016859 1873 130346 130380 70061804 484460 1917 1918 78027478 5512779 1925",
      69: "3101504 102482 14046675 102486 3101502 3101520 15051934 137962 16324690 278 8157175 299 121265 107216 332 318860 19398655 301302 311086 334 22070174 349 130795 120924 5250434 400 130780 104359 130787 120936 104386 24013516 129859 447 468 475 483 620 719 737 742 3501956 2048 888 949 8714658 6000005 6000006 36077318 129665 129666 129667 36136195 1052 1062 1060 1064 1154 1116 1120 2220 1108 707654 1191 107309 1188 5661084 1011 1032 986 1007 1024 1047 1341 1365 53021327 1410 1426 303816 1452 1469 1300885 710032 1468 2388 1493 2433 2424 2422 57143011 57065222 57151160 1515 58145944 130525 1580 1584 1643 130774 5709008 106817 106809 1668 4212307 1690 1704 1803 1806 1852 130304 1876 70042969 70108557 70095984 71063212 2000028043 71100094 1301293 2000152066 116309 5512337 5512559",
      70: "102476 14004603 952734 958199 3101457 102472 108574 14031205 14008993 108531 14037231 102487 3102137 137959 16034828 184 194 301102 325 107236 331 130778 104362 130798 120064 130802 130800 76034968 440 463 136156 473 533 551 697 606 613 628 695 696 699 400362 831 852 840 2062 867 2090 50034825 937 911 694366 682130 38013478 38032696 2195 43058693 1181 2188 107313 1186 1189 1192 107285 1184 1196 850022 1004 1015 1037 1039 308107 5290593 5290629 714209 717327 2000263090 1476 2000104441 57110237 1301106 130509 1536 1575 1301372 5747642 1957 1614 1623 1637 1629 1639 1645 130777 6706354 7452072 4212168 2096 1797 1802 137904 70055738 130338 71100066 1902 1904 2000153732 72000789 5512793 8825223 1926",
      71: "14064697 102490 108514 102470 3101435 956891 108546 102466 3100019 108510 108517 952707 86 102957 16057026 137973 231 232 257 289 107208 320 19144990 301344 130782 5250019 404 130790 421 308516 5261741 420 1300301 131289 545 930621 2142 704 614 645 877 2237 121200 2233 121208 129692 980 1105 1113 2205 1164 829172 2227 1185 1193 1190 107296 1012 1036 1046 1376 1422 77005796 1449 129583 1459 2403 2448 57171586 1513 57111101 58137861 1523 58127493 1533 1573 106808 4212207 4212197 1727 1705 1737 1780 1855 1856 105898 130360 1875 20041327 1903 1913 20030048 20046403 72000160 980543 1910 72023746 4400014 1919 1920 130849",
      72: "952695 14018428 102493 152 154 155 263 280 288 102555 301151 104749 327 338 22069955 403 309345 429 425 423 569 609 664 701 709 875 824 851 828 1971 2253 928 945 121198 1085 1097 1124 1147 1183 1195 5661074 1258 136007 136014 1014 1378 117754 5290566 303815 1450 1455 1456 2000030636 1480 2390 2389 2438 1485 7540205 1301104 58145347 1622 1644 130776 810090 4212294 1783 1787 1851 1200101 1854 458718 1865 130342 130362 1878 130382 72047296 72053036 2000032491 108893 1905 72000112 1907 72049313 1909 72041885 72014193 72019000 72014006",
      73: "80 102462 87 102491 92 3101516 3100018 102467 3101453 262 258 250 107201 104776 340 22003969 399 8830831 417 427 426 477 482 496 526 619 625 686 700 721 724 927 931 2245 899 946 969 1093 1110 1119 2215 1173 106844 107280 1198 106027 51051219 2000017276 1260 1025 1353 722115 1471 2443 2397 1481 2383 1952 1709 4200566 4203003 1678 1728 1849 1858 1853 130341 130344 130366 130289 975489 1921 1922",
      74: "78 102474 108526 88 102485 91 95 102489 98 156 168 318915 419 441 474 476 932443 612 639 732 1992 856 2005 844 108997 880295 921 2247 920 1055 1123 1125 2194 1156 1167 1179 1255 116204 106029 136021 1009 1010 1293 729500 1494 1520 58029064 1525 1955 1660 1741 1744 1850 450573 1864 458631 1885",
      75: "81 89 90 96 186 321 104750 317 339 432 433 677 665 685 691 722 734 2061 859 846 2047 872 886 905 947 983 982 1126 2199 1254 1259 102355 1518 1529 1753 1707 1717 1747 1749 1680 1816 1847 130343 1895",
      76: "82 85 93 158 256 107206 315 319 324 335 708 667 916 948 967 1114 2201 1141 1253 104360 991 1569 1570 1688 1661 1714 1725 1879 72052048",
      77: "94 316 326 329 337 505 858 865 884 2238 912 918 981 1132 1166 1174 1178 1013 1301108 1682 1772 1775",
      78: "314 322 323 622 740 671 673 713 871 862 908 944 879226 960 121182 961 1149 3800256 1257 992 1028 1488 1710 1726 1685 1729 1866",
      79: "600 642 650 654 692 866 826 1111 1664 1724 814089 1871",
      80: "617 735 1129 1478 1489 1733 1759 1870",
      81: "603 618 901 91013388 1106 1100 1487 1742 1777",
      82: "907 1139 1140 1099",
      83: "630 680 688 728 1150 1687",
      84: "868 1135",
      85: "676 915 1708",
      86: "602 1736",
      87: "679",
    }).flatMap(([score, ids]) => ids.split(" ").map(id => [id, Number(score)]))
  ));

  const clubs = [];
  let clubPoolReady = false;
  let clubPoolError = "";
  const appSourceUrl = document.currentScript?.src || window.location.href;

  function installClubDatabase(database) {
    if (
      !database || database.game !== "Football Manager 2024" ||
      !Array.isArray(database.clubs) || database.clubs.length < 1000 ||
      database.countryCount !== 55 ||
      !database.clubs.every(club => (
        club && typeof club.fmId === "string" && /^\d+$/.test(club.fmId) &&
        ["name", "leagueId", "league", "leagueCountry"].every(field => (
          typeof club[field] === "string" && club[field].trim().length > 0
        )) &&
        Number.isInteger(club.leagueGroupSize) &&
        club.leagueGroupSize >= 2 && club.leagueGroupSize <= 60 &&
        typeof club.requiresEligibilityCheck === "boolean"
      )) ||
      new Set(database.clubs.map(club => club.fmId)).size !== database.clubs.length
    ) {
      throw new Error("The full FM24 club list is missing or incomplete.");
    }

    const legacyIds = { "722": "sunderland", "667": "ipswich", "673": "leicester" };
    const colours = ["#3269c0", "#297e82", "#755ac0", "#b84459", "#367fa9"];
    const available = database.clubs.filter(club => !club.requiresEligibilityCheck);
    if (new Set(available.map(club => club.leagueCountry)).size !== 55) {
      throw new Error("The FM24 club list does not cover every expected country.");
    }

    const nextClubs = available.map(source => {
      const preview = previewClubs.find(club => club.id === legacyIds[source.fmId]);
      const words = source.name.replace(/[^\p{L}\p{N} ]/gu, "").trim().split(/\s+/);
      const initials = (words.length > 1
        ? words.map(word => Array.from(word)[0]).slice(0, 4).join("")
        : Array.from(words[0] || "FM").slice(0, 3).join("")).toUpperCase();
      return {
        id: preview?.id || `fm24-${source.fmId}`,
        fmId: source.fmId,
        name: preview?.name || source.name,
        initials: preview?.initials || initials,
        country: source.leagueCountry,
        league: preview?.league || source.league,
        leagueId: source.leagueId,
        leagueSize: source.leagueGroupSize,
        guideRating: startingClubRatings[source.fmId] ?? null,
        guideSource: database.leagues.find(league => league.id === source.leagueId)?.source || database.source,
        // Decorative colours for placeholder badges, not official club colours.
        colour: preview?.colour || colours[Number(source.fmId) % colours.length],
        introduction: preview?.introduction ||
          `Your next career starts with ${source.name} in ${source.league}. ` +
          "Keep this club or roll again to find your next challenge.",
        honours: preview?.honours || []
      };
    });

    clubs.splice(0, clubs.length, ...nextClubs);
    clubPoolReady = true;
    clubPoolError = "";
    byId("club-result").querySelector(".preview-note").textContent =
      `${clubs.length.toLocaleString("en-GB")} club options · 55 league countries · placeholder badges`;
    byId("club-result").querySelector(".hero-note").textContent =
      "Unlimited rerolls. Each draw is independent, so clubs can repeat.";
  }

  function initialiseClubPool() {
    function ready() {
      try {
        installClubDatabase(window.FM24_CLUB_DATABASE);
        loadSavedCareers();
        byId("my-careers-button").disabled = false;
      } catch (error) {
        clubPoolError = "The club list could not be loaded. Refresh the page or check that clubs.js was saved.";
        byId("careers-status").textContent = clubPoolError;
      }
      updateDifficultySelection();
    }

    byId("my-careers-button").disabled = true;
    if (window.FM24_CLUB_DATABASE) {
      ready();
      return;
    }

    // Also supports the previous index.html while the user updates the page.
    updateDifficultySelection();
    const script = document.createElement("script");
    script.src = new URL("clubs.js?v=1", appSourceUrl).href;
    script.onload = ready;
    script.onerror = () => {
      clubPoolError = "The club list could not be loaded. Refresh the page or check that clubs.js was saved.";
      updateDifficultySelection();
    };
    document.head.append(script);
  }

  function hasClubBriefing() {
    return Boolean(selectedClub && Object.hasOwn(starterLineups, selectedClub.id));
  }

  function renderBriefingAvailability() {
    let notice = byId("club-data-notice");
    if (!notice) {
      notice = document.createElement("section");
      notice.id = "club-data-notice";
      notice.className = "signing-form";
      notice.setAttribute("aria-labelledby", "club-data-notice-title");
      byId("briefing-screen").insertBefore(
        notice, byId("briefing-screen").querySelector(".briefing-tabs")
      );
    }
    const squadAvailable = hasClubBriefing();
    notice.hidden = squadAvailable;
    byId("briefing-screen").querySelector(".briefing-tabs").hidden = false;
    ["tactics", "squad"].forEach(tab => {
      byId(`${tab}-tab-button`).hidden = !squadAvailable;
      byId(`${tab}-tab-button`).disabled = !squadAvailable;
    });
    byId("briefing-screen").querySelector(".preview-note").hidden = !squadAvailable;
    if (!squadAvailable) {
      const heading = textElement("h3", "", "Your challenge is ready");
      heading.id = "club-data-notice-title";
      notice.replaceChildren(
        heading,
        textElement("p", "", `${selectedClub.name} · ${selectedClub.league}`),
        textElement("p", "", "Open Transfer Policies and Season Challenge, then save this career to keep its rules fixed. Future seasons unlock after you record your results."),
        textElement("p", "signing-note", "This club’s squad, player ratings and tactics still need its FM24 player data.")
      );
    }
  }

  // Partial demonstration squads. Ratings are provisional.
  const starterLineups = {
    sunderland: [
      ["Nazariy Rusyn", "Rusyn", 6.8],
      ["Jack Clarke", "Clarke", 8.1],
      ["Alex Pritchard", "Pritchard", 7.3],
      ["Patrick Roberts", "Roberts", 7.7],
      ["Dan Neil", "Neil", 7.4],
      ["Pierre Ekwah", "Ekwah", 7.1],
      ["Dennis Cirkin", "Cirkin", 7.4],
      ["Luke O’Nien", "O’Nien", 7.0],
      ["Dan Ballard", "Ballard", 7.6],
      ["Trai Hume", "Hume", 7.5],
      ["Anthony Patterson", "Patterson", 7.6]
    ],
    ipswich: [
      ["George Hirst", "Hirst", 7.2],
      ["Nathan Broadhead", "Broadhead", 7.5],
      ["Conor Chaplin", "Chaplin", 7.8],
      ["Wes Burns", "Burns", 7.4],
      ["Massimo Luongo", "Luongo", 7.2],
      ["Sam Morsy", "Morsy", 7.7],
      ["Leif Davis", "Davis", 7.8],
      ["Cameron Burgess", "Burgess", 7.1],
      ["Luke Woolfenden", "Woolfenden", 7.3],
      ["Harry Clarke", "Clarke", 7.0],
      ["Václav Hladký", "Hladký", 7.1]
    ],
    leicester: [
      ["Jamie Vardy", "Vardy", 8.0],
      ["Stephy Mavididi", "Mavididi", 7.8],
      ["Kiernan Dewsbury-Hall", "Dewsbury-Hall", 8.4],
      ["Abdul Fatawu", "Fatawu", 7.5],
      ["Harry Winks", "Winks", 8.0],
      ["Wilfred Ndidi", "Ndidi", 8.2],
      ["James Justin", "Justin", 7.8],
      ["Jannik Vestergaard", "Vestergaard", 7.6],
      ["Wout Faes", "Faes", 7.9],
      ["Ricardo Pereira", "Pereira", 8.2],
      ["Mads Hermansen", "Hermansen", 7.8]
    ]
  };

  const tacticalPositions = [
    ["ST (C)", "Striker", "Advanced Forward", "Attack", "forwards"],
    ["AM (L)", "Attacking midfielder", "Winger", "Attack", "forwards"],
    ["AM (C)", "Attacking midfielder", "Attacking Midfielder", "Support", "midfielders"],
    ["AM (R)", "Attacking midfielder", "Inverted Winger", "Support", "forwards"],
    ["DM (L)", "Defensive midfielder", "Deep-Lying Playmaker", "Support", "midfielders"],
    ["DM (R)", "Defensive midfielder", "Defensive Midfielder", "Defend", "midfielders"],
    ["D (L)", "Defender", "Full-Back", "Support", "defenders"],
    ["D (CL)", "Defender", "Central Defender", "Defend", "defenders"],
    ["D (CR)", "Defender", "Central Defender", "Defend", "defenders"],
    ["D (R)", "Defender", "Wing-Back", "Support", "defenders"],
    ["GK", "Goalkeeper", "Sweeper Keeper", "Defend", "goalkeepers"]
  ];

  const formationRows = [
    [0],
    [1, 2, 3],
    [4, 5],
    [6, 7, 8, 9],
    [10]
  ];

  const positionGroups = [
    ["goalkeepers", "Goalkeepers"],
    ["defenders", "Defenders"],
    ["midfielders", "Midfielders"],
    ["forwards", "Forwards"]
  ];

  const squads = new Map();

  let selectedDifficulty = null;
  let selectedClub = null;
  let revealTimer = null;
  let revealVersion = 0;
  let isRevealing = false;
  let nextPlayerId = 1;
  let activeTab = "tactics";
  let lastRemoval = null;

  function textElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }

  function showScreen(id) {
    screenIds.forEach((screenId) => {
      byId(screenId).hidden = screenId !== id;
    });

    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function announce(message) {
    byId("briefing-status").textContent = message;
  }

  function updateDifficultySelection() {
    const input = document.querySelector(
      'input[name="difficulty"]:checked'
    );

    selectedDifficulty = input ? input.value : null;
    byId("generate-button").disabled = selectedDifficulty === null || !clubPoolReady;

    byId("difficulty-status").textContent = clubPoolError || (!clubPoolReady
      ? "Loading the FM24 club list…"
      : selectedDifficulty
        ? `${difficultyNames[selectedDifficulty]} selected. Ready to draw from ${clubs.length.toLocaleString("en-GB")} clubs.`
        : "Select a difficulty to continue.");
  }

  function randomIndex(length) {
    if (!Number.isInteger(length) || length < 1) {
      throw new Error("The club pool must contain at least one club.");
    }

    const range = 4294967296;
    const limit = Math.floor(range / length) * length;
    const value = new Uint32Array(1);

    do {
      window.crypto.getRandomValues(value);
    } while (value[0] >= limit);

    return value[0] % length;
  }

  function cancelReveal() {
    revealVersion += 1;
    window.clearTimeout(revealTimer);
    revealTimer = null;
    isRevealing = false;
    byId("club-screen").removeAttribute("aria-busy");
  }

  function renderClub(club) {
    byId("club-title").textContent = club.name;
    byId("club-initials").textContent = club.initials;
    byId("club-country").textContent = club.country;
    byId("club-league").textContent = club.league;
    byId("club-difficulty").textContent =
      difficultyNames[selectedDifficulty];
    byId("club-introduction").textContent = club.introduction;

    byId("club-crest").style.setProperty("--club-colour", club.colour);
    byId("club-crest").setAttribute(
      "aria-label",
      `${club.name} placeholder badge`
    );

    byId("club-honours").replaceChildren();

    byId("club-honours").closest(".club-honours").hidden = !club.honours.length;
    byId("club-country").title = "League country";
    const arrow = textElement("span", "", "→");
    arrow.setAttribute("aria-hidden", "true");
    byId("view-challenge-button").replaceChildren(
      document.createTextNode("View My Challenge "),
      arrow
    );

    club.honours.forEach(([count, name, year]) => {
      const card = document.createElement("div");
      card.className = "honour-card";

      card.append(
        textElement("strong", "honour-count", count),
        textElement("span", "honour-name", name),
        textElement("span", "honour-year", year)
      );

      byId("club-honours").append(card);
    });
  }

  function startClubDraw() {
    if (selectedDifficulty === null || isRevealing || !clubPoolReady) {
      return;
    }

    // One flat pool: each club has the same chance on every independent draw.
    const eligible = clubs;

    if (!eligible.length) {
      byId("club-status").textContent =
        "The FM24 club list is unavailable. Refresh the page and try again.";
      return;
    }

       if (!prepareNewDraft()) {
      return;
    }

    const nextClub = eligible[randomIndex(eligible.length)];
    cancelReveal();
    isRevealing = true;

    const thisReveal = revealVersion;
    const startedAt = performance.now();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const duration = reducedMotion ? 0 : 2800;

    showScreen("club-screen");
    byId("club-screen").setAttribute("aria-busy", "true");
    byId("club-result").hidden = true;
    byId("club-shuffle").hidden = false;
    byId("club-status").textContent = "";
    byId("back-setup-button").focus({ preventScroll: true });

    function tick() {
      if (thisReveal !== revealVersion) {
        return;
      }

      const elapsed = performance.now() - startedAt;

      if (elapsed >= duration) {
        selectedClub = nextClub;
        renderClub(nextClub);

        byId("club-shuffle").hidden = true;
        byId("club-result").hidden = false;
        byId("club-screen").removeAttribute("aria-busy");

        isRevealing = false;
        revealTimer = null;
        byId("club-title").focus({ preventScroll: true });
        return;
      }

      byId("shuffle-name").textContent =
        clubs[randomIndex(clubs.length)].name;

      const delay = 80 + Math.pow(elapsed / duration, 3) * 320;
      revealTimer = window.setTimeout(tick, delay);
    }

    tick();
  }

  function getSquad() {
    if (!squads.has(selectedClub.id)) {
      const players = (starterLineups[selectedClub.id] || []).map(
        ([name, shortName, rating], index) => ({
          id: nextPlayerId++,
          name,
          shortName,
          rating,
          age: null,
          positions: tacticalPositions[index][0],
          group: tacticalPositions[index][4]
        })
      );

      squads.set(selectedClub.id, {
        players,
        startingIds: players.length
          ? players.map((player) => player.id)
          : tacticalPositions.map(() => nextPlayerId++)
      });
    }

    return squads.get(selectedClub.id);
  }

  function getLineup() {
    const squad = getSquad();

    return tacticalPositions.map((assignment, index) => {
      const player = squad.players.find(
        (candidate) => candidate.id === squad.startingIds[index]
      );

      return {
        name: player ? player.name : "Vacant position",
        shortName: player ? player.shortName : "Vacant",
        rating: player ? player.rating : null,
        vacant: !player,
        pitchPosition: assignment[0],
        position: assignment[1],
        role: assignment[2],
        duty: assignment[3]
      };
    });
  }

  function clearPlayerDetails() {
    byId("selected-player-name").textContent = "Select a player";
    byId("selected-player-position").textContent = "";
    byId("selected-player-rating").hidden = true;
    byId("selected-player-rating-caption").hidden = true;
    byId("selected-player-facts").hidden = true;
  }

  function showPlayerDetails(index, shouldAnnounce = true) {
    const player = getLineup()[index];

    if (!player || player.vacant) {
      return;
    }

    byId("selected-player-name").textContent = player.name;
    byId("selected-player-position").textContent = player.position;
    byId("selected-player-rating-value").textContent =
      player.rating.toFixed(1);
    byId("selected-player-rating-caption").textContent =
      "League-relative quality · provisional demonstration rating";
    byId("selected-player-pitch-position").textContent =
      player.pitchPosition;
    byId("selected-player-role").textContent = player.role;
    byId("selected-player-duty").textContent = player.duty;

    byId("selected-player-rating").hidden = false;
    byId("selected-player-rating-caption").hidden = false;
    byId("selected-player-facts").hidden = false;

    byId("tactics-players")
      .querySelectorAll(".tactics-player")
      .forEach((button) => {
        button.setAttribute(
          "aria-pressed",
          String(Number(button.dataset.playerIndex) === index)
        );
      });

    if (shouldAnnounce) {
      announce(
        `${player.name}, ${player.role}, ${player.duty}. ` +
        `Provisional rating: ${player.rating.toFixed(1)} out of 10.`
      );
    }
  }

  function renderTactics() {
    const lineup = getLineup();
    const container = byId("tactics-players");
    container.replaceChildren();

    byId("formation-title").textContent = "4-2-3-1";
    byId("tactics-pitch").style.setProperty(
      "--club-colour",
      selectedClub.colour
    );
    byId("tactics-pitch").setAttribute(
      "aria-label",
      `${selectedClub.name} demonstration 4-2-3-1 lineup`
    );

    formationRows.forEach((indexes) => {
      const row = document.createElement("div");
      row.className = "tactics-row";
      row.dataset.count = indexes.length;
      row.style.setProperty("--players", indexes.length);

      indexes.forEach((index) => {
        const player = lineup[index];
        const button = document.createElement("button");

        button.type = "button";
        button.className = "tactics-player";
        button.dataset.playerIndex = index;
        button.disabled = player.vacant;
        button.setAttribute("aria-pressed", "false");
        button.setAttribute(
          "aria-label",
          `${player.name}, ${player.pitchPosition}, ` +
          `${player.role}, ${player.duty}`
        );

        if (player.pitchPosition === "GK") {
          button.classList.add("is-goalkeeper");
        }

        const shirt = textElement(
          "span",
          "player-shirt",
          player.pitchPosition === "GK" ? "GK" : ""
        );
        shirt.setAttribute("aria-hidden", "true");

        button.append(
          shirt,
          textElement("span", "player-pitch-name", player.shortName),
          textElement("span", "player-pitch-role", player.role),
          textElement("span", "player-pitch-duty", player.duty)
        );

        button.addEventListener("click", () => showPlayerDetails(index));
        row.append(button);
      });

      container.append(row);
    });

    clearPlayerDetails();

    const firstAvailable = lineup.findIndex((player) => !player.vacant);
    const preferred = !lineup[4].vacant ? 4 : firstAvailable;

    if (preferred >= 0) {
      showPlayerDetails(preferred, false);
    }
  }

  function updateUndoNotice() {
    const relevant = lastRemoval &&
      lastRemoval.clubId === selectedClub.id;

    byId("squad-undo").hidden = !relevant;

    if (relevant) {
      byId("squad-undo-message").textContent =
        `${lastRemoval.player.name} removed from your squad.`;
    }
  }

  function removePlayer(playerId) {
    const squad = getSquad();
    const index = squad.players.findIndex(
      (player) => player.id === playerId
    );

    if (index < 0) {
      return;
    }

    const player = squad.players[index];

    lastRemoval = {
      clubId: selectedClub.id,
      player,
      index
    };

    squad.players.splice(index, 1);

    renderSquad();
    renderTactics();

    announce(`${player.name} removed. Use Undo to restore them.`);
    byId("undo-remove-button").focus({ preventScroll: true });
  }

  function renderSquad() {
    const squad = getSquad();
    const container = byId("squad-groups");
    const sort = byId("squad-sort").value;

    container.replaceChildren();
    byId("squad-player-count").textContent = squad.players.length;

    positionGroups.forEach(([groupId, groupName]) => {
      const members = squad.players.filter(
        (player) => player.group === groupId
      );

      if (sort === "rating") {
        members.sort(
          (a, b) => b.rating - a.rating || a.name.localeCompare(b.name)
        );
      } else if (sort === "name") {
        members.sort((a, b) => a.name.localeCompare(b.name));
      }

      const section = document.createElement("section");
      section.className = "squad-group";

      const heading = document.createElement("div");
      heading.className = "squad-group-heading";
      heading.append(
        textElement("h4", "", groupName),
        textElement(
          "span",
          "squad-group-count",
          `${members.length} ${members.length === 1 ? "player" : "players"}`
        )
      );
      section.append(heading);

      if (!members.length) {
        section.append(
          textElement("p", "squad-empty", "No players in this group.")
        );
        container.append(section);
        return;
      }

      const table = document.createElement("table");
      table.className = "squad-table";
      table.setAttribute("aria-label", `${groupName} squad list`);

      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");

      [
        ["Player", ""],
        ["Age", "squad-age-column"],
        ["Pos.", "squad-position-column"],
        ["/ 10", "squad-rating-column"],
        ["", "squad-action-column"]
      ].forEach(([label, className]) => {
        const cell = textElement("th", className, label);
        cell.scope = "col";

        if (!label) {
          cell.setAttribute("aria-label", "Remove player");
        }

        headerRow.append(cell);
      });

      thead.append(headerRow);
      table.append(thead);

      const tbody = document.createElement("tbody");

      members.forEach((player) => {
        const row = document.createElement("tr");

        row.append(
          textElement("td", "squad-player-name", player.name),
          textElement("td", "squad-player-age", player.age ?? "—"),
          textElement("td", "squad-player-position", player.positions)
        );

        const ratingCell = document.createElement("td");
        ratingCell.append(
          textElement(
            "span",
            "squad-player-rating",
            player.rating.toFixed(1)
          )
        );
        row.append(ratingCell);

        const actionCell = document.createElement("td");
        const remove = textElement(
          "button",
          "squad-remove-button",
          "×"
        );

        remove.type = "button";
        remove.setAttribute("aria-label", `Remove ${player.name}`);
        remove.addEventListener("click", () => removePlayer(player.id));

        actionCell.append(remove);
        row.append(actionCell);
        tbody.append(row);
      });

      table.append(tbody);
      section.append(table);
      container.append(section);
    });

        updateUndoNotice();
    persistActiveCareer();
  }

    function switchTab(tab) {
    if (!hasClubBriefing() && ["tactics", "squad"].includes(tab)) {
      tab = "season";
    }
    activeTab = tab;

    const panels = {
      tactics: "tactics-panel",
      squad: "squad-panel",
      policies: "policies-panel",
      season: "season-panel"
    };

    Object.entries(panels).forEach(([name, panelId]) => {
      byId(panelId).hidden = name !== tab;

      const button = byId(`${name}-tab-button`);
      const selected = name === tab;

      button.classList.toggle("is-active", selected);

      if (selected) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    if (tab === "squad") {
      renderSquad();

      announce(
        "Partial starter squad with provisional ratings. " +
        "A dash means the player’s age has not been verified. " +
        "Changes are not saved after a page refresh."
      );
    } else if (tab === "policies") {
      renderPolicies();

      announce(
        `Season ${getSeasonProgress().season} transfer policies. Follow all rules together; ` +
        "existing players are not affected."
      );
    } else if (tab === "season") {
      renderSeasonChallenge();

      announce(
        `Season ${getSeasonProgress().season} objectives and provisional prediction. ` +
        "Bonus objectives are optional."
      );
    } else {
      renderTactics();

      announce(
        "Demonstration lineup, tactical assignments, and ratings. " +
        "Vacant positions indicate removed starting players."
      );
    }
  }

  function openBriefing() {
    if (!selectedClub || isRevealing) {
      return;
    }

    getSquad();

    byId("briefing-title").textContent = selectedClub.name;
    byId("briefing-league").textContent = selectedClub.league;
    byId("briefing-difficulty").textContent =
      difficultyNames[selectedDifficulty];

    byId("signing-form").hidden = true;
    byId("signing-form").reset();

    renderBriefingAvailability();
    switchTab(hasClubBriefing() ? "tactics" : "season");
            byId("season-results-form").reset();
    byId("season-results-form").hidden = true;
    byId("season-results-status").textContent = "";

    refreshSeasonLabels();
    showScreen("briefing-screen");
    byId("briefing-title").focus({ preventScroll: true });
  }

  byId("new-challenge-button").addEventListener("click", () => {
    cancelReveal();
    updateDifficultySelection();
    showScreen("difficulty-screen");
    byId("difficulty-title").focus({ preventScroll: true });
  });

  byId("back-home-button").addEventListener("click", () => {
    cancelReveal();
    showScreen("home-screen");
    byId("new-challenge-button").focus({ preventScroll: true });
  });

  byId("back-setup-button").addEventListener("click", () => {
    cancelReveal();
    updateDifficultySelection();
    showScreen("difficulty-screen");
    byId("difficulty-title").focus({ preventScroll: true });
  });

  document.querySelectorAll('input[name="difficulty"]').forEach((input) => {
    input.addEventListener("change", updateDifficultySelection);
  });

  byId("generate-button").addEventListener("click", startClubDraw);
  byId("reroll-button").addEventListener("click", startClubDraw);
  byId("view-challenge-button").addEventListener("click", openBriefing);

  byId("back-club-button").addEventListener("click", () => {
    if (!selectedClub) {
      return;
    }

    showScreen("club-screen");
    byId("view-challenge-button").focus({ preventScroll: true });
  });

  byId("squad-tab-button").disabled = false;

  byId("tactics-tab-button").addEventListener("click", () => {
    switchTab("tactics");
  });

  byId("squad-tab-button").addEventListener("click", () => {
    switchTab("squad");
  });

  byId("squad-sort").addEventListener("change", () => {
    renderSquad();
    announce("Squad sorting updated within each position group.");
  });

  byId("add-signing-button").addEventListener("click", () => {
    byId("signing-form").hidden = false;
    byId("signing-form").elements.namedItem("playerName").focus();
  });

  byId("cancel-signing-button").addEventListener("click", () => {
    byId("signing-form").reset();
    byId("signing-form").hidden = true;
    byId("add-signing-button").focus();
  });

  byId("signing-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const form = byId("signing-form");

    if (!form.reportValidity() || !selectedClub) {
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("playerName")).trim();
    const positions = String(data.get("positions")).trim();
    const age = Number(data.get("age"));
    const rating = Number(data.get("rating"));
    const group = String(data.get("group"));

    const validGroup = positionGroups.some(
      ([groupId]) => groupId === group
    );

    if (
      !name ||
      !positions ||
      !Number.isInteger(age) ||
      age < 14 ||
      age > 60 ||
      !Number.isFinite(rating) ||
      rating < 1 ||
      rating > 10 ||
      !validGroup
    ) {
      announce("Enter a valid name, positions, age, group, and rating.");
      return;
    }

    getSquad().players.push({
      id: nextPlayerId++,
      name,
      shortName: name,
      age,
      positions,
      group,
      rating
    });

    form.reset();
    form.hidden = true;
    renderSquad();

    announce(`${name} added to your squad with your entered rating.`);
    byId("add-signing-button").focus();
  });

  byId("undo-remove-button").addEventListener("click", () => {
    if (!lastRemoval || lastRemoval.clubId !== selectedClub.id) {
      return;
    }

    const removal = lastRemoval;
    getSquad().players.splice(removal.index, 0, removal.player);
            lastRemoval = null;


    renderSquad();
    renderTactics();

    announce(`${removal.player.name} restored to your squad.`);
    byId("squad-tab-button").focus({ preventScroll: true });
  });

    /* Season 1 transfer policies */

  const savedPolicySets = new Map();

  const policySettings = {
    rookie: {
      arrivals: [8, 9, 10]
    },
    professional: {
      arrivals: [6, 7],
      budget: [85, 90]
    },
    veteran: {
      arrivals: [4, 5],
      age: [26, 27],
      wages: [100]
    },
    legendary: {
      arrivals: [3, 4],
      age: [23, 24],
      wages: [80, 90],
      budget: [70, 75]
    }
  };

  function choosePolicyLimit(options) {
    return options[randomIndex(options.length)];
  }

  function createArrivalPolicy(limit) {
    return {
      category: "arrivals",
      title: "Make every signing count",
      rule:
        `Bring in no more than ${limit} first-team players during Season 1. ` +
        "Permanent signings and incoming loans both count.",
      reason:
        "A smaller recruitment window encourages you to prioritise " +
        "the positions that need the most attention.",
      example:
        `${limit - 1} permanent signings and one incoming loan ` +
        `would use all ${limit} places.`,
      clarification:
        "Contract renewals, youth promotions, and your own players " +
        "returning from loan do not count as new arrivals. Academy-only recruitment does not count unless the player joins the first-team squad that season."
    };
  }

  function createBudgetPolicy(percent) {
    return {
      category: "budget",
      title: "Keep money in reserve",
      rule:
        `Spend no more than ${percent}% of your Season 1 transfer allowance ` +
        "on guaranteed incoming transfer fees and loan fees.",
      reason:
        "Keeping a reserve gives your club room to manage unexpected " +
        "costs while still strengthening the squad.",
      example:
        `With a 1,000,000 allowance in your save's currency, combined ` +
        `guaranteed fees must stay at or below ${(percent * 10000).toLocaleString("en-GB")}.`,
      clarification:
        "Record the available transfer budget when you start. Add any " +
        "extra funds the board actually makes available during the season, " +
        "including retained sale proceeds. Count guaranteed instalments " +
        "even if they are payable later. Wages are handled separately."
    };
  }

  function createAgePolicy(ageLimit) {
    return {
      category: "age",
      title: "Build for the future",
      rule:
        `Every new signing must be aged ${ageLimit} or younger ` +
        "on the day they join your club.",
      reason:
        "Recruit players who can develop alongside the club " +
        "over your five-season challenge.",
      example:
        `A ${ageLimit}-year-old arriving now meets this rule. ` +
        `A ${ageLimit + 1}-year-old does not.`,
      clarification:
        "This applies to permanent signings, free agents, and incoming " +
        "loans. Existing players can stay and renew their contracts. " +
        "A signing becoming older later does not break the rule."
    };
  }

  function createWagePolicy(percent) {
    return {
      category: "wages",
      title: "Protect the wage structure",
      rule:
        `Your basic weekly wage contribution for each new signing ` +
        `must not exceed ${percent}% of the highest basic weekly wage ` +
        "already paid by your club when this challenge starts.",
      reason:
        "Recruit within the club’s existing salary structure " +
        "rather than depending on expensive new stars.",
      example:
        `If the starting highest basic wage is 20,000 per week in your save's currency, ` +
        `the limit is ${(20000 * percent / 100).toLocaleString("en-GB")} ` +
        "per week for each arrival.",
      clarification:
        "For a loan, count only the basic wage your club pays. " +
        "Record the starting highest wage once; new signings cannot raise " +
        "this limit. Existing players and their renewals are exempt. " +
        "The board’s overall wage budget still applies. If your club has no existing paid basic wages, this percentage ceiling does not apply; use the board’s wage budget."
    };
  }

  function getPolicies() {
    const key = challengeCacheKey();

    if (!savedPolicySets.has(key)) {
            const settings = settingsForCurrentSeason();
      const policies = [];

      policies.push(
        createArrivalPolicy(choosePolicyLimit(settings.arrivals))
      );

      if (settings.age) {
        policies.push(
          createAgePolicy(choosePolicyLimit(settings.age))
        );
      }

      if (settings.wages) {
        policies.push(
          createWagePolicy(choosePolicyLimit(settings.wages))
        );
      }

      if (settings.budget) {
        policies.push(
          createBudgetPolicy(choosePolicyLimit(settings.budget))
        );
      }

      // One rule per category avoids duplicate or opposing requirements.
      // Every rule is a ceiling; none forces a conflicting signing.
            const progress = getSeasonProgress();

      policies.forEach((policy) => {
        policy.rule = policy.rule.replaceAll(
          "Season 1",
          `Season ${progress.season}`
        );

        policy.rule = policy.rule.replaceAll(
          "when this challenge starts",
          "when this season starts"
        );

        policy.clarification = policy.clarification.replaceAll(
          "when you start",
          "when this season starts"
        );

        if (
          policy.category === "budget" &&
          progress.transferBudget !== null
        ) {
          const percentage = Number(
            policy.rule.match(/(\d+)%/)[1]
          );

          const spendingLimit =
            progress.transferBudget * percentage / 100;

          policy.clarification +=
            ` Your recorded starting transfer budget is ` +
            `${formatBudget(progress.transferBudget)}. ` +
            `That gives an initial spending limit of ` +
            `${formatBudget(spendingLimit)} before any additional ` +
            "funds the board makes available.";
        }

        if (
          policy.category === "wages" &&
          progress.highestWeeklyWage !== null
        ) {
          const percentage = Number(
            policy.rule.match(/(\d+)%/)[1]
          );

          const wageLimit =
            progress.highestWeeklyWage * percentage / 100;

          policy.clarification +=
            ` Your recorded starting highest basic wage is ` +
            `${formatBudget(progress.highestWeeklyWage)} per week. ` +
            `The limit for each arrival is therefore ` +
            `${formatBudget(wageLimit)} per week.`;
        }
      });

      const categories = new Set(
        policies.map((policy) => policy.category)
      );

      if (categories.size !== policies.length || policies.length > 4) {
        throw new Error("Invalid transfer policy combination.");
      }

      savedPolicySets.set(key, policies);
    }

    return savedPolicySets.get(key);
  }

  function renderPolicies() {
    const policies = getPolicies();
    const container = byId("policy-list");

    container.replaceChildren();

    byId("policies-count").textContent =
      `${policies.length} ${policies.length === 1 ? "policy" : "policies"}`;

    policies.forEach((policy, index) => {
      const card = document.createElement("article");
      card.className = "policy-card";

      const heading = document.createElement("div");
      heading.className = "policy-card-heading";

      heading.append(
        textElement("span", "policy-number", index + 1),
        textElement("h4", "", policy.title)
      );

      const example = document.createElement("div");
      example.className = "policy-example";

      example.append(
        textElement(
          "span",
          "policy-example-label",
          "Example within this rule"
        ),
        textElement("p", "", policy.example)
      );

      card.append(
        heading,
        textElement("p", "policy-rule", policy.rule),
        textElement("p", "policy-reason", policy.reason),
        example,
        textElement("p", "policy-exception", policy.clarification)
      );

      container.append(card);
    });
  }

  byId("policies-tab-button").disabled = false;

  byId("policies-tab-button").addEventListener("click", () => {
    switchTab("policies");
  });

    /* Season 1 objectives and provisional forecasts */

  const savedSeasonChallenges = new Map();

  // Illustrative starting forecasts, not validated FM24 predictions.
  const clubSeasonProfiles = {
    sunderland: {
      baselineFinish: 10,
      targets: {
        rookie: 16,
        professional: 10,
        veteran: 6,
        legendary: 2
      },
      context:
        "This preview treats Sunderland as a side capable of " +
        "competing in the upper half of the Championship."
    },
    ipswich: {
      baselineFinish: 8,
      targets: {
        rookie: 16,
        professional: 10,
        veteran: 6,
        legendary: 2
      },
      context:
        "This preview gives Ipswich a promising starting position, " +
        "with the potential to challenge in the upper half."
    },
    leicester: {
      baselineFinish: 2,
      targets: {
        rookie: 6,
        professional: 2,
        veteran: 2,
        legendary: 1
      },
      context:
        "This preview treats Leicester as one of the strongest " +
        "squads in the Championship and a promotion contender."
    }
  };

  const seasonBonusSettings = {
    rookie: {
      goals: 55,
      cupTitle: "Reach the FA Cup fourth round",
      cupDescription:
        "Progress to the fourth round of the FA Cup."
    },
    professional: {
      goals: 65,
      cupTitle: "Reach the FA Cup fifth round",
      cupDescription:
        "Progress to the fifth round of the FA Cup."
    },
    veteran: {
      goals: 70,
      cupTitle: "Reach an FA Cup quarter-final",
      cupDescription:
        "Reach the quarter-finals of the FA Cup."
    },
    legendary: {
      goals: 75,
      cupTitle: "Reach an FA Cup semi-final",
      cupDescription:
        "Reach the semi-finals of the FA Cup."
    }
  };

  function ordinal(number) {
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return `${number}th`;
    }

    const endings = {
      1: "st",
      2: "nd",
      3: "rd"
    };

    return `${number}${endings[number % 10] || "th"}`;
  }

  function createMainObjective(target) {
    if (target === 1) {
      return {
        title: "Win the Championship",
        description:
          "Finish first in the final Championship league table. " +
          "Promotion through the play-offs does not meet this target."
      };
    }

    if (target === 2) {
      return {
        title: "Finish in the top two",
        description:
          "Secure automatic promotion by finishing first or second " +
          "in the final Championship league table."
      };
    }

    if (target === 6) {
      return {
        title: "Finish in the top six",
        description:
          "Finish sixth or higher in the final Championship league " +
          "table to secure at least a play-off place."
      };
    }

    return {
      title: `Finish ${ordinal(target)} or higher`,
      description:
        `Finish ${ordinal(target)} or higher in the final Championship ` +
        "league table. Cup results and bonus objectives are assessed separately."
    };
  }

  function createPrediction(profile, policies, target) {
    let predictedFinish = profile.baselineFinish;
    const restrictions = [];

    // Simple demonstration adjustments.
    // Each category restricts a different route to squad improvement.
    policies.forEach((policy) => {
      if (policy.category === "arrivals") {
        restrictions.push("the limit on incoming players");
      }

      if (policy.category === "age") {
        predictedFinish += 1;
        restrictions.push("the age limit on new signings");
      }

      if (policy.category === "wages") {
        predictedFinish += 1;
        restrictions.push("the wage ceiling for arrivals");
      }

      if (policy.category === "budget") {
        predictedFinish += 1;
        restrictions.push("the transfer spending reserve");
      }
    });

    predictedFinish = Math.max(1, Math.min(24, predictedFinish));

    const restrictionsText = restrictions.join(", ");

    const targetComparison = target < predictedFinish
      ? `Your main objective of ${ordinal(target)} or higher is more ` +
        "ambitious than this forecast."
      : target === predictedFinish
        ? "Your main objective matches this forecast."
        : "Your main objective leaves room to exceed expectations.";

    return {
      finish: predictedFinish,
      beatTarget: predictedFinish === 1
        ? "Title + 90 points"
        : `${ordinal(predictedFinish - 1)} or higher`,
      explanation:
        `${profile.context} The forecast considers ${restrictionsText}. ` +
        "Recruitment limits may reduce your options when strengthening " +
        `the squad. ${targetComparison} ` +
        "This is an illustrative estimate, not a validated simulation."
    };
  }

  // Product estimates; the source guide's club Rating is not an FM media prediction.
  function clubStrengthEstimate() {
    const peers = clubs.filter(club => club.leagueId === selectedClub.leagueId &&
      Number.isFinite(club.guideRating) && club.guideRating > 0);
    const size = getSeasonProgress().leagueSize;
    const rating = selectedClub.guideRating;
    if (!Number.isFinite(rating) || peers.length < 2) {
      return { finish: Math.ceil(size / 2), sourceAvailable: false };
    }
    const stronger = peers.filter(club => club.guideRating > rating).length;
    const tied = peers.filter(club => club.guideRating === rating).length;
    // Tied scores share their average rank. Scale around any unscored reserves.
    const averageRank = stronger + (tied + 1) / 2;
    return {
      finish: Math.max(1, Math.min(size,
        Math.round(1 + (averageRank - 1) / (peers.length - 1) * (size - 1)))),
      sourceAvailable: true
    };
  }

  function createLeagueSeasonChallenge() {
    const progress = getSeasonProgress();
    const previous = progress.history.at(-1);
    const size = progress.leagueSize;
    const strength = clubStrengthEstimate();
    let baseline = strength.finish;
    let basis = "A rough middle-of-the-table starting estimate is used because club strength data is missing.";
    if (strength.sourceAvailable) {
      basis = `The FM24 club guide's relative ratings suggest a starting position of ${ordinal(baseline)} in this league group. Tied ratings share an average rank.`;
    }
    if (previous) {
      if (previous.outcome === "promoted") {
        baseline = Math.ceil(size * 0.75);
        basis = "Promotion brings stronger opposition, so the starting estimate allows for a season of consolidation.";
      } else if (previous.outcome === "relegated") {
        baseline = Math.max(1, Math.round(size * 0.3));
        basis = "After relegation, the starting estimate allows for a stronger finish while you rebuild.";
      } else {
        baseline = Math.round(1 + (previous.finish - 1) /
          (previous.leagueSize - 1) * (size - 1));
        basis = `Your previous finish of ${ordinal(previous.finish)} is the starting point for this season's estimate.`;
      }
    }
    const policies = getPolicies();
    const pressure = policies.filter(policy =>
      ["age", "wages", "budget"].includes(policy.category)).length;
    const restrictionAdjustment = Math.round(pressure * (size - 1) * 0.025);
    const forecast = Math.max(1, Math.min(size, baseline + restrictionAdjustment));
    const offsets = {
      rookie: Math.max(1, Math.round((size - 1) * 0.15)),
      professional: 0,
      veteran: -Math.max(1, Math.round((size - 1) * 0.08)),
      legendary: -Math.max(1, Math.round((size - 1) * 0.15))
    };
    const recovery = previous && !previous.mainAchieved ? 1 : 0;
    const target = Math.max(1, Math.min(size, baseline + offsets[selectedDifficulty] + recovery));
    const rates = { rookie: 1, professional: 1.2, veteran: 1.4, legendary: 1.6 };
    const goalRate = rates[selectedDifficulty];
    return {
      model: "league-relative-v1",
      targetFinish: target,
      goalRate,
      goalDifferenceTarget: 0,
      mainObjective: {
        title: target === 1 ? `Finish first in ${progress.league}` : `Finish ${ordinal(target)} or higher`,
        description: `Finish ${ordinal(target)} or higher in the main regular-season ${progress.league} table for your club's group (${size} clubs). Use the table before play-offs or championship splits. In competitions with separate league phases, use the first full league phase consistently. Cup results do not decide this objective.`
      },
      bonuses: [
        {
          title: "Finish with a positive or level goal difference",
          description: "Score at least as many goals as you concede in that regular league phase. Cup and play-off matches do not count."
        },
        {
          title: `Average at least ${goalRate.toFixed(1)} league goals per match`,
          description: `Score at least ${goalRate.toFixed(1)} goals per match across the same regular league phase. This scales to the number of games you play.`
        }
      ],
      prediction: {
        finish: forecast,
        beatTarget: forecast === 1 ? "Match it: finish first" : `${ordinal(forecast - 1)} or higher`,
        explanation: `${basis} Your ${policies.length} recruitment ${policies.length === 1 ? "rule" : "rules"} ${restrictionAdjustment > 0 ? `add a conservative allowance of ${restrictionAdjustment} ${restrictionAdjustment === 1 ? "position" : "positions"} to the forecast` : "are included without changing its rounded position"}. ${difficultyNames[selectedDifficulty]} sets your main target at ${ordinal(target)} or higher. ${recovery ? "A missed target gives you a little more rebuilding room this season. " : ""}This is a provisional estimate, not FM's media prediction or a match simulation.${forecast === 1 ? " First place is the highest possible league finish, so you can match this prediction." : ""}`
      }
    };
  }

  function updateSeasonResultFields() {
    const form = byId("season-results-form");
    const modern = getSeasonChallenge().model === "league-relative-v1";
    const cup = form.elements.namedItem("faCupRound");
    cup.closest("label").hidden = modern;
    cup.disabled = modern;
    cup.required = !modern;
    if (modern) cup.value = "0";
    const fields = form.querySelector(".season-results-fields");
    [
      ["leagueMatches", "Regular-season league matches played", 1, 200],
      ["leagueGoalsConceded", "Regular-season league goals conceded", 0, 1000]
    ].forEach(([name, labelText, min, max]) => {
      let input = byId(`result-${name}`);
      if (!input) {
        const label = textElement("label", "signing-field", labelText);
        input = document.createElement("input");
        input.id = `result-${name}`;
        input.name = name;
        input.type = "number";
        input.className = "squad-input";
        input.min = String(min);
        input.max = String(max);
        input.step = "1";
        label.append(input);
        fields.append(label);
      }
      input.closest("label").hidden = !modern;
      input.required = modern;
      input.disabled = !modern;
    });
  }


  function getSeasonChallenge() {
    const key = challengeCacheKey();
    if (!savedSeasonChallenges.has(key)) {
      const previous = getSeasonProgress().history.at(-1);
      // Older saved demo careers retain their existing cup objectives.
      const legacy = previous && previous.challenge?.model !== "league-relative-v1" && hasClubBriefing();
      savedSeasonChallenges.set(key, legacy
        ? createAdaptiveSeasonChallenge()
        : createLeagueSeasonChallenge());
    }
    return savedSeasonChallenges.get(key);
  }

  function renderSeasonChallenge() {
    const challenge = getSeasonChallenge();

    byId("main-objective-title").textContent =
      challenge.mainObjective.title;

    byId("main-objective-description").textContent =
      challenge.mainObjective.description;

    const bonusContainer = byId("bonus-objective-list");
    bonusContainer.replaceChildren();

    byId("season-panel").querySelector(".preview-note").textContent =
      "Season targets and forecasts are provisional estimates. Your saved rules stay fixed until you finish the season.";
    challenge.bonuses.forEach((bonus, index) => {
      const card = document.createElement("article");
      card.className = "bonus-card";

      card.append(
        textElement("span", "bonus-label", `Optional bonus ${index + 1}`),
        textElement("h5", "", bonus.title),
        textElement("p", "", bonus.description)
      );

      bonusContainer.append(card);
    });

    byId("predicted-finish").textContent =
      ordinal(challenge.prediction.finish);

    byId("prediction-beat-target").textContent =
      challenge.prediction.beatTarget;

    const explanation = byId("prediction-explanation");
    explanation.textContent = challenge.prediction.explanation;
    if (challenge.model === "league-relative-v1" && getSeasonProgress().season === 1) {
      const link = textElement("a", "", "FM24 club guide");
      link.href = selectedClub.guideSource;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      explanation.append(document.createTextNode(" "), link);
    }
  }

  byId("season-tab-button").disabled = false;

  byId("season-tab-button").addEventListener("click", () => {
    switchTab("season");
  });

    /* Device-based career saving */

  const careerStorageKey = "fm-challenge-lab-careers-v1";

  let savedCareers = [];
  let currentCareerId = null;
  let careersReturnScreen = "home-screen";
  let storageIssue = "";

  function isValidCareer(career) {
    if (!career || typeof career !== "object") {
      return false;
    }

    const validClub = clubs.some((club) => club.id === career.clubId);
    const validDifficulty = Object.hasOwn(
      difficultyNames,
      career.difficulty
    );

    if (
      typeof career.id !== "string" ||
      typeof career.name !== "string" ||
      !career.name.trim() ||
      career.name.length > 60 ||
      !validClub ||
      !validDifficulty ||
      !Number.isFinite(Date.parse(career.createdAt)) ||
      !Number.isFinite(Date.parse(career.updatedAt))
    ) {
      return false;
    }

    const squad = career.squad;

    if (
      !squad ||
      !Array.isArray(squad.players) ||
      !Array.isArray(squad.startingIds) ||
      squad.startingIds.length !== tacticalPositions.length ||
      !squad.startingIds.every(
        (id) => Number.isSafeInteger(id) && id > 0
      ) ||
      new Set(squad.startingIds).size !== squad.startingIds.length
    ) {
      return false;
    }

    const validPlayers = squad.players.every((player) => (
      player &&
      Number.isSafeInteger(player.id) &&
      player.id > 0 &&
      typeof player.name === "string" &&
      player.name.trim().length > 0 &&
      typeof player.shortName === "string" &&
      typeof player.positions === "string" &&
      positionGroups.some(([group]) => group === player.group) &&
      Number.isFinite(player.rating) &&
      player.rating >= 1 &&
      player.rating <= 10 &&
      (
        player.age === null ||
        (
          Number.isInteger(player.age) &&
          player.age >= 14 &&
          player.age <= 60
        )
      )
    ));

    if (
      !validPlayers ||
      new Set(squad.players.map((player) => player.id)).size !==
        squad.players.length
    ) {
      return false;
    }

    if (career.briefingStatus === "club-selected") {
      return squad.players.length === 0 &&
        Array.isArray(career.policies) && career.policies.length === 0 &&
        career.challenge === null && isValidSeasonProgress(career.progress) &&
        career.progress?.season === 1 && career.progress.history.length === 0;
    }

    const policies = career.policies;
    const allowedCategories = ["arrivals", "age", "wages", "budget"];

    if (
      !Array.isArray(policies) ||
      policies.length < 1 ||
      policies.length > 4 ||
      !policies.every((policy) => (
        policy &&
        allowedCategories.includes(policy.category) &&
        ["title", "rule", "reason", "example", "clarification"].every(
          (field) => typeof policy[field] === "string"
        )
      )) ||
      new Set(policies.map((policy) => policy.category)).size !==
        policies.length
    ) {
      return false;
    }

    const challenge = career.challenge;

    return Boolean(
      challenge &&
      (challenge.model !== "league-relative-v1" || (
        Number.isInteger(challenge.targetFinish) && challenge.targetFinish >= 1 &&
        challenge.targetFinish <= (career.progress?.leagueSize || 24) &&
        Number.isFinite(challenge.goalRate) && challenge.goalRate >= 0.5 && challenge.goalRate <= 5 &&
        challenge.goalDifferenceTarget === 0 && challenge.bonuses?.length === 2
      )) &&
      challenge.mainObjective &&
      typeof challenge.mainObjective.title === "string" &&
      typeof challenge.mainObjective.description === "string" &&
      Array.isArray(challenge.bonuses) &&
      challenge.bonuses.length <= 2 &&
      challenge.bonuses.every((bonus) => (
        bonus &&
        typeof bonus.title === "string" &&
        typeof bonus.description === "string"
      )) &&
      challenge.prediction &&
      Number.isInteger(challenge.prediction.finish) &&
      challenge.prediction.finish >= 1 &&
      challenge.prediction.finish <= (career.progress?.leagueSize || 24) &&
      typeof challenge.prediction.beatTarget === "string" &&
            typeof challenge.prediction.explanation === "string" &&
      isValidSeasonProgress(career.progress)
    );
  }

  function loadSavedCareers() {
    try {
      const stored = localStorage.getItem(careerStorageKey);

      if (stored === null) {
        return;
      }

      const parsed = JSON.parse(stored);

      if (
        parsed.version !== 1 ||
        !Array.isArray(parsed.careers) ||
        !parsed.careers.every(isValidCareer) ||
        new Set(parsed.careers.map((career) => career.id)).size !==
          parsed.careers.length
      ) {
        throw new Error("Invalid saved career data.");
      }

      savedCareers = parsed.careers;
    } catch (error) {
      storageIssue =
        "Saved careers could not be read. Existing stored data has " +
        "been left untouched. Check that browser storage is available.";
    }
  }

  function writeSavedCareers(nextCareers) {
    if (storageIssue) {
      byId("careers-status").textContent = storageIssue;
      return false;
    }

    try {
      localStorage.setItem(
        careerStorageKey,
        JSON.stringify({
          version: 1,
          careers: nextCareers
        })
      );

      savedCareers = nextCareers;
      return true;
    } catch (error) {
      const message =
        "Your latest changes could not be saved. Browser storage " +
        "may be full or unavailable. Keep this page open and try again.";

      byId("careers-status").textContent = message;
      announce(message);
      byId("save-career-button").textContent = "Retry Save";
      return false;
    }
  }

  function captureCareer(id, name, existing = null) {
    const now = new Date().toISOString();

    return {
      id,
      name,
      clubId: selectedClub.id,
      difficulty: selectedDifficulty,
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now,
      briefingStatus: hasClubBriefing() ? "preview" : "challenge-ready",
      squad: structuredClone(getSquad()),
      policies: structuredClone(getPolicies()),
      challenge: structuredClone(getSeasonChallenge()),
      progress: structuredClone(getSeasonProgress())
    };
  }

  function careerProgress(career) {
    return JSON.stringify({
      name: career.name,
      clubId: career.clubId,
      difficulty: career.difficulty,
      briefingStatus: career.briefingStatus,
      squad: career.squad,
      policies: career.policies,
            challenge: career.challenge,
      progress: career.progress
    });
  }

  function persistActiveCareer() {
    if (!currentCareerId || !selectedClub) {
      return true;
    }

    const existing = savedCareers.find(
      (career) => career.id === currentCareerId
    );

    if (!existing) {
      announce("This career could not be found. Use Save Career again.");
      return false;
    }

    const updated = captureCareer(
      currentCareerId,
      existing.name,
      existing
    );

    // Merely viewing a tab does not change the saved timestamp.
    if (careerProgress(updated) === careerProgress(existing)) {
      return true;
    }

    const nextCareers = savedCareers.map((career) => (
      career.id === currentCareerId ? updated : career
    ));

    const saved = writeSavedCareers(nextCareers);

    if (saved) {
      byId("save-career-button").textContent = "Save Career";
    }

    return saved;
  }

  function prepareNewDraft() {
    if (!persistActiveCareer()) {
      return false;
    }

    currentCareerId = null;
    selectedClub = null;
    lastRemoval = null;
    seasonProgress = null;

    squads.clear();
    savedPolicySets.clear();
    savedSeasonChallenges.clear();

    byId("signing-form").reset();
    byId("signing-form").hidden = true;
    byId("save-career-button").textContent = "Save Career";

    return true;
  }

  function renderSavedCareers() {
    const container = byId("career-list");
    container.replaceChildren();

    byId("careers-empty").hidden =
      savedCareers.length > 0 || Boolean(storageIssue);

    const ordered = [...savedCareers].sort(
      (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
    );

    ordered.forEach((career) => {
      const club = clubs.find((item) => item.id === career.clubId);

      const card = document.createElement("article");
      card.className = "career-card";

      const heading = document.createElement("div");
      heading.className = "career-card-heading";

      heading.append(
        textElement("h3", "", career.name),
        textElement("span", "career-privacy", "Private")
      );

      const date = new Date(career.updatedAt).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short"
      });

      const actions = document.createElement("div");
      actions.className = "career-card-actions";

      const resume = textElement(
        "button",
        "button button-primary",
        "Resume Career"
      );

      resume.type = "button";
      resume.addEventListener("click", () => resumeCareer(career.id));

      actions.append(resume);

      card.append(
        heading,
        textElement("p", "career-club-name", club.name),
        textElement(
          "p",
          "career-details",
          career.briefingStatus === "club-selected"
            ? `${difficultyNames[career.difficulty]} · Club choice saved`
            : `${difficultyNames[career.difficulty]} · Season ${career.progress?.season || 1} · ` +
              (career.briefingStatus === "challenge-ready" ? "Challenge saved" : `${career.squad.players.length} players`)
        ),
        textElement("p", "career-saved-date", `Last saved: ${date}`),
        actions
      );

      container.append(card);
    });

    if (storageIssue) {
      byId("careers-status").textContent = storageIssue;
    }
  }

  function openCareers(saving = false) {
    if (!persistActiveCareer()) {
      return;
    }

    careersReturnScreen = saving ? "briefing-screen" : "home-screen";
    byId("careers-status").textContent = "";
    byId("career-save-form").hidden = !saving;

    renderSavedCareers();
    showScreen("careers-screen");

    if (saving) {
      const existing = savedCareers.find(
        (career) => career.id === currentCareerId
      );

      byId("career-name").value = existing
        ? existing.name
        : `${selectedClub.name} — ${difficultyNames[selectedDifficulty]}`;

      byId("career-name").focus();
    } else {
      byId("careers-title").focus({ preventScroll: true });
    }
  }

  function resumeCareer(id) {
    if (!persistActiveCareer()) {
      return;
    }

    const career = savedCareers.find((item) => item.id === id);

    if (!career) {
      byId("careers-status").textContent = "This career was not found.";
      return;
    }

    cancelReveal();

    selectedClub = clubs.find((club) => club.id === career.clubId);
    selectedDifficulty = career.difficulty;
    currentCareerId = career.id;
    lastRemoval = null;
    seasonProgress = career.progress
      ? structuredClone(career.progress)
      : createInitialSeasonProgress();

    squads.clear();
    savedPolicySets.clear();
    savedSeasonChallenges.clear();

    const squad = structuredClone(career.squad);
    squads.set(selectedClub.id, squad);

    const key = challengeCacheKey();

    if (career.briefingStatus !== "club-selected") {
      savedPolicySets.set(key, structuredClone(career.policies));
      savedSeasonChallenges.set(key, structuredClone(career.challenge));
    }

    const usedIds = [
      ...squad.startingIds,
      ...squad.players.map((player) => player.id)
    ];

    usedIds.forEach((playerId) => {
      nextPlayerId = Math.max(nextPlayerId, playerId + 1);
    });

    document.querySelectorAll('input[name="difficulty"]').forEach(
      (input) => {
        input.checked = input.value === selectedDifficulty;
      }
    );

    updateDifficultySelection();
    renderClub(selectedClub);

    byId("club-shuffle").hidden = true;
    byId("club-result").hidden = false;
    byId("club-status").textContent = "";
    byId("career-save-form").hidden = true;
    byId("save-career-button").textContent = "Save Career";

    openBriefing();
    if (career.briefingStatus === "club-selected") persistActiveCareer();
  }

  function returnFromCareers() {
    byId("career-save-form").hidden = true;
    showScreen(careersReturnScreen);

    if (careersReturnScreen === "briefing-screen") {
      byId("save-career-button").focus();
    } else {
      byId("my-careers-button").focus();
    }
  }

  byId("my-careers-button").addEventListener("click", () => {
    openCareers(false);
  });

  byId("save-career-button").disabled = false;

  byId("save-career-button").addEventListener("click", () => {
    if (selectedClub) {
      openCareers(true);
    }
  });

  byId("career-save-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const form = byId("career-save-form");

    if (!selectedClub || !form.reportValidity()) {
      return;
    }

    const name = byId("career-name").value.trim();

    if (!name || name.length > 60) {
      byId("careers-status").textContent =
        "Enter a career name between 1 and 60 characters.";
      return;
    }

    const existing = savedCareers.find(
      (career) => career.id === currentCareerId
    );

    const id = existing ? existing.id : window.crypto.randomUUID();
    const career = captureCareer(id, name, existing);

    const nextCareers = existing
      ? savedCareers.map((item) => item.id === id ? career : item)
      : [...savedCareers, career];

    if (!writeSavedCareers(nextCareers)) {
      return;
    }

    currentCareerId = id;
    form.hidden = true;
    byId("save-career-button").textContent = "Save Career";

    renderSavedCareers();

    byId("careers-status").textContent =
      hasClubBriefing()
        ? `${name} saved privately. Future squad changes save automatically.`
        : `${name} saved privately. Your rules and objectives are saved with this career.`;

    byId("careers-title").focus({ preventScroll: true });
  });

  byId("back-careers-button").addEventListener(
    "click",
    returnFromCareers
  );

  byId("cancel-career-save-button").addEventListener(
    "click",
    returnFromCareers
  );

  function startNewCareerFromCareers() {
    if (!prepareNewDraft()) {
      return;
    }

    byId("career-save-form").hidden = true;
    updateDifficultySelection();
    showScreen("difficulty-screen");
    byId("difficulty-title").focus({ preventScroll: true });
  }

  byId("careers-new-challenge-button").addEventListener(
    "click",
    startNewCareerFromCareers
  );

  // Existing handlers open the difficulty screen first.
  // These clear the previous career before a new selection is made.
  byId("new-challenge-button").addEventListener("click", () => {
    if (!prepareNewDraft()) {
      showScreen(selectedClub ? "briefing-screen" : "home-screen");
    }
  });

  byId("back-setup-button").addEventListener("click", () => {
    if (!prepareNewDraft()) {
      showScreen("club-screen");
    }
  });

  byId("careers-screen")
    .querySelector(".careers-storage-note").textContent =
      "Careers are private and saved in this browser on this device. " +
      "After the first save, squad changes save automatically. " +
      "Account access across devices will be added later.";

    /* Season progression */

  let seasonProgress = null;

  function createInitialSeasonProgress() {
    return {
      season: 1,
      league: selectedClub.league,
      leagueSize: selectedClub.leagueSize || 24,
      currency: "GBP",
      transferBudget: null,
      highestWeeklyWage: null,
      history: []
    };
  }

  function getSeasonProgress() {
    if (!seasonProgress) {
      seasonProgress = createInitialSeasonProgress();
    }

    return seasonProgress;
  }

  function challengeCacheKey() {
    return `${selectedClub.id}:${selectedDifficulty}:season-${getSeasonProgress().season}`;
  }

  function isValidSeasonProgress(progress) {
    // Earlier saved careers did not have this field.
    if (progress === undefined) {
      return true;
    }

    if (
      !progress ||
      !Number.isSafeInteger(progress.season) ||
      progress.season < 1 ||
      typeof progress.league !== "string" ||
      !progress.league.trim() ||
      progress.league.length > 80 ||
      !Number.isInteger(progress.leagueSize) ||
      progress.leagueSize < 2 ||
      progress.leagueSize > 60 ||
      !["GBP", "EUR", "USD"].includes(progress.currency) ||
      !Array.isArray(progress.history) ||
      progress.history.length !== progress.season - 1
    ) {
      return false;
    }

    for (const field of ["transferBudget", "highestWeeklyWage"]) {
      const value = progress[field];

      if (
        value !== null &&
        (!Number.isSafeInteger(value) || value < 0)
      ) {
        return false;
      }
    }

    return progress.history.every((entry, index) => (
      entry &&
      entry.season === index + 1 &&
      typeof entry.league === "string" &&
      Number.isInteger(entry.leagueSize) &&
      entry.leagueSize >= 2 &&
      entry.leagueSize <= 60 &&
      Number.isInteger(entry.finish) &&
      entry.finish >= 1 &&
      entry.finish <= entry.leagueSize &&
      Number.isInteger(entry.goals) &&
      entry.goals >= 0 &&
      entry.goals <= 1000 &&
      (entry.challenge?.model !== "league-relative-v1" || (
        Number.isInteger(entry.matches) && entry.matches >= 1 && entry.matches <= 200 &&
        Number.isInteger(entry.goalsConceded) && entry.goalsConceded >= 0 && entry.goalsConceded <= 1000
      )) &&
      [0, 3, 4, 5, 6, 7, 8, 9].includes(entry.cupRound) &&
      ["stayed", "promoted", "relegated"].includes(entry.outcome) &&
      typeof entry.mainAchieved === "boolean" &&
      typeof entry.predictionBeaten === "boolean" &&
      typeof entry.objectiveTitle === "string" &&
      Number.isInteger(entry.predictedFinish) &&
      entry.predictedFinish >= 1 &&
      entry.predictedFinish <= entry.leagueSize &&
      Array.isArray(entry.bonusResults) &&
      entry.bonusResults.every((bonus) => (
        bonus &&
        typeof bonus.title === "string" &&
        typeof bonus.achieved === "boolean"
      ))
    ));
  }

  function formatBudget(amount) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: getSeasonProgress().currency,
      maximumFractionDigits: 0
    }).format(amount);
  }

  function settingsForCurrentSeason() {
    const settings = structuredClone(
      policySettings[selectedDifficulty]
    );

    const progress = getSeasonProgress();

    if (progress.season === 1) {
      return settings;
    }

    const previous = progress.history.at(-1);
    const rebuilding = !previous.mainAchieved ||
      previous.outcome === "relegated";

    if (rebuilding || previous.outcome === "promoted") {
      settings.arrivals = settings.arrivals.map(
        (limit) => Math.min(10, limit + 1)
      );
    }

    if (settings.age && rebuilding) {
      settings.age = settings.age.map(
        (limit) => Math.min(30, limit + 2)
      );
    }

    if (settings.wages) {
      if (progress.highestWeeklyWage === 0) {
        // Avoid a wage ceiling that rules out all paid recruitment.
        delete settings.wages;
      } else if (rebuilding || previous.outcome === "promoted") {
        settings.wages = settings.wages.map(
          (limit) => Math.min(100, limit + 10)
        );
      }
    }

    if (settings.budget) {
      if (progress.transferBudget === 0) {
        // The board's zero budget already prevents spending.
        settings.budget = [100];
      } else if (rebuilding) {
        settings.budget = settings.budget.map(
          (limit) => Math.min(95, limit + 10)
        );
      }
    }

    return settings;
  }

  function createAdaptiveSeasonChallenge() {
    const progress = getSeasonProgress();
    const previous = progress.history.at(-1);
    const size = progress.leagueSize;
    const policies = getPolicies();

    let forecast;

    if (previous.outcome === "promoted") {
      forecast = Math.ceil(size * 0.75);
    } else if (previous.outcome === "relegated") {
      forecast = Math.max(2, Math.round(size * 0.3));
    } else {
      forecast = Math.round(
        previous.finish / previous.leagueSize * size
      );
    }

    const recruitmentPressure = policies.filter(
      (policy) => ["age", "wages", "budget"].includes(policy.category)
    ).length;

    forecast += Math.round(recruitmentPressure * 0.5);

    if (progress.transferBudget === 0) {
      forecast += 1;
    } else if (progress.highestWeeklyWage > 0) {
      const recruitmentRoom =
        progress.transferBudget / (progress.highestWeeklyWage * 52);

      if (recruitmentRoom >= 2) {
        forecast -= 1;
      }
    }

    forecast = Math.max(1, Math.min(size, forecast));

    const targetOffsets = {
      rookie: 4,
      professional: 1,
      veteran: -2,
      legendary: -4
    };

    let target = forecast + targetOffsets[selectedDifficulty];

    if (!previous.mainAchieved) {
      target += 1;
    }

    target = Math.max(1, Math.min(size, target));

    const goalIncreases = {
      rookie: 0,
      professional: 4,
      veteran: 7,
      legendary: 10
    };

    const matchAdjustment =
      (size - 1) / (previous.leagueSize - 1);

    let goalTarget = Math.round(
      previous.goals * matchAdjustment +
      goalIncreases[selectedDifficulty]
    );

    if (previous.outcome === "promoted") {
      goalTarget = Math.round(goalTarget * 0.85);
    }

    goalTarget = Math.max(30, Math.min(90, goalTarget));

    const cupTargets = {
      rookie: 4,
      professional: 5,
      veteran: 6,
      legendary: 7
    };

    const cupTarget = Math.max(
      3,
      cupTargets[selectedDifficulty] -
      (previous.mainAchieved ? 0 : 1)
    );

    const cupNames = {
      3: "third round",
      4: "fourth round",
      5: "fifth round",
      6: "quarter-finals",
      7: "semi-finals"
    };

    const outcomeExplanation = {
      stayed:
        "You remain in the same division, so your previous finish " +
        "provides the starting point for this forecast.",
      promoted:
        "Promotion brings a stronger level of opposition, so this " +
        "forecast starts conservatively.",
      relegated:
        "Relegation brings a rebuilding opportunity, so this forecast " +
        "allows for a stronger finish in your new division."
    };

    const forecastExplanation =
      `${outcomeExplanation[previous.outcome]} ` +
      `Your recorded transfer budget is ${formatBudget(progress.transferBudget)}, ` +
      `with a highest existing basic wage of ` +
      `${formatBudget(progress.highestWeeklyWage)} per week. ` +
      "The recruitment policies and your selected difficulty shape " +
      "the challenge. These remain provisional estimates; they are " +
      "not a validated FM24 simulation.";

    return {
      targetFinish: target,
      goalTarget,
      cupRoundTarget: cupTarget,
      mainObjective: {
        title: target === 1
          ? `Win ${progress.league}`
          : `Finish ${ordinal(target)} or higher`,
        description:
          `Finish ${ordinal(target)} or higher in the final regular-season ` +
          `${progress.league} table. Cup results and play-off results ` +
          "are recorded separately."
      },
      bonuses: [
        {
          title: `Reach the FA Cup ${cupNames[cupTarget]}`,
          description:
            `Reach at least the ${cupNames[cupTarget]} of the FA Cup.`
        },
        {
          title: `Score ${goalTarget} league goals`,
          description:
            `Score at least ${goalTarget} goals in the regular league ` +
            "season, excluding cups and play-offs."
        }
      ],
      prediction: {
        finish: forecast,
        beatTarget: forecast === 1
          ? "Match it: win the title"
          : `${ordinal(forecast - 1)} or higher`,
        explanation:
          forecastExplanation +
          (forecast === 1
            ? " First place is already the highest possible finish; " +
              "winning the title would match this forecast."
            : "")
      }
    };
  }

  function renderSeasonHistory() {
    const progress = getSeasonProgress();
    const container = byId("season-history-list");

    container.replaceChildren();
    byId("season-history").hidden = progress.history.length === 0;

    [...progress.history].reverse().forEach((entry) => {
      const card = document.createElement("article");
      card.className = "season-history-card";

      const heading = document.createElement("div");
      heading.className = "season-history-heading";

      heading.append(
        textElement(
          "h5",
          "",
          `Season ${entry.season} · ${entry.league}`
        ),
        textElement(
          "span",
          entry.mainAchieved
            ? "season-result-badge is-success"
            : "season-result-badge",
          entry.mainAchieved ? "Main objective achieved" : "Target missed"
        )
      );

      const outcomes = {
        stayed: "Stayed in the same division",
        promoted: "Promoted",
        relegated: "Relegated"
      };

      const bonusCount = entry.bonusResults.filter(
        (bonus) => bonus.achieved
      ).length;

      const predictionText = entry.predictionBeaten
        ? "Prediction beaten"
        : entry.finish === entry.predictedFinish
          ? "Prediction matched"
          : "Finished below the prediction";

      card.append(
        heading,
        textElement(
          "p",
          "season-history-details",
          `${ordinal(entry.finish)} of ${entry.leagueSize} · ` +
          `${entry.goals} league goals · ${outcomes[entry.outcome]}`
        ),
        textElement(
          "p",
          "season-history-details",
          `Main objective: ${entry.objectiveTitle}`
        ),
        textElement(
          "p",
          "season-history-details",
          `${bonusCount} of ${entry.bonusResults.length} bonuses achieved · ` +
          `${predictionText} (forecast: ${ordinal(entry.predictedFinish)})`
        )
      );

      container.append(card);
    });
  }

  function refreshSeasonLabels() {
    if (!selectedClub) {
      return;
    }

    const progress = getSeasonProgress();

    byId("briefing-season-label").textContent =
      progress.season <= 5
        ? `Season ${progress.season} of 5`
        : `Season ${progress.season} · Five-season milestone completed`;

    byId("briefing-league").textContent = progress.league;
    byId("club-league").textContent = progress.league;

    document.querySelector(
      ".policies-description"
    ).textContent =
      `Build your squad within these rules for Season ${progress.season}. ` +
      "Each policy applies to new transfer activity, not players " +
      "already at the club.";

    document.querySelector(
      ".season-heading .eyebrow"
    ).textContent = `Season ${progress.season}: your next chapter`;

    document.querySelector(
      ".prediction-badge"
    ).textContent = `Season ${progress.season} forecast`;

    byId("season-progress-title").textContent =
      `Finished Season ${progress.season}?`;

    renderSeasonHistory();
  }

  function objectiveTarget(challenge) {
    if (Number.isInteger(challenge.targetFinish)) {
      return challenge.targetFinish;
    }

    // Compatibility with the original Season 1 challenge data.
    const title = challenge.mainObjective.title;

    if (title === "Win the Championship") {
      return 1;
    }

    if (title === "Finish in the top two") {
      return 2;
    }

    if (title === "Finish in the top six") {
      return 6;
    }

    const match = title.match(/Finish (\d+)/);
    return match ? Number(match[1]) : null;
  }

  function bonusTargets(challenge) {
    const cupTargets = {
      rookie: 4,
      professional: 5,
      veteran: 6,
      legendary: 7
    };

    const goalMatch = challenge.bonuses[1]?.title.match(/Score (\d+)/);

    return {
      cup: challenge.cupRoundTarget || cupTargets[selectedDifficulty],
      goals: challenge.goalTarget ||
        (goalMatch ? Number(goalMatch[1]) : null)
    };
  }

  function openSeasonResults() {
    if (!currentCareerId) {
      byId("season-results-status").textContent =
        "Save and name this career before recording season results.";
      return;
    }

    const progress = getSeasonProgress();
    const form = byId("season-results-form");

    form.reset();

    form.elements.namedItem("completedLeagueSize").value =
      progress.leagueSize;

    form.elements.namedItem("completedLeagueSize").readOnly = true;

    form.elements.namedItem("leagueFinish").max =
      progress.leagueSize;

    form.elements.namedItem("nextLeague").value = progress.league;
    form.elements.namedItem("nextLeagueSize").value =
      progress.leagueSize;
    form.elements.namedItem("currency").value = progress.currency;

    updateSeasonResultFields();
    byId("season-results-status").textContent = "";
    form.hidden = false;
    form.elements.namedItem("leagueFinish").focus();
  }

  function restoreMap(map, snapshot) {
    map.clear();
    snapshot.forEach((value, key) => map.set(key, value));
  }

  byId("open-season-results-button").addEventListener(
    "click",
    openSeasonResults
  );

  byId("cancel-season-results-button").addEventListener("click", () => {
    byId("season-results-form").hidden = true;
    byId("season-results-status").textContent = "";
    byId("open-season-results-button").focus();
  });

  byId("season-results-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const form = byId("season-results-form");
    const status = byId("season-results-status");

    if (!form.reportValidity() || !selectedClub || !currentCareerId) {
      status.textContent = "Save this career and complete the result fields.";
      return;
    }

    const data = new FormData(form);
    const progress = getSeasonProgress();
    const currentChallenge = getSeasonChallenge();
    const modern = currentChallenge.model === "league-relative-v1";
    const matches = modern ? Number(data.get("leagueMatches")) : null;
    const goalsConceded = modern ? Number(data.get("leagueGoalsConceded")) : null;

    const finish = Number(data.get("leagueFinish"));
    const leagueSize = Number(data.get("completedLeagueSize"));
    const goals = Number(data.get("leagueGoals"));
    const cupRound = modern ? 0 : Number(data.get("faCupRound"));
    const outcome = String(data.get("leagueOutcome"));
    const nextLeague = String(data.get("nextLeague")).trim();
    const nextLeagueSize = Number(data.get("nextLeagueSize"));
    const currency = String(data.get("currency"));
    const transferBudget = Number(data.get("transferBudget"));
    const highestWeeklyWage = Number(data.get("highestWeeklyWage"));

    const valid = (
      Number.isInteger(finish) &&
      finish >= 1 &&
      finish <= progress.leagueSize &&
      leagueSize === progress.leagueSize &&
      Number.isInteger(goals) &&
      goals >= 0 &&
      goals <= 1000 &&
      (!modern || (Number.isInteger(matches) && matches >= 1 && matches <= 200 &&
        Number.isInteger(goalsConceded) && goalsConceded >= 0 && goalsConceded <= 1000)) &&
      [0, 3, 4, 5, 6, 7, 8, 9].includes(cupRound) &&
      ["stayed", "promoted", "relegated"].includes(outcome) &&
      nextLeague.length > 0 &&
      nextLeague.length <= 80 &&
      Number.isInteger(nextLeagueSize) &&
      nextLeagueSize >= 2 &&
      nextLeagueSize <= 60 &&
      ["GBP", "EUR", "USD"].includes(currency) &&
      Number.isSafeInteger(transferBudget) &&
      transferBudget >= 0 &&
      Number.isSafeInteger(highestWeeklyWage) &&
      highestWeeklyWage >= 0
    );

    if (!valid) {
      status.textContent =
        "Check the league position, league sizes, results, and budget figures.";
      return;
    }

    if (
      outcome === "stayed" &&
      nextLeague.toLowerCase() !== progress.league.toLowerCase()
    ) {
      status.textContent =
        "You selected the same division. Keep its league name, " +
        "or choose promotion or relegation.";
      return;
    }

    const challenge = getSeasonChallenge();
    const target = objectiveTarget(challenge);
    const bonuses = bonusTargets(challenge);

    if (target === null || (!modern && bonuses.goals === null)) {
      status.textContent =
        "The current objectives could not be assessed. No progress was changed.";
      return;
    }

    const completedSeason = {
      season: progress.season,
      league: progress.league,
      leagueSize,
      finish,
      goals,
      matches,
      goalsConceded,
      cupRound,
      outcome,
      mainAchieved: finish <= target,
      objectiveTitle: challenge.mainObjective.title,
      predictedFinish: challenge.prediction.finish,
      predictionBeaten: finish < challenge.prediction.finish,
      bonusResults: [
        {
          title: challenge.bonuses[0].title,
          achieved: modern ? goals - goalsConceded >= currentChallenge.goalDifferenceTarget : cupRound >= bonuses.cup
        },
        {
          title: challenge.bonuses[1].title,
          achieved: modern ? goals + 1e-9 >= matches * currentChallenge.goalRate : goals >= bonuses.goals
        }
      ],
      policies: structuredClone(getPolicies()),
      challenge: structuredClone(challenge),
      squad: structuredClone(getSquad()),
      formation: hasClubBriefing() ? "4-2-3-1" : null,
      recordedAt: new Date().toISOString()
    };

    const oldProgress = structuredClone(progress);
    const oldPolicies = new Map(savedPolicySets);
    const oldChallenges = new Map(savedSeasonChallenges);

    seasonProgress = {
      season: progress.season + 1,
      league: nextLeague,
      leagueSize: nextLeagueSize,
      currency,
      transferBudget,
      highestWeeklyWage,
      history: [...progress.history, completedSeason]
    };

    // Generate the new season before saving its snapshot.
    getPolicies();
    getSeasonChallenge();

    if (!persistActiveCareer()) {
      seasonProgress = oldProgress;
      restoreMap(savedPolicySets, oldPolicies);
      restoreMap(savedSeasonChallenges, oldChallenges);

      status.textContent =
        "The new season could not be saved. Your previous season " +
        "remains active. Keep the page open and try again.";
      return;
    }

    form.hidden = true;
    lastRemoval = null;

    if (hasClubBriefing()) renderTactics();
    renderPolicies();
    renderSeasonChallenge();
    refreshSeasonLabels();

    const milestone = seasonProgress.history.length === 5
      ? " Five seasons completed — you can keep the career going."
      : "";

    status.textContent =
      `Season ${completedSeason.season} recorded. ` +
      `Season ${seasonProgress.season} unlocked and saved.${milestone}`;

    announce(status.textContent);
    byId("open-season-results-button").focus({ preventScroll: true });
  });

  // Keep the labels and history current when changing tabs.
  ["tactics", "squad", "policies", "season"].forEach((tab) => {
    byId(`${tab}-tab-button`).addEventListener(
      "click",
      refreshSeasonLabels
    );
  });

  initialiseClubPool();
})();
// FM24 squad export preview. Separate from saved careers.
(() => {
  const attributeFields = [
    ["Acc", "Acceleration"], ["Agi", "Agility"],
    ["Aer", "Aerial Reach"], ["Agg", "Aggression"],
    ["Ant", "Anticipation"], ["Bal", "Balance"],
    ["Bra", "Bravery"], ["Cmd", "Command of Area"],
    ["Com", "Communication"], ["Cmp", "Composure"],
    ["Cnt", "Concentration"], ["Cro", "Crossing"],
    ["Dec", "Decisions"], ["Det", "Determination"],
    ["Dri", "Dribbling"], ["Fin", "Finishing"],
    ["Fir", "First Touch"], ["Fla", "Flair"],
    ["Han", "Handling"], ["Hea", "Heading"],
    ["Jum", "Jumping Reach"], ["Kic", "Kicking"],
    ["Ldr", "Leadership"], ["Lon", "Long Shots"],
    ["Mar", "Marking"], ["Nat", "Natural Fitness"],
    ["OtB", "Off the Ball"], ["1v1", "One on Ones"],
    ["Pac", "Pace"], ["Pas", "Passing"],
    ["Pos", "Positioning"], ["Ref", "Reflexes"],
    ["TRO", "Rushing Out (Tendency)"], ["Sta", "Stamina"],
    ["Str", "Strength"], ["Tck", "Tackling"],
    ["Tea", "Teamwork"], ["Tec", "Technique"],
    ["Thr", "Throwing"], ["Vis", "Vision"],
    ["Wor", "Work Rate"]
  ];

  const clean = (value) => String(value ?? "")
    .replace(/\s+/g, " ").trim();

  const normalise = (value) => clean(value).toLowerCase();

  const validAttribute = (value) =>
    /^\d+$/.test(clean(value)) &&
    Number(value) >= 1 &&
    Number(value) <= 20;

  function readSquadRows(headers, rows) {
    if (!rows.length || rows.length > 2000) {
      throw new Error(
        "The export must contain between 1 and 2,000 players."
      );
    }

    if (rows.some((row) => row.length !== headers.length)) {
      throw new Error(
        "Some rows have missing columns. Please export again."
      );
    }

    const headings = headers.map(normalise);
    const metadata = {};

    [
      "Player", "UID", "Age", "Position",
      "Club", "Wage", "Preferred Foot"
    ].forEach((label) => {
      const index = headings.indexOf(normalise(label));

      if (index < 0) {
        throw new Error(
          `Add the ${label} column to your FM view and export again.`
        );
      }

      metadata[label] = index;
    });

    const missing = [];

    const attributeColumns = attributeFields.map(([short, name]) => {
      const aliases = [short, name].map(normalise);

      if (short === "TRO") {
        aliases.push("rushing out");
      }

      const matches = headings.flatMap((heading, index) =>
        aliases.includes(heading) ? [index] : []
      );

      if (!matches.length) {
        missing.push(name);
      }

      // FM uses "Nat" for nationality AND Natural Fitness.
      const index = matches.find((candidate) =>
        rows.some((row) => validAttribute(row[candidate]))
      ) ?? matches.at(-1);

      return { name, index };
    });

    if (missing.length) {
      throw new Error(
        `Missing attributes: ${missing.join(", ")}. ` +
        "Add these to your FM view and export again."
      );
    }

    const seenIds = new Set();

    return rows.map((row, rowIndex) => {
      const get = (label) => clean(row[metadata[label]]);

      const name = get("Player")
        .replace(/\s+-\s+Pick Player$/i, "")
        .trim();

      const uid = get("UID");
      const ageText = get("Age");
      const age = Number(ageText);

      if (!name || !uid || !get("Position") || !get("Club")) {
        throw new Error(
          `Player row ${rowIndex + 1} is missing a name, ` +
          "ID, position or club."
        );
      }

      if (seenIds.has(uid)) {
        throw new Error(
          `Duplicate player ID for ${name}. ` +
          "Export each player once."
        );
      }

      seenIds.add(uid);

      if (!/^\d+$/.test(ageText) || age < 10 || age > 80) {
        throw new Error(
          `${name} has a missing or invalid age.`
        );
      }

      const attributes = {};

      attributeColumns.forEach(({ name: attribute, index }) => {
        if (!validAttribute(row[index])) {
          throw new Error(
            `${name}: ${attribute} needs a visible value ` +
            "from 1 to 20. Check the FM export view."
          );
        }

        attributes[attribute] = Number(row[index]);
      });

      return {
        uid,
        name,
        age,
        attributes,
        positions: get("Position"),
        club: get("Club"),
        wage: get("Wage"),
        preferredFoot: get("Preferred Foot")
      };
    });
  }

  function parseSquadExport(html) {
    const template = document.createElement("template");
    template.innerHTML = html;

    const table = Array.from(
      template.content.querySelectorAll("table")
    ).find((candidate) => {
      const labels = Array.from(
        candidate.querySelectorAll("th")
      ).map((cell) => normalise(cell.textContent));

      return labels.includes("player") && labels.includes("uid");
    });

    if (!table) {
      throw new Error(
        "No FM squad table found. Choose the HTML squad export, " +
        "not a saved website page."
      );
    }

    const headers = Array.from(
      table.querySelectorAll("th")
    ).map((cell) => clean(cell.textContent));

    const rows = Array.from(table.querySelectorAll("tr"))
      .filter((row) => !row.querySelector("th"))
      .map((row) =>
        Array.from(row.querySelectorAll("td"))
          .map((cell) => clean(cell.textContent))
      )
      .filter((row) => row.length);

    return readSquadRows(headers, rows);
  }

  function makeElement(tag, text, className = "") {
    const element = document.createElement(tag);
    element.textContent = text;
    element.className = className;
    return element;
  }

  function showImportPreview(players) {
    const container = document.getElementById(
      "squad-import-players"
    );

    container.replaceChildren();

    const clubs = [
      ...new Set(players.map((player) => player.club))
    ];

    document.getElementById("squad-import-summary").textContent =
      `${players.length} players · ${clubs.join(", ")}`;

    players.forEach((player) => {
      const card = document.createElement("details");
      card.className = "squad-group";

      card.append(
        makeElement(
          "summary",
          `${player.name} · Age ${player.age} · ${player.positions}`,
          "squad-player-name"
        )
      );

      card.append(
        makeElement(
          "p",
          `${player.club} · ` +
          `${player.preferredFoot || "Foot not supplied"} · ` +
          `${player.wage || "Wage not supplied"}`
        )
      );

      card.append(
        makeElement(
          "p",
          `FM player ID: ${player.uid}`,
          "signing-note"
        )
      );

      const table = document.createElement("table");
      table.className = "squad-table";
      table.setAttribute(
        "aria-label",
        `${player.name} attributes`
      );

      const head = document.createElement("thead");
      const heading = document.createElement("tr");

      ["Attribute", "Out of 20"].forEach((label) => {
        const cell = makeElement("th", label);
        cell.scope = "col";
        heading.append(cell);
      });

      head.append(heading);

      const body = document.createElement("tbody");

      Object.entries(player.attributes).forEach(([name, value]) => {
        const row = document.createElement("tr");

        row.append(
          makeElement("td", name),
          makeElement("td", value)
        );

        body.append(row);
      });

      table.append(head, body);
      card.append(table);
      container.append(card);
    });

    document.getElementById("squad-import-preview").hidden = false;
  }
  // Saved squad exports are separate from careers.
  const squadImportStorageKey = "fm-challenge-lab-squad-exports-v1";

  let savedSquadImports = [];
  let currentImportedPlayers = null;
  let currentSavedImportId = null;
  let squadImportStorageReady = true;

  const importSaveForm = document.getElementById(
    "save-squad-import-form"
  );

  const importSaveButton = document.getElementById(
    "save-squad-import-button"
  );

  const savedImportSection = document.getElementById(
    "saved-squad-imports"
  );

  const savedImportList = document.getElementById(
    "saved-squad-import-list"
  );

  function importNotice(message) {
    document.getElementById("squad-import-status").textContent =
      message;
  }

  function validGameDate(value) {
    if (
      typeof value !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      return false;
    }

    const date = new Date(`${value}T00:00:00Z`);

    return Number.isFinite(date.getTime()) &&
      date.toISOString().slice(0, 10) === value;
  }

  function validateSavedSquadImport(record) {
    if (
      !record ||
      typeof record !== "object" ||
      typeof record.id !== "string" ||
      !record.id.trim() ||
      !["clubName", "leagueName"].every((field) =>
        typeof record[field] === "string" &&
        record[field].trim().length > 0 &&
        record[field].length <= 80
      ) ||
      !validGameDate(record.gameDate) ||
      typeof record.savedAt !== "string" ||
      !Number.isFinite(Date.parse(record.savedAt)) ||
      !Array.isArray(record.players)
    ) {
      throw new Error("A saved squad export is incomplete.");
    }

    const headers = [
      "Player",
      "UID",
      "Age",
      "Position",
      "Club",
      "Wage",
      "Preferred Foot",
      ...attributeFields.map(([, name]) => name)
    ];

    const rows = record.players.map((player) => {
      if (
        !player ||
        !player.attributes ||
        typeof player.attributes !== "object" ||
        ![
          "name", "uid", "positions",
          "club", "wage", "preferredFoot"
        ].every((field) => typeof player[field] === "string") ||
        !Number.isInteger(player.age) ||
        !attributeFields.every(([, name]) =>
          Number.isInteger(player.attributes[name]) &&
          player.attributes[name] >= 1 &&
          player.attributes[name] <= 20
        )
      ) {
        throw new Error(
          "A saved player has missing details or attributes."
        );
      }

      return [
        player.name,
        player.uid,
        player.age,
        player.positions,
        player.club,
        player.wage,
        player.preferredFoot,
        ...attributeFields.map(([, name]) =>
          player.attributes[name]
        )
      ];
    });

    return {
      id: record.id,
      clubName: record.clubName.trim(),
      leagueName: record.leagueName.trim(),
      gameDate: record.gameDate,
      savedAt: record.savedAt,
      players: readSquadRows(headers, rows)
    };
  }

  function readSavedSquadImports() {
    try {
      const raw = localStorage.getItem(squadImportStorageKey);

      if (raw === null) {
        return;
      }

      const data = JSON.parse(raw);

      if (
        !data ||
        data.version !== 1 ||
        !Array.isArray(data.exports)
      ) {
        throw new Error(
          "The saved export format is not recognised."
        );
      }

      const checked = data.exports.map(validateSavedSquadImport);

      if (
        new Set(checked.map((record) => record.id)).size !==
        checked.length
      ) {
        throw new Error("Duplicate saved export IDs.");
      }

      savedSquadImports = checked;
    } catch (error) {
      squadImportStorageReady = false;

      importNotice(
        "Saved squad exports could not be loaded. " +
        "You can still preview HTML files. " +
        "Saving is disabled to protect existing data."
      );
    }
  }

  function resetSquadImportSave() {
    currentImportedPlayers = null;
    currentSavedImportId = null;
    updateLeagueRatingAction();

    if (!importSaveForm || !importSaveButton) return;

    importSaveForm.reset();
    importSaveForm.hidden = true;
    importSaveButton.disabled = true;
    importSaveButton.textContent = "Save Squad Export";
  }
  function prepareSquadImportSave(players, record = null) {
    if (!importSaveForm || !importSaveButton) return;

    currentImportedPlayers = structuredClone(players);
    currentSavedImportId = record?.id ?? null;

    const clubs = [...new Set(
      players.map((player) => player.club)
    )];

    importSaveForm.reset();

    importSaveForm.elements.namedItem("clubName").value =
      record?.clubName ?? (clubs.length === 1 ? clubs[0] : "");

    importSaveForm.elements.namedItem("leagueName").value =
      record?.leagueName ?? "";

    importSaveForm.elements.namedItem("gameDate").value =
      record?.gameDate ?? "";

    importSaveForm.hidden = false;
    importSaveButton.disabled = !squadImportStorageReady;

    importSaveButton.textContent = record
      ? "Update Saved Export"
      : "Save Squad Export";

    updateLeagueRatingAction();
  }

  function renderSavedSquadImports() {
    if (!savedImportList || !savedImportSection) {
      return;
    }

    savedImportList.replaceChildren();
    savedImportSection.hidden = savedSquadImports.length === 0;

    [...savedSquadImports]
      .sort((a, b) => b.savedAt.localeCompare(a.savedAt))
      .forEach((record) => {
        const card = document.createElement("section");
        card.className = "squad-group";

        const date = new Date(`${record.gameDate}T00:00:00Z`)
          .toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "UTC"
          });

        card.append(makeElement("h4", record.clubName));

        card.append(
          makeElement(
            "p",
            `${record.leagueName} · ${date} · ` +
            `${record.players.length} players`
          )
        );

        const open = makeElement(
          "button",
          "Open Saved Export",
          "button button-secondary"
        );

        open.type = "button";

        open.setAttribute(
          "aria-label",
          `Open ${record.clubName}, ${date} squad export`
        );

        open.addEventListener("click", () => {
          readVersion++;
          input.value = "";

          clearPreview();
          showImportPreview(record.players);
          prepareSquadImportSave(record.players, record);

          importNotice(
            `${record.clubName} export opened: ` +
            `${record.players.length} players with all 41 attributes. ` +
            "This squad export is separate from your current career."
          );

          document.getElementById("squad-import-summary")
            .scrollIntoView({ block: "nearest" });
        });

        card.append(open);
        savedImportList.append(card);
      });
  }

  if (
    importSaveForm &&
    importSaveButton &&
    savedImportSection &&
    savedImportList
  ) {
    readSavedSquadImports();
    renderSavedSquadImports();

    importSaveForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (
        !currentImportedPlayers ||
        !importSaveForm.reportValidity()
      ) {
        return;
      }

      if (!squadImportStorageReady) {
        importNotice(
          "Saving is unavailable. " +
          "Your existing stored data has been preserved."
        );
        return;
      }

      const field = (name) =>
        clean(importSaveForm.elements.namedItem(name).value);

      let record;

      try {
        record = validateSavedSquadImport({
          id: currentSavedImportId ?? crypto.randomUUID(),
          clubName: field("clubName"),
          leagueName: field("leagueName"),
          gameDate: field("gameDate"),
          savedAt: new Date().toISOString(),
          players: currentImportedPlayers
        });

        const next = savedSquadImports.filter(
          (item) => item.id !== record.id
        );

        next.push(record);

        localStorage.setItem(
          squadImportStorageKey,
          JSON.stringify({ version: 1, exports: next })
        );

        savedSquadImports = next;
      } catch (error) {
        importNotice(
          "The squad export could not be saved. " +
          "Check the club, league and date. " +
          "Your browser must allow storage and have free space. " +
          "Existing exports are unchanged."
        );
        return;
      }

      currentSavedImportId = record.id;
      importSaveButton.textContent = "Update Saved Export";

      renderSavedSquadImports();

      importNotice(
        `${record.clubName} squad export saved in this browser. ` +
        "You can reopen it after a refresh. " +
        "It has not been attached to a career yet."
      );
    });
  }
    // Custom attribute-based estimates, not FM's official ability formula.
  const leagueCacheKey = "fm-challenge-lab-league-comparisons-v1";
  const leagueForm = document.getElementById("league-comparison-form");
  const leagueFileInput = document.getElementById("league-comparison-file");
  const leagueSaveButton = document.getElementById("save-league-comparison-button");
  const leagueStatus = document.getElementById("league-comparison-status");
  const leagueList = document.getElementById("league-comparison-list");
  const leagueRateButton = document.getElementById("rate-imported-squad-button");
  const leagueRatingSummary = document.getElementById("league-rating-summary");
  let leagueReferences = [];
  let pendingLeaguePlayers = null;
  let leagueCacheReady = true;
  let leagueFileVersion = 0;
  let selectedLeagueReferenceId = null;

  function readAttributeRange(value) {
    const text = clean(value);
    if (["", "-", "–", "—"].includes(text)) return null;
    if (validAttribute(text)) {
      return { low: Number(text), high: Number(text) };
    }
    const match = text.match(/^(\d+)\s*[-–—]\s*(\d+)$/);
    if (match && Number(match[1]) >= 1 &&
        Number(match[2]) <= 20 && Number(match[1]) <= Number(match[2])) {
      return { low: Number(match[1]), high: Number(match[2]) };
    }
    throw new Error(`Unrecognised attribute value: ${text}`);
  }

  function validateLeaguePlayers(players) {
    if (!Array.isArray(players) || !players.length || players.length > 20000) {
      throw new Error("The comparison must contain between 1 and 20,000 players.");
    }
    const seen = new Set();
    return players.map((player) => {
      if (!player || !["uid", "name", "club", "positions"].every((key) =>
        typeof player[key] === "string" && player[key].trim()
      ) || !Number.isInteger(player.age) || player.age < 10 || player.age > 80 ||
        !player.attributes || typeof player.attributes !== "object") {
        throw new Error("A comparison player has missing details.");
      }
      if (seen.has(player.uid)) throw new Error("Duplicate player IDs in the comparison.");
      seen.add(player.uid);
      const attributes = {};
      attributeFields.forEach(([, name]) => {
        const value = player.attributes[name];
        if (value === null) {
          attributes[name] = null;
        } else if (value && Number.isInteger(value.low) &&
            Number.isInteger(value.high) && value.low >= 1 &&
            value.high <= 20 && value.low <= value.high) {
          attributes[name] = { low: value.low, high: value.high };
        } else {
          throw new Error(`Invalid comparison attribute: ${name}`);
        }
      });
      return { uid: player.uid, name: player.name, club: player.club,
        positions: player.positions, age: player.age, attributes };
    });
  }

  function readLeagueRows(headers, rows) {
    const labels = headers.map(normalise);
    const column = (names) => labels.findIndex((label) =>
      names.map(normalise).includes(label));
    const fields = {
      name: column(["Name", "Player"]), uid: column(["UID"]),
      club: column(["Club"]), age: column(["Age"]),
      positions: column(["Position"])
    };
    if (Object.values(fields).some((index) => index < 0)) {
      throw new Error("Include Name/Player, UID, Club, Age and Position in the league view.");
    }
    const data = rows.filter((row) => row.some((value) => clean(value)));
    if (data.some((row) => row.length !== headers.length)) {
      throw new Error("Some comparison rows have missing columns.");
    }
    const columns = attributeFields.map(([short, name]) => {
      const aliases = [short, name].map(normalise);
      if (short === "TRO") aliases.push("rushing out");
      const matches = labels.flatMap((label, index) => aliases.includes(label) ? [index] : []);
      if (!matches.length) throw new Error(`Missing comparison column: ${name}`);
      const index = matches.find((candidate) => data.some((row) => {
        try { return readAttributeRange(row[candidate]) !== null; }
        catch (error) { return false; }
      })) ?? matches.at(-1);
      return { name, index };
    });
    return validateLeaguePlayers(data.map((row) => {
      const attributes = {};
      columns.forEach(({ name, index }) => {
        attributes[name] = readAttributeRange(row[index]);
      });
      return {
        name: clean(row[fields.name]).replace(/\s+-\s+Pick Player$/i, ""),
        uid: clean(row[fields.uid]), club: clean(row[fields.club]),
        age: Number(clean(row[fields.age])),
        positions: clean(row[fields.positions]), attributes
      };
    }));
  }

  function parseLeagueExport(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    const table = Array.from(template.content.querySelectorAll("table")).find((item) => {
      const headings = Array.from(item.querySelectorAll("th")).map((cell) => normalise(cell.textContent));
      return headings.includes("uid") && (headings.includes("name") || headings.includes("player"));
    });
    if (!table) throw new Error("No player-search export table found.");
    const headers = Array.from(table.querySelectorAll("th")).map((cell) => clean(cell.textContent));
    const rows = Array.from(table.querySelectorAll("tr"))
      .filter((row) => !row.querySelector("th"))
      .map((row) => Array.from(row.querySelectorAll("td")).map((cell) => clean(cell.textContent)))
      .filter((row) => row.length);
    return readLeagueRows(headers, rows);
  }

  function leagueIdentity(name, date) {
    return `${normalise(name)}|${date}`;
  }

  function validateLeagueReference(record) {
    if (!record || typeof record.id !== "string" || !record.id.trim() ||
        typeof record.leagueName !== "string" || !record.leagueName.trim() ||
        record.leagueName.length > 80 || !validGameDate(record.gameDate) ||
        typeof record.savedAt !== "string" || !Number.isFinite(Date.parse(record.savedAt))) {
      throw new Error("Invalid saved league comparison.");
    }
    return { id: record.id, leagueName: record.leagueName.trim(),
      gameDate: record.gameDate, savedAt: record.savedAt,
      players: validateLeaguePlayers(record.players) };
  }

  function renderLeagueReferences() {
    if (!leagueList) return;
    leagueList.replaceChildren();
    [...leagueReferences].sort((a, b) => b.savedAt.localeCompare(a.savedAt)).forEach((record) => {
      const card = document.createElement("section");
      card.className = "squad-group";
      const clubs = new Set(record.players.map((player) => normalise(player.club))).size;
      card.append(makeElement("h4", record.leagueName));
      card.append(makeElement("p", `${record.gameDate} · ${record.players.length} players · ${clubs} clubs`));
      const use = makeElement("button", "Open Comparison", "button button-secondary");
      use.type = "button";
      use.addEventListener("click", () => {
        leagueFileVersion++;
        leagueFileInput.value = "";
        pendingLeaguePlayers = structuredClone(record.players);
        leagueForm.elements.namedItem("leagueName").value = record.leagueName;
        leagueForm.elements.namedItem("gameDate").value = record.gameDate;
        selectedLeagueReferenceId = record.id;
        leagueSaveButton.disabled = !leagueCacheReady;
        leagueStatus.textContent = "Comparison opened. Open a squad export with the same league and date to estimate ratings.";
        updateLeagueRatingAction();
      });
      card.append(use);
      leagueList.append(card);
    });
  }

  if (leagueForm && leagueFileInput && leagueSaveButton && leagueStatus && leagueList) {
    try {
      const raw = localStorage.getItem(leagueCacheKey);
      if (raw !== null) {
        const data = JSON.parse(raw);
        if (!data || data.version !== 1 || !Array.isArray(data.comparisons)) {
          throw new Error("Unrecognised saved comparisons.");
        }
        const checked = data.comparisons.map(validateLeagueReference);
        if (new Set(checked.map((record) => record.id)).size !== checked.length ||
            new Set(checked.map((record) => leagueIdentity(record.leagueName, record.gameDate))).size !== checked.length) {
          throw new Error("Duplicate saved comparisons.");
        }
        leagueReferences = checked;
      }
      renderLeagueReferences();
    } catch (error) {
      leagueCacheReady = false;
      leagueStatus.textContent = "Saved comparisons could not be loaded. Saving is disabled to protect existing data.";
    }

    leagueFileInput.addEventListener("change", async () => {
      const file = leagueFileInput.files?.[0];
      if (!file) return;
      const version = ++leagueFileVersion;
      pendingLeaguePlayers = null;
      selectedLeagueReferenceId = null;
      updateLeagueRatingAction();
      leagueSaveButton.disabled = true;
      leagueStatus.textContent = "Reading the league export…";
      try {
        if (!/\.html?$/i.test(file.name) || file.size > 10 * 1024 * 1024) {
          throw new Error("Choose an HTML export smaller than 10 MB.");
        }
        const html = await file.text();
        if (version !== leagueFileVersion) return;
        pendingLeaguePlayers = parseLeagueExport(html);
        const clubs = new Set(pendingLeaguePlayers.map((player) => normalise(player.club))).size;
        leagueSaveButton.disabled = !leagueCacheReady;
        leagueStatus.textContent = `${pendingLeaguePlayers.length} players from ${clubs} clubs loaded. Ranges and hidden values are preserved. Enter the league and date, then save the comparison.`;
      } catch (error) {
        if (version !== leagueFileVersion) return;
        pendingLeaguePlayers = null;
        leagueFileInput.value = "";
        leagueStatus.textContent = error instanceof Error ? error.message : "The comparison could not be read.";
      }
    });

    leagueForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!pendingLeaguePlayers || !leagueForm.reportValidity() || !leagueCacheReady) return;
      try {
        const leagueName = clean(leagueForm.elements.namedItem("leagueName").value);
        const gameDate = clean(leagueForm.elements.namedItem("gameDate").value);
        const key = leagueIdentity(leagueName, gameDate);

        const existing = leagueReferences.find((item) =>
          item.id === selectedLeagueReferenceId
        ) ?? leagueReferences.find((item) =>
          leagueIdentity(item.leagueName, item.gameDate) === key
        );

        const conflict = leagueReferences.some((item) =>
          item.id !== existing?.id &&
          leagueIdentity(item.leagueName, item.gameDate) === key
        );

        if (conflict) {
          leagueStatus.textContent =
            "A comparison is already saved for this league and date. Open that comparison to use or update it.";
          return;
        }

        const record = validateLeagueReference({
          id: existing?.id ?? crypto.randomUUID(),
          leagueName,
          gameDate,
          savedAt: new Date().toISOString(),
          players: pendingLeaguePlayers
        });

        const next = leagueReferences.filter((item) =>
          item.id !== record.id
        );

        next.push(record);
        localStorage.setItem(leagueCacheKey, JSON.stringify({ version: 1, comparisons: next }));
        leagueReferences = next;
        selectedLeagueReferenceId = record.id;
        renderLeagueReferences();
        updateLeagueRatingAction();
        leagueStatus.textContent = `${record.leagueName} comparison saved for ${record.gameDate}. Open your matching squad export to show estimated ratings.`;
      } catch (error) {
        leagueStatus.textContent = "The comparison could not be saved. Check the league and date, and that browser storage has free space. Existing saved comparisons are unchanged.";
      }
    });
  }

  const leagueRatingProfiles = {
    goalkeeper: {
      label: "Goalkeeper",
      weights: {
        Reflexes: 3, Handling: 2, "One on Ones": 2,
        "Aerial Reach": 1.5, "Command of Area": 1.5,
        Communication: 1, Decisions: 1, Positioning: 1,
        Agility: 1, Concentration: 1
      }
    },
    centreBack: {
      label: "Centre-back",
      weights: {
        Acceleration: 1, Pace: 1, "Jumping Reach": 2,
        Strength: 1.5, Marking: 2, Tackling: 2,
        Positioning: 2, Anticipation: 1.5, Decisions: 1,
        Composure: 1, Heading: 1.5, Concentration: 1.5
      }
    },
    fullBack: {
      label: "Full-back / wing-back",
      weights: {
        Acceleration: 2, Pace: 2, Stamina: 1.5,
        "Work Rate": 1.5, Positioning: 1.5,
        Tackling: 1.5, Anticipation: 1, Crossing: 1,
        Passing: 1, Technique: 0.5, Dribbling: 1
      }
    },
    defensiveMidfielder: {
      label: "Defensive midfielder",
      weights: {
        Passing: 1.5, Decisions: 2, Positioning: 2,
        Anticipation: 1.5, Tackling: 1.5, Teamwork: 1,
        "Work Rate": 1.5, Stamina: 1, Strength: 0.5,
        Composure: 1, Vision: 1, "First Touch": 1
      }
    },
    centralMidfielder: {
      label: "Central midfielder",
      weights: {
        Passing: 2, Vision: 2, Decisions: 2,
        "First Touch": 1.5, Technique: 1.5,
        Stamina: 1.5, "Work Rate": 1, Teamwork: 1,
        Anticipation: 1, Positioning: 0.5, Composure: 1
      }
    },
    attackingMidfielder: {
      label: "Attacking midfielder",
      weights: {
        Vision: 2, Passing: 2, Technique: 2,
        "First Touch": 1.5, Dribbling: 1.5,
        "Off the Ball": 1.5, Decisions: 1.5,
        Acceleration: 1, Pace: 1, Composure: 1, Flair: 1
      }
    },
    winger: {
      label: "Wide midfielder / winger",
      weights: {
        Acceleration: 2, Pace: 2, Dribbling: 2,
        Technique: 1.5, "First Touch": 1,
        Crossing: 1.5, "Off the Ball": 1.5,
        Decisions: 1, Finishing: 1, Stamina: 1
      }
    },
    striker: {
      label: "Striker",
      weights: {
        Acceleration: 1.5, Pace: 1.5, Finishing: 2,
        "Off the Ball": 2, Anticipation: 1.5,
        Composure: 1.5, "First Touch": 1,
        Heading: 0.75, Strength: 0.75, Balance: 0.5,
        Decisions: 1, "Work Rate": 1
      }
    }
  };

  function leaguePositionGroups(positions) {
    const text = positions.toUpperCase();

    if (/\bGK\b/.test(text)) return ["goalkeeper"];

    const groups = new Set();

    if (/\bDM\b/.test(text)) {
      groups.add("defensiveMidfielder");
    }

    if (/\bST\b/.test(text)) {
      groups.add("striker");
    }

    const pattern =
      /\b((?:DM|AM|WB|ST|D|M)(?:\/(?:DM|AM|WB|ST|D|M))*)\s*\(([RLC]+)\)/g;

    for (const match of text.matchAll(pattern)) {
      const roles = match[1].split("/");
      const central = match[2].includes("C");
      const wide = /[RL]/.test(match[2]);

      if (roles.includes("D") && central) {
        groups.add("centreBack");
      }

      if (
        (roles.includes("D") && wide) ||
        roles.includes("WB")
      ) {
        groups.add("fullBack");
      }

      if (roles.includes("M") && central) {
        groups.add("centralMidfielder");
      }

      if (roles.includes("AM") && central) {
        groups.add("attackingMidfielder");
      }

      if (
        wide &&
        (roles.includes("AM") || roles.includes("M"))
      ) {
        groups.add("winger");
      }
    }

    return [...groups];
  }

  function weightedLeagueRange(attributes, profile) {
    let low = 0;
    let high = 0;
    let observed = 0;
    let total = 0;

    Object.entries(profile.weights).forEach(([name, weight]) => {
      const value = attributes[name];
      total += weight;

      if (value !== null && value !== undefined) {
        low += value.low * weight;
        high += value.high * weight;
        observed += weight;
      } else {
        low += weight;
        high += 20 * weight;
      }
    });

    return {
      low: low / total,
      high: high / total,
      coverage: observed / total
    };
  }

  function mergeLeagueAndSquad(reference, squad) {
    const merged = new Map(
      reference.map((player) => [player.uid, player])
    );

    squad.forEach((player) => {
      const attributes = {};

      attributeFields.forEach(([, name]) => {
        attributes[name] = {
          low: player.attributes[name],
          high: player.attributes[name]
        };
      });

      merged.set(player.uid, {
        uid: player.uid,
        name: player.name,
        club: player.club,
        age: player.age,
        positions: player.positions,
        attributes
      });
    });

    return [...merged.values()];
  }

  function estimateLeaguePlayer(player, pool) {
    const estimates = [];
    const ownAttributes = {};

    attributeFields.forEach(([, name]) => {
      ownAttributes[name] = {
        low: player.attributes[name],
        high: player.attributes[name]
      };
    });

    leaguePositionGroups(player.positions).forEach((group) => {
      const profile = leagueRatingProfiles[group];
      const own = weightedLeagueRange(ownAttributes, profile);

      const peers = pool
        .filter((candidate) =>
          candidate.uid !== player.uid &&
          candidate.age >= 18 &&
          leaguePositionGroups(candidate.positions).includes(group)
        )
        .map((candidate) => ({
          club: normalise(candidate.club),
          range: weightedLeagueRange(candidate.attributes, profile)
        }))
        .filter((candidate) => candidate.range.coverage >= 0.75);

      const byClub = new Map();

      peers.forEach((peer) => {
        byClub.set(
          peer.club,
          (byClub.get(peer.club) ?? 0) + 1
        );
      });

      if (peers.length < 8 || byClub.size < 4) return;

      let below = 0;
      let possibleBelow = 0;
      const epsilon = 1e-9;

      peers.forEach((peer) => {
        const weight = 1 / byClub.get(peer.club);

        const exactTie =
          Math.abs(peer.range.low - peer.range.high) < epsilon &&
          Math.abs(peer.range.low - own.low) < epsilon;

        if (exactTie) {
          below += 0.5 * weight;
          possibleBelow += 0.5 * weight;
        } else if (peer.range.high < own.low - epsilon) {
          below += weight;
          possibleBelow += weight;
        } else if (peer.range.low <= own.high + epsilon) {
          possibleBelow += weight;
        }
      });

      const low = Math.max(
        1,
        Math.min(10, 1 + 9 * below / byClub.size)
      );

      const high = Math.max(
        low,
        Math.min(10, 1 + 9 * possibleBelow / byClub.size)
      );

      estimates.push({
        label: profile.label,
        low,
        high,
        rating: (low + high) / 2,
        peers: peers.length,
        clubs: byClub.size
      });
    });

    estimates.sort((a, b) =>
      b.rating - a.rating || b.low - a.low
    );

    return estimates[0] ?? null;
  }

  function matchingLeagueReference() {
    if (
      !currentImportedPlayers ||
      !importSaveForm ||
      !leagueForm
    ) return null;

    const name = clean(
      importSaveForm.elements.namedItem("leagueName").value
    );

    const date = clean(
      importSaveForm.elements.namedItem("gameDate").value
    );

    const selectedName = clean(
      leagueForm.elements.namedItem("leagueName").value
    );

    const selectedDate = clean(
      leagueForm.elements.namedItem("gameDate").value
    );

    if (
      leagueIdentity(name, date) !==
      leagueIdentity(selectedName, selectedDate)
    ) return null;

    return leagueReferences.find((record) =>
      record.id === selectedLeagueReferenceId &&
      leagueIdentity(record.leagueName, record.gameDate) ===
      leagueIdentity(name, date)
    ) ?? null;
  }

  function clearImportedLeagueRatings() {
    if (leagueRatingSummary) {
      leagueRatingSummary.hidden = true;
      leagueRatingSummary.textContent = "";
    }

    const container =
      document.getElementById("squad-import-players");

    if (!container) return;

    container.querySelectorAll(".imported-league-rating")
      .forEach((node) => node.remove());

    container.querySelectorAll("summary[data-base-label]")
      .forEach((node) => {
        node.textContent = node.dataset.baseLabel;
      });
  }

  function updateLeagueRatingAction() {
    if (!leagueRateButton) return;

    clearImportedLeagueRatings();
    leagueRateButton.disabled = !matchingLeagueReference();
  }

  if (
    leagueRateButton &&
    leagueStatus &&
    leagueRatingSummary
  ) {
    leagueRateButton.addEventListener("click", () => {
      const reference = matchingLeagueReference();

      if (
        !reference ||
        !currentImportedPlayers ||
        !importSaveForm.reportValidity()
      ) {
        leagueStatus.textContent =
          "Open a squad export with exactly the same league name and in-game date as a saved comparison.";
        return;
      }

      clearImportedLeagueRatings();

      const pool = mergeLeagueAndSquad(
        reference.players,
        currentImportedPlayers
      );

      const cards =
        document.getElementById("squad-import-players").children;

      currentImportedPlayers.forEach((player, index) => {
        const card = cards[index];
        if (!card) return;

        const summary = card.querySelector("summary");

        if (!summary.dataset.baseLabel) {
          summary.dataset.baseLabel = summary.textContent;
        }

        const estimate = estimateLeaguePlayer(player, pool);

        if (!estimate) {
          summary.textContent =
            `${summary.dataset.baseLabel} · Rating pending`;

          card.append(makeElement(
            "p",
            "Not enough comparable adult players with usable attributes. At least 8 players from 4 clubs are needed.",
            "signing-note imported-league-rating"
          ));

          return;
        }

        summary.textContent =
          `${summary.dataset.baseLabel} · Estimated ${estimate.rating.toFixed(1)}/10`;

        card.append(makeElement(
          "p",
          `${estimate.label} comparison · possible range ${estimate.low.toFixed(1)}–${estimate.high.toFixed(1)}/10 · ${estimate.peers} adult players from ${estimate.clubs} clubs.`,
          "signing-note imported-league-rating"
        ));
      });

      const clubs = new Set(
        pool.map((player) => normalise(player.club))
      ).size;

      leagueRatingSummary.textContent =
        `${reference.leagueName}, ${reference.gameDate}: ${pool.length} unique players across ${clubs} clubs, including your squad. These are provisional attribute-based estimates for each player's strongest listed position group. 5.5/10 is the middle of the comparable sample. Each club has equal weight; reference players are aged 18+. Masked attributes create possible ranges, not exact values. These are not FM's official ability ratings.`;

      leagueRatingSummary.hidden = false;

      leagueStatus.textContent =
        "Estimated ratings shown in the player preview. Select a player to see the comparison range. Your saved player attributes and career remain unchanged.";
    });

    if (importSaveForm) {
      importSaveForm.addEventListener(
        "input", updateLeagueRatingAction
      );
    }

    if (leagueForm) {
      leagueForm.addEventListener(
        "input", updateLeagueRatingAction
      );
    }

    updateLeagueRatingAction();
  }
  const input = document.getElementById("squad-import-file");
  const status = document.getElementById("squad-import-status");
  const clearButton = document.getElementById(
    "clear-squad-import-button"
  );

  if (!input || !status || !clearButton) {
    return;
  }

  let readVersion = 0;

  function clearPreview() {
  resetSquadImportSave();
    document.getElementById("squad-import-preview").hidden = true;

    document.getElementById(
      "squad-import-players"
    ).replaceChildren();

    document.getElementById(
      "squad-import-summary"
    ).textContent = "";
  }

  input.addEventListener("change", async () => {
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const version = ++readVersion;
    clearPreview();
    status.textContent = "Reading your squad export…";

    try {
      if (!/\.html?$/i.test(file.name)) {
        throw new Error(
          "Choose an .html or .htm squad export."
        );
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error(
          "Choose a squad export smaller than 10 MB."
        );
      }

      const html = await file.text();

      if (version !== readVersion) {
        return;
      }

      const players = parseSquadExport(html);
      showImportPreview(players);
prepareSquadImportSave(players);

      status.textContent =
        `${players.length} players loaded with all 41 attributes. ` +
        "Select a player to view their details. " +
        "The file is read on this device; this preview is not saved.";
    } catch (error) {
      if (version !== readVersion) {
        return;
      }

      clearPreview();

      status.textContent = error instanceof Error
        ? error.message
        : "The export could not be read. Please try again.";

      input.value = "";
    }
  });

  clearButton.addEventListener("click", () => {
    readVersion++;
    input.value = "";
    clearPreview();

    status.textContent = "Choose a file to preview your squad.";
    input.focus();
  });
})();


