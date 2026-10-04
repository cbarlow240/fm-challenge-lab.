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
    updatePoolNotice();
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

  function savedClubSnapshot() {
    if (!selectedClub) return null;
    const cached = squads.get(selectedClub.id);
    // Reopening a career preserves its players and edits.
    if (cached) return cached.source || null;
    return globalThis.fmStartingClubSquad?.(selectedClub) ||
      globalThis.fmSavedClubSquad?.(selectedClub) || null;
  }

  function hasClubBriefing() {
    return Boolean(savedClubSnapshot() ||
      (selectedClub && Object.hasOwn(starterLineups, selectedClub.id)));
  }

  function hasTactics() {
    if (!selectedClub) return false;
    if (savedClubSnapshot()) return Boolean(getSquad().tactic);
    return Object.hasOwn(starterLineups, selectedClub.id);
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
      const available = tab === "tactics" ? hasTactics() : squadAvailable;
      byId(`${tab}-tab-button`).hidden = !available;
      byId(`${tab}-tab-button`).disabled = !available;
    });
    byId("briefing-screen").querySelector(".preview-note").hidden = !squadAvailable;
    if (!squadAvailable) {
      const heading = textElement("h3", "", "Your challenge is ready");
      heading.id = "club-data-notice-title";
      notice.replaceChildren(
        heading,
        textElement("p", "", `${selectedClub.name} \u00b7 ${selectedClub.league}`),
        textElement("p", "", "Open Transfer Policies and Season Challenge, then save this career to keep its rules fixed. Future seasons unlock after you record your results."),
        textElement("p", "signing-note", "This club\u2019s squad, player ratings and tactics still need its FM24 player data.")
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
      ["Luke O\u2019Nien", "O\u2019Nien", 7.0],
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
      ["V\u00e1clav Hladk\u00fd", "Hladk\u00fd", 7.1]
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

  // FM24 position-based templates with complementary duties.
  // These are recommendations; exported positions do not expose tactical familiarity.
  const tacticSlot = (code, roles, side, profile, role, duty, label) => ({code, roles, side, profile, role, duty, label});
  const tacticBackFour = () => [
    tacticSlot('D (L)', ['D'], 'L', 'fullBack', 'Full-Back', 'Support', 'Left-back'),
    tacticSlot('D (CL)', ['D'], 'C', 'centreBack', 'Central Defender', 'Defend', 'Centre-back'),
    tacticSlot('D (CR)', ['D'], 'C', 'centreBack', 'Central Defender', 'Defend', 'Centre-back'),
    tacticSlot('D (R)', ['D'], 'R', 'fullBack', 'Full-Back', 'Support', 'Right-back'),
    tacticSlot('GK', ['GK'], '', 'goalkeeper', 'Goalkeeper', 'Defend', 'Goalkeeper')
  ];
  const tacticTemplates = [
    {name:'4-2-3-1 DM', rows:[[0],[1,2,3],[4,5],[6,7,8,9],[10]], slots:[
      tacticSlot('ST (C)',['ST'],'C','striker','Advanced Forward','Attack','Striker'),
      tacticSlot('AM (L)',['AM'],'L','winger','Winger','Attack','Left winger'),
      tacticSlot('AM (C)',['AM'],'C','attackingMidfielder','Attacking Midfielder','Support','Attacking midfielder'),
      tacticSlot('AM (R)',['AM'],'R','winger','Winger','Support','Right winger'),
      tacticSlot('DM (CL)',['DM'],'C','defensiveMidfielder','Defensive Midfielder','Support','Defensive midfielder'),
      tacticSlot('DM (CR)',['DM'],'C','defensiveMidfielder','Defensive Midfielder','Defend','Defensive midfielder'),
      ...tacticBackFour()]},
    {name:'4-2-3-1 CM', rows:[[0],[1,2,3],[4,5],[6,7,8,9],[10]], slots:[
      tacticSlot('ST (C)',['ST'],'C','striker','Advanced Forward','Attack','Striker'),
      tacticSlot('AM (L)',['AM'],'L','winger','Winger','Attack','Left winger'),
      tacticSlot('AM (C)',['AM'],'C','attackingMidfielder','Attacking Midfielder','Support','Attacking midfielder'),
      tacticSlot('AM (R)',['AM'],'R','winger','Winger','Support','Right winger'),
      tacticSlot('M (CL)',['M'],'C','centralMidfielder','Central Midfielder','Support','Central midfielder'),
      tacticSlot('M (CR)',['M'],'C','defensiveMidfielder','Central Midfielder','Defend','Central midfielder'),
      ...tacticBackFour()]},
    {name:'4-3-3 DM', rows:[[0],[1,2],[3,4],[5],[6,7,8,9],[10]], slots:[
      tacticSlot('ST (C)',['ST'],'C','striker','Advanced Forward','Attack','Striker'),
      tacticSlot('AM (L)',['AM'],'L','winger','Winger','Attack','Left winger'),
      tacticSlot('AM (R)',['AM'],'R','winger','Winger','Support','Right winger'),
      tacticSlot('M (CL)',['M'],'C','centralMidfielder','Central Midfielder','Support','Central midfielder'),
      tacticSlot('M (CR)',['M'],'C','centralMidfielder','Central Midfielder','Attack','Central midfielder'),
      tacticSlot('DM (C)',['DM'],'C','defensiveMidfielder','Defensive Midfielder','Defend','Holding midfielder'),
      ...tacticBackFour()]},
    {name:'4-4-2', rows:[[0,1],[2,4,5,3],[6,7,8,9],[10]], slots:[
      tacticSlot('ST (CL)',['ST'],'C','striker','Advanced Forward','Attack','Striker'),
      tacticSlot('ST (CR)',['ST'],'C','linkStriker','Deep-Lying Forward','Support','Striker'),
      tacticSlot('M (L)',['M'],'L','winger','Winger','Attack','Left midfielder'),
      tacticSlot('M (R)',['M'],'R','winger','Winger','Support','Right midfielder'),
      tacticSlot('M (CL)',['M'],'C','centralMidfielder','Central Midfielder','Support','Central midfielder'),
      tacticSlot('M (CR)',['M'],'C','defensiveMidfielder','Central Midfielder','Defend','Central midfielder'),
      ...tacticBackFour()]},
    {name:'3-4-1-2', rows:[[0,1],[2],[3,5,6,4],[7,8,9],[10]], slots:[
      tacticSlot('ST (CL)',['ST'],'C','striker','Advanced Forward','Attack','Striker'),
      tacticSlot('ST (CR)',['ST'],'C','linkStriker','Deep-Lying Forward','Support','Striker'),
      tacticSlot('AM (C)',['AM'],'C','attackingMidfielder','Attacking Midfielder','Attack','Attacking midfielder'),
      tacticSlot('M (L)',['M'],'L','wideMidfielder','Wide Midfielder','Support','Left midfielder'),
      tacticSlot('M (R)',['M'],'R','wideMidfielder','Wide Midfielder','Support','Right midfielder'),
      tacticSlot('M (CL)',['M'],'C','centralMidfielder','Central Midfielder','Support','Central midfielder'),
      tacticSlot('M (CR)',['M'],'C','defensiveMidfielder','Central Midfielder','Defend','Holding midfielder'),
      tacticSlot('D (CL)',['D'],'C','centreBack','Central Defender','Defend','Centre-back'),
      tacticSlot('D (C)',['D'],'C','centreBack','Central Defender','Defend','Centre-back'),
      tacticSlot('D (CR)',['D'],'C','centreBack','Central Defender','Defend','Centre-back'),
      tacticSlot('GK',['GK'],'','goalkeeper','Goalkeeper','Defend','Goalkeeper')]}
  ];
  function fitsTacticSlot(player, slot) {
    const text = player.positions.toUpperCase();
    if (slot.roles.includes('GK')) return /\bGK\b/.test(text);
    if (slot.roles.includes('DM') && /\bDM\b/.test(text)) return true;
    if (slot.roles.includes('ST') && /\bST\b/.test(text)) return true;
    const pattern = /\b((?:DM|AM|WB|ST|D|M)(?:\/(?:DM|AM|WB|ST|D|M))*)\s*\(([RLC]+)\)/g;
    return [...text.matchAll(pattern)].some(match =>
      match[1].split('/').some(role => slot.roles.includes(role)) && match[2].includes(slot.side));
  }
  function tacticAttribute(player, name) {
    const range = player.attributes?.[name];
    return range && Number.isFinite(range.low) && Number.isFinite(range.high)
      ? (range.low + range.high) / 2 : null;
  }
  function tacticSlotScore(player, slot) {
    const weights = {
      goalkeeper:{Reflexes:3,Handling:2,'One on Ones':2,Positioning:1},
      centreBack:{Marking:2,Tackling:2,Positioning:2,'Jumping Reach':2,Pace:1,Strength:1},
      fullBack:{Pace:2,Acceleration:2,Tackling:2,Positioning:2,Stamina:1,Crossing:1},
      defensiveMidfielder:{Positioning:2,Tackling:2,Decisions:2,Passing:1,Teamwork:1,'Work Rate':1},
      centralMidfielder:{Passing:2,Decisions:2,Vision:1,Stamina:1,'First Touch':1,'Work Rate':1},
      attackingMidfielder:{Passing:2,Vision:2,Technique:1,Dribbling:1,'Off the Ball':1},
      winger:{Pace:2,Acceleration:2,Dribbling:2,Crossing:1,'Off the Ball':1},
      wideMidfielder:{Stamina:2,'Work Rate':2,Positioning:2,Tackling:1,Teamwork:1,Passing:1,Crossing:1,Pace:1},
      linkStriker:{Passing:2,'First Touch':2,Technique:1,Strength:1,Decisions:1,'Off the Ball':1},
      striker:{Finishing:2,'Off the Ball':2,Acceleration:1,Pace:1,Composure:1}
    }[slot.profile];
    let total=0, sum=0, observed=0;
    for (const [name, weight] of Object.entries(weights)) {
      total+=weight;
      const range=player.attributes?.[name];
      if (range) { sum += weight*(range.low*0.65+range.high*0.35); observed+=weight; }
      else sum+=weight*6;
    }
    return sum/total + observed/total;
  }
  // Maximum-weight bipartite assignment: a versatile player can fill only one slot.
  function assignTacticSlots(players, slots) {
    const n=slots.length, m=players.length+n;
    const costs=slots.map(slot => Array.from({length:m},(_,j) => j>=players.length ? 0
      : fitsTacticSlot(players[j],slot) ? -(10000+tacticSlotScore(players[j],slot)) : 1000000));
    const u=Array(n+1).fill(0),v=Array(m+1).fill(0),p=Array(m+1).fill(0),way=Array(m+1).fill(0);
    for(let i=1;i<=n;i++) {
      p[0]=i; let j0=0; const minv=Array(m+1).fill(Infinity),used=Array(m+1).fill(false);
      do {
        used[j0]=true; const i0=p[j0]; let delta=Infinity,j1=0;
        for(let j=1;j<=m;j++) if(!used[j]) {
          const cur=costs[i0-1][j-1]-u[i0]-v[j];
          if(cur<minv[j]) {minv[j]=cur;way[j]=j0;}
          if(minv[j]<delta) {delta=minv[j];j1=j;}
        }
        for(let j=0;j<=m;j++) {if(used[j]) {u[p[j]]+=delta;v[j]-=delta;} else minv[j]-=delta;}
        j0=j1;
      } while(p[j0]!==0);
      do {const j1=way[j0];p[j0]=p[j1];j0=j1;} while(j0!==0);
    }
    const indexes=Array(n).fill(-1);
    for(let j=1;j<=m;j++) if(p[j] && j<=players.length && costs[p[j]-1][j-1]<0) indexes[p[j]-1]=j-1;
    return { indexes, filled:indexes.filter(i=>i>=0).length,
      score:indexes.reduce((sum,i,s)=>sum+(i<0?0:tacticSlotScore(players[i],slots[s])),0) };
  }
  function generateSquadTactic(players) {
    const eligible=players.filter(p=>p.age===null || p.age>=16);
    let best=null;
    for(const template of tacticTemplates) {
      const match=assignTacticSlots(eligible,template.slots);
      if(!best || match.filled>best.match.filled || (match.filled===best.match.filled && match.score>best.match.score+1e-9)) best={template,match};
    }
    if(!best || best.match.filled!==11) return null;
    const chosen=best.match.indexes.map(i=>eligible[i]);
    const assignments=best.template.slots.map((slot,i)=>{
      let role=slot.role;
      const player=chosen[i];
      // Specialist demands must be supported by observed attributes.
      if(slot.duty==='Support' && ['defensiveMidfielder','centralMidfielder'].includes(slot.profile) &&
        ['Passing','Vision','Decisions','First Touch'].every(name=>(player.attributes?.[name]?.low ?? 0)>=11)) role='Deep-Lying Playmaker';
      if(slot.profile==='goalkeeper' && ['Passing','Decisions','Rushing Out (Tendency)'].every(name=>(player.attributes?.[name]?.low ?? 0)>=11)) role='Sweeper Keeper';
      return [slot.code,slot.label,role,slot.duty,player.group];
    });
    return {version:1,name:best.template.name,rows:best.template.rows,
      assignments,slots:best.template.slots,playerIds:chosen.map(p=>p.id),
      explanation:'Chosen by matching eleven different players to their exported positions, then comparing position-specific attributes. '+
        'The holding midfielder protects the centre, support duties link the lines, and attacking duties provide runners. '+
        'Start with Balanced mentality and standard team instructions. Check positional familiarity, fitness and role suitability in FM. '+
        'Formation, roles and duties stay fixed; use injury replacements only. Ratings and attribute ranges are estimates, and results are not guaranteed.'};
  }

  function validGeneratedTactic(plan) {
    if (plan === null || plan === undefined) return true;
    const template = tacticTemplates.find(item => item.name === plan.name);
    if (!template || plan.version !== 1 || typeof plan.explanation !== "string" ||
      JSON.stringify(plan.rows) !== JSON.stringify(template.rows) ||
      JSON.stringify(plan.slots) !== JSON.stringify(template.slots) ||
      !Array.isArray(plan.assignments) || plan.assignments.length !== 11 ||
      !Array.isArray(plan.playerIds) || plan.playerIds.length !== 11 ||
      new Set(plan.playerIds).size !== 11 ||
      !plan.playerIds.every(id => Number.isSafeInteger(id) && id > 0)) return false;
    return plan.assignments.every((assignment,index) => {
      const slot = template.slots[index];
      const roles = [slot.role];
      if (slot.profile === "goalkeeper") roles.push("Sweeper Keeper");
      if (slot.duty === "Support" && ["centralMidfielder","defensiveMidfielder"].includes(slot.profile)) roles.push("Deep-Lying Playmaker");
      return Array.isArray(assignment) && assignment.length === 5 &&
        assignment[0] === slot.code && assignment[1] === slot.label &&
        roles.includes(assignment[2]) && assignment[3] === slot.duty &&
        ["goalkeepers","defenders","midfielders","forwards"].includes(assignment[4]);
    });
  }

  function ensureSquadTactic(squad) {
    if(!squad.source || squad.tacticChecked) return;
    // Old saved careers may predate storing the attributes used by this feature.
    const starting=globalThis.fmStartingClubSquad?.(selectedClub);
    const snapshot=starting?.gameDate===squad.source.gameDate && starting?.leagueName===squad.source.leagueName
      ? starting : globalThis.fmSavedClubSquad?.(selectedClub);
    if(snapshot && snapshot.gameDate===squad.source.gameDate && snapshot.leagueName===squad.source.leagueName) {
      const originals=new Map(snapshot.players.map(p=>[p.uid,p]));
      squad.players.forEach(player=>{if(!player.attributes) player.attributes=originals.get(player.uid)?.attributes;});
    }
    squad.tactic=generateSquadTactic(squad.players);
    squad.tacticChecked=true;
    if(squad.tactic) squad.startingIds=squad.tactic.playerIds.slice();
  }

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
    const pool = getClubPool();
    byId("generate-button").disabled = selectedDifficulty === null || !clubPoolReady || pool.length === 0;
    document.querySelectorAll('input[name="difficulty"]').forEach(option => {
      option.closest(".difficulty-card").querySelector(".difficulty-description").textContent =
        difficultyPoolDescriptions[option.value];
    });
    if (clubPoolReady) updatePoolNotice();

    byId("difficulty-status").textContent = clubPoolError || (!clubPoolReady
      ? "Loading the FM24 club list\u2026"
      : selectedDifficulty
        ? `${difficultyNames[selectedDifficulty]} selected. ${pool.length.toLocaleString("en-GB")} eligible clubs. Every club in this pool has an equal chance.`
        : "Select a difficulty to continue.");
  }

  // Fixed FM24 competition IDs, rather than guessing division order from names.
  // These are the ten countries agreed for the Rookie and Professional pools.
  const beginnerLeagueIds = new Set([
    "11", "67", "22", "32", "16", "60", "29", "1", "45", "136543"
  ]);
  const secondDivisionLeagueIds = new Set([
    "12", "68", "23", "33", "17", "61", "30", "2", "46", "136544"
  ]);
  // European football countries in the installed FM24 directory, including
  // UEFA members Israel, Russia and T\u00fcrkiye. Competition country is used,
  // so a Welsh club in the Championship belongs to the English league pool.
  const europeanFootballCountries = new Set([
    "Austria", "Belarus", "Belgium", "Bulgaria", "Croatia", "Czechia",
    "Denmark", "England", "Finland", "France", "Germany", "Gibraltar",
    "Greece", "Hungary", "Iceland", "Israel", "Italy", "Latvia",
    "Netherlands", "Northern Ireland", "Norway", "Poland", "Portugal",
    "Republic of Ireland", "Romania", "Russia", "Scotland", "Serbia",
    "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "T\u00fcrkiye",
    "Ukraine", "Wales"
  ]);
  const southAmericanCountries = new Set([
    "Argentina", "Brazil", "Chile", "Colombia", "Peru", "Uruguay"
  ]);
  const difficultyPoolDescriptions = Object.freeze({
    rookie: "Top divisions in our chosen 10 European countries. Flexible rules and achievable targets.",
    professional: "First and second divisions in the same 10 European countries. Balanced rules and realistic targets.",
    veteran: "All available divisions across Europe and South America. Tighter rules and bigger expectations.",
    legendary: "All available clubs worldwide. The toughest compatible rules and season targets."
  });

  function getClubPool(difficulty = selectedDifficulty) {
    if (difficulty === "rookie") {
      return clubs.filter(club => beginnerLeagueIds.has(club.leagueId));
    }
    if (difficulty === "professional") {
      return clubs.filter(club => beginnerLeagueIds.has(club.leagueId) || secondDivisionLeagueIds.has(club.leagueId));
    }
    if (difficulty === "veteran") {
      return clubs.filter(club => europeanFootballCountries.has(club.country) || southAmericanCountries.has(club.country));
    }
    if (difficulty === "legendary") return clubs;
    return [];
  }

  function updatePoolNotice() {
    const pool = getClubPool();
    const label = selectedDifficulty ? difficultyNames[selectedDifficulty] : "Full directory";
    byId("club-result").querySelector(".preview-note").textContent =
      `${label}: ${(selectedDifficulty ? pool.length : clubs.length).toLocaleString("en-GB")} club options \u00b7 ` +
      "FM24 league membership \u00b7 Selected 2023/24 kits and historical trophy records";
    byId("club-result").querySelector(".hero-note").textContent =
      "Unlimited rerolls. Every eligible club has an equal chance on each independent draw; clubs can repeat.";
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

  // Graphics are referenced on their publisher's site, rather than bundled or
  // redistributed. FM IDs match this app's historical FM24 club directory.
  // Badge artwork may be current. Only the kits below are labelled 2023/24.
  const kitPackSource = "https://sortitoutsi.net/content/63378/england-english-leagues-level-1-7-ss202324-new-040923";
  const kitImageRoot = "https://sortitoutsi.b-cdn.net/uploads/extractedfiles/ttLDfTzM5RmeuK6XwFsZzYKkWgoSpT6fQbd960u2/England%20levels%201-6%20SS'23-24/1%20Premier/";
  // Every listed file was observed in the named 2023/24 pack. Missing files
  // mean missing coverage here, not that a club had no shirt in that slot.
  const verifiedKits = Object.freeze({
    "602": ["arsenal", [1, 2, 3]],
    "603": ["astonvilla", [1, 2]],
    "600": ["bournemouth", [1, 2, 3]],
    "617": ["brentford", [1, 2, 3]],
    "618": ["brighton", [1, 2, 3]],
    "622": ["burnley", [1, 2]],
    "650": ["everton", [1, 2, 3]],
    "676": ["liverpool", [1, 2, 3]],
    "677": ["luton", [1, 2]],
    "679": ["mancity", [1, 2, 3]],
    "680": ["manutd", [1, 2, 3]],
    "692": ["nottforest", [1, 2, 3]],
    "708": ["sheffieldutd", [1, 2, 3]]
  });

  // Selected senior men's first-team honours won by 30 June 2023. Keep this
  // cutoff fixed: current source pages also list later trophies. No youth,
  // women's, runner-up or play-off results are included in these title counts.
  const officialClubHonourRecords = Object.freeze({
    "680": {
      source: "https://www.manutd.com/en/club/history/trophy-room",
      sourceName: "Manchester United trophy room",
      trophies: [
        ["English league titles", [1908, 1911, 1952, 1956, 1957, 1965, 1967, 1993, 1994, 1996, 1997, 1999, 2000, 2001, 2003, 2007, 2008, 2009, 2011, 2013]],
        ["European Cup / Champions League", [1968, 1999, 2008]],
        ["FA Cup", [1909, 1948, 1963, 1977, 1983, 1985, 1990, 1994, 1996, 1999, 2004, 2016]],
        ["League Cup", [1992, 2006, 2009, 2010, 2017, 2023]],
        ["UEFA Cup / Europa League", [2017]]
      ]
    },
    "676": {
      source: "https://www.liverpoolfc.com/history/honours",
      sourceName: "Liverpool honours",
      trophies: [
        ["English league titles", [1901, 1906, 1922, 1923, 1947, 1964, 1966, 1973, 1976, 1977, 1979, 1980, 1982, 1983, 1984, 1986, 1988, 1990, 2020]],
        ["European Cup / Champions League", [1977, 1978, 1981, 1984, 2005, 2019]],
        ["FA Cup", [1965, 1974, 1986, 1989, 1992, 2001, 2006, 2022]],
        ["League Cup", [1981, 1982, 1983, 1984, 1995, 2001, 2003, 2012, 2022]],
        ["UEFA Cup / Europa League", [1973, 1976, 2001]]
      ]
    },
    "679": {
      source: "https://www.mancity.com/club/honours/team",
      sourceName: "Manchester City honours",
      trophies: [
        ["English league titles", [1937, 1968, 2012, 2014, 2018, 2019, 2021, 2022, 2023]],
        ["European Cup / Champions League", [2023]],
        ["FA Cup", [1904, 1934, 1956, 1969, 2011, 2019, 2023]],
        ["League Cup", [1970, 1976, 2014, 2016, 2018, 2019, 2020, 2021]],
        ["European Cup Winners\u2019 Cup", [1970]]
      ]
    },
    "673": {
      source: "https://www.lcfc.com/more-history-records-men",
      sourceName: "Leicester City honours and records",
      trophies: [
        ["English league titles", [2016]],
        ["FA Cup", [2021]],
        ["League Cup", [1964, 1997, 2000]],
        ["Community Shield", [1971, 2021]],
        ["English second-tier titles", [1925, 1937, 1954, 1957, 1971, 1980, 2014]],
        ["English third-tier titles", [2009]]
      ]
    },
    "667": {
      source: "https://www.itfc.co.uk/club/history/",
      sourceName: "Ipswich Town club history",
      trophies: [
        ["English league titles", [1962]],
        ["FA Cup", [1978]],
        ["UEFA Cup / Europa League", [1981]]
      ]
    },
    "722": {
      source: "https://safcstats.co.uk/history",
      sourceName: "SAFC Stats club history",
      trophies: [
        ["English league titles", [1892, 1893, 1895, 1902, 1913, 1936]],
        ["FA Cup", [1937, 1973]]
      ]
    }
  });
  // Selected senior first-team titles completed by 30 June 2023.
  // Historical season facts compiled from the linked RSSSF competition archives.
  // Missing clubs or competitions indicate incomplete coverage, never zero honours.
  const archiveClubHonourRecords = Object.freeze({"123001":{"trophies":[["Australia national league titles",["2002/03","2003/04"],"https://rsssf.org/tablesa/auschamp.html"]]},"1300490":{"trophies":[["Australia national league titles",["2005/06","2009/10","2016/17","2018/19","2019/20"],"https://rsssf.org/tablesa/auschamp.html"]]},"1300489":{"trophies":[["Australia national league titles",["2006/07","2008/09","2014/15","2017/18"],"https://rsssf.org/tablesa/auschamp.html"]]},"426430":{"trophies":[["Australia national league titles",["2007/08"],"https://rsssf.org/tablesa/auschamp.html"]]},"130220":{"trophies":[["Australia national league titles",["2010/11","2011/12","2013/14"],"https://rsssf.org/tablesa/auschamp.html"]]},"1300491":{"trophies":[["Australia national league titles",["2012/13","2022/23"],"https://rsssf.org/tablesa/auschamp.html"]]},"8457492":{"trophies":[["Australia national league titles",["2015/16"],"https://rsssf.org/tablesa/auschamp.html"]]},"15051934":{"trophies":[["Australia national league titles",["2020/21"],"https://rsssf.org/tablesa/auschamp.html"]]},"15086549":{"trophies":[["Australia national league titles",["2021/22"],"https://rsssf.org/tablesa/auschamp.html"]]},"155":{"trophies":[["Austria national league titles",["1911/12","1912/13","1915/16","1916/17","1918/19","1919/20","1920/21","1922/23","1928/29","1929/30","1934/35","1937/38","1939/40","1940/41","1945/46","1947/48","1950/51","1951/52","1953/54","1955/56","1956/57","1959/60","1963/64","1966/67","1967/68","1981/82","1982/83","1986/87","1987/88","1995/96","2004/05","2007/08"],"https://rsssf.org/tableso/oostchamp.html"],["Austrian Cup",["1918/19","1919/20","1926/27","1945/46","1960/61","1967/68","1968/69","1971/72","1975/76","1982/83","1983/84","1984/85","1986/87","1994/95"],"https://rsssf.org/tableso/oostcuphist.html"]]},"137947":{"trophies":[["Austria national league titles",["1917/18"],"https://rsssf.org/tableso/oostchamp.html"]]},"152":{"trophies":[["Austria national league titles",["1923/24","1925/26","1948/49","1949/50","1952/53","1960/61","1961/62","1962/63","1968/69","1969/70","1975/76","1977/78","1978/79","1979/80","1980/81","1983/84","1984/85","1985/86","1990/91","1991/92","1992/93","2002/03","2005/06","2012/13"],"https://rsssf.org/tableso/oostchamp.html"],["Austrian Cup",["1920/21","1923/24","1924/25","1925/26","1932/33","1934/35","1935/36","1947/48","1948/49","1959/60","1961/62","1962/63","1966/67","1970/71","1973/74","1976/77","1979/80","1981/82","1985/86","1989/90","1991/92","1993/94","2002/03","2004/05","2005/06","2006/07","2008/09"],"https://rsssf.org/tableso/oostcuphist.html"]]},"5605072":{"trophies":[["Austria national league titles",["1926/27","1927/28","1931/32","1933/34","1935/36","1936/37","1938/39","1965/66"],"https://rsssf.org/tableso/oostchamp.html"],["Austrian Cup",["1927/28","1931/32","1933/34","1963/64","1965/66"],"https://rsssf.org/tableso/oostcuphist.html"]]},"101154":{"trophies":[["Austria national league titles",["1930/31","1932/33","1941/42","1942/43","1943/44","1954/55"],"https://rsssf.org/tableso/oostchamp.html"],["Austrian Cup",["1928/29","1929/30","1936/37"],"https://rsssf.org/tableso/oostcuphist.html"]]},"154":{"trophies":[["Austria national league titles",["1964/65"],"https://rsssf.org/tableso/oostchamp.html"]]},"158":{"trophies":[["Austria national league titles",["1993/94","1994/95","1996/97","2006/07","2008/09","2009/10","2011/12","2013/14","2014/15","2015/16","2016/17","2017/18","2018/19","2019/20","2020/21","2021/22","2022/23"],"https://rsssf.org/tableso/oostchamp.html"],["Austrian Cup",["2011/12","2013/14","2014/15","2015/16","2016/17","2018/19","2019/20","2020/21","2021/22"],"https://rsssf.org/tableso/oostcuphist.html"]]},"156":{"trophies":[["Austria national league titles",["1997/98","1998/99","2010/11"],"https://rsssf.org/tableso/oostchamp.html"],["Austrian Cup",["1995/96","1996/97","1998/99","2009/10","2017/18","2022/23"],"https://rsssf.org/tableso/oostcuphist.html"]]},"303":{"trophies":[["Belarus national league titles",["1992","1993","1994","1997","2004"],"https://rsssf.org/tablesw/witrchamp.html"]]},"130879":{"trophies":[["Belarus national league titles",["1996","2000"],"https://rsssf.org/tablesw/witrchamp.html"]]},"130875":{"trophies":[["Belarus national league titles",["1999","2002","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"],"https://rsssf.org/tablesw/witrchamp.html"]]},"1300111":{"trophies":[["Belarus national league titles",["2001"],"https://rsssf.org/tablesw/witrchamp.html"]]},"5410568":{"trophies":[["Belarus national league titles",["2003"],"https://rsssf.org/tablesw/witrchamp.html"]]},"1300113":{"trophies":[["Belarus national league titles",["2019"],"https://rsssf.org/tablesw/witrchamp.html"]]},"254":{"trophies":[["Belgium national league titles",["1896","1898","1899","1952","1953"],"https://rsssf.org/tablesb/belgchamp.html"],["Belgian Cup",["1990"],"https://rsssf.org/tablesb/belgcuphist.html"]]},"288":{"trophies":[["Belgium national league titles",["1904","1905","1906","1907","1909","1910","1913","1923","1933","1934","1935"],"https://rsssf.org/tablesb/belgchamp.html"],["Belgian Cup",["1913","1914"],"https://rsssf.org/tablesb/belgcuphist.html"]]},"184":{"trophies":[["Belgium national league titles",["1911","1927","1930"],"https://rsssf.org/tablesb/belgchamp.html"],["Belgian Cup",["1927","1985"],"https://rsssf.org/tablesb/belgcuphist.html"]]},"186":{"trophies":[["Belgium national league titles",["1920","1973","1976","1977","1978","1980","1988","1990","1992","1996","1998","2003","2005","2016","2018","2020","2021","2022"],"https://rsssf.org/tablesb/belgchamp.html"],["Belgian Cup",["1968","1970","1977","1986","1991","1995","1996","2002","2004","2007","2015"],"https://rsssf.org/tablesb/belgcuphist.html"]]},"298":{"trophies":[["Belgium national league titles",["1922","1924","1925","1926","1928","1938","1939"],"https://rsssf.org/tablesb/belgchamp.html"],["Belgian Cup",["1971","1979"],"https://rsssf.org/tablesb/belgcuphist.html"]]},"262":{"trophies":[["Belgium national league titles",["1929","1931","1944","1957","2023"],"https://rsssf.org/tablesb/belgchamp.html"],["Belgian Cup",["1955","1992","2020","2023"],"https://rsssf.org/tablesb/belgcuphist.html"]]},"232":{"trophies":[["Belgium national league titles",["1943","1946","1948","1989"],"https://rsssf.org/tablesb/belgchamp.html"],["Belgian Cup",["1987","2019"],"https://rsssf.org/tablesb/belgcuphist.html"]]},"256":{"trophies":[["Belgium national league titles",["1947","1949","1950","1951","1954","1955","1956","1959","1962","1964","1965","1966","1967","1968","1972","1974","1981","1985","1986","1987","1991","1993","1994","1995","2000","2001","2004","2006","2007","2010","2012","2013","2014","2017"],"https://rsssf.org/tablesb/belgchamp.html"],["Belgian Cup",["1965","1972","1973","1975","1976","1988","1989","1994","2008"],"https://rsssf.org/tablesb/belgcuphist.html"],["UEFA Cup / Europa League",["1982/83"],"https://rsssf.org/tablese/ec3b.html"]]},"250":{"trophies":[["Belgium national league titles",["1958","1961","1963","1969","1970","1971","1982","1983","2008","2009"],"https://rsssf.org/tablesb/belgchamp.html"],["Belgian Cup",["1954","1966","1967","1981","1993","2011","2016","2018"],"https://rsssf.org/tablesb/belgcuphist.html"]]},"539089":{"trophies":[["Belgium national league titles",["1979","1984"],"https://rsssf.org/tablesb/belgchamp.html"],["Belgian Cup",["1978","1983"],"https://rsssf.org/tablesb/belgcuphist.html"]]},"258":{"trophies":[["Belgium national league titles",["1999","2002","2011","2019"],"https://rsssf.org/tablesb/belgchamp.html"],["Belgian Cup",["1998","2000","2009","2013","2021"],"https://rsssf.org/tablesb/belgcuphist.html"]]},"168":{"trophies":[["Belgium national league titles",["2015"],"https://rsssf.org/tablesb/belgchamp.html"],["Belgian Cup",["1964","1984","2010","2022"],"https://rsssf.org/tablesb/belgcuphist.html"]]},"349":{"trophies":[["Bulgaria national league titles",["1932/33","1936/37","1941/42","1945/46","1946/47","1948/49","1950","1953","1964/65","1967/68","1992/93","1993/94","1994/95","1999/00","2000/01","2001/02","2005/06","2006/07","2008/09"],"https://rsssf.org/tablesb/bulgchamp.html"]]},"341":{"trophies":[["Bulgaria national league titles",["1985/86"],"https://rsssf.org/tablesb/bulgchamp.html"]]},"7501927":{"trophies":[["Bulgaria national league titles",["1990/91"],"https://rsssf.org/tablesb/bulgchamp.html"]]},"1300197":{"trophies":[["Bulgaria national league titles",["1997/98","1998/99","2009/10","2010/11"],"https://rsssf.org/tablesb/bulgchamp.html"]]},"22003969":{"trophies":[["Bulgaria national league titles",["2011/12","2012/13","2013/14","2014/15","2015/16","2016/17","2017/18","2018/19","2019/20","2020/21","2021/22","2022/23"],"https://rsssf.org/tablesb/bulgchamp.html"]]},"130797":{"trophies":[["Chile national league titles",["1933","1934","1935","1938"],"https://rsssf.org/tablesc/chilechamp.html"]]},"130778":{"trophies":[["Chile national league titles",["1936","1946","1948","1957"],"https://rsssf.org/tablesc/chilechamp.html"]]},"399":{"trophies":[["Chile national league titles",["1937","1939","1941","1944","1947","1953","1956","1960","1963","1970","1972","1979","1981","1983","1986","1989","1990","1991","1993","1996","1997 Clausura","1998","2002 Clausura","2006 Apertura","2006 Clausura","2007 Apertura","2007 Clausura","2008 Clausura","2009 Clausura","2013/14 Clausura","2015/16 Apertura","2017 Transition","2022"],"https://rsssf.org/tablesc/chilechamp.html"]]},"404":{"trophies":[["Chile national league titles",["1940","1959","1962","1964","1965","1967","1969","1994","1995","1999","2000","2004 Apertura","2009 Apertura","2011 Apertura","2011 Clausura","2012 Apertura","2014/15 Apertura","2016/17 Clausura"],"https://rsssf.org/tablesc/chilechamp.html"]]},"130779":{"trophies":[["Chile national league titles",["1942"],"https://rsssf.org/tablesc/chilechamp.html"]]},"120064":{"trophies":[["Chile national league titles",["1943","1951","1973","1975","1977","2005 Apertura","2013 Transition"],"https://rsssf.org/tablesc/chilechamp.html"]]},"403":{"trophies":[["Chile national league titles",["1949","1954","1961","1966","1984","1987","1997 Apertura","2002 Apertura","2005 Clausura","2010","2015/16 Clausura","2016/17 Apertura","2018","2019","2020/21","2021"],"https://rsssf.org/tablesc/chilechamp.html"]]},"130782":{"trophies":[["Chile national league titles",["1950","1952","1976","2008 Apertura"],"https://rsssf.org/tablesc/chilechamp.html"]]},"130780":{"trophies":[["Chile national league titles",["1955","1978"],"https://rsssf.org/tablesc/chilechamp.html"]]},"120921":{"trophies":[["Chile national league titles",["1958","1968","2001"],"https://rsssf.org/tablesc/chilechamp.html"]]},"130784":{"trophies":[["Chile national league titles",["1971"],"https://rsssf.org/tablesc/chilechamp.html"]]},"104362":{"trophies":[["Chile national league titles",["1974","2012 Clausura"],"https://rsssf.org/tablesc/chilechamp.html"]]},"104359":{"trophies":[["Chile national league titles",["1980","1982","1985","1988","1992","2003 Apertura","2003 Clausura","2004 Clausura"],"https://rsssf.org/tablesc/chilechamp.html"]]},"400":{"trophies":[["Chile national league titles",["2013/14 Apertura"],"https://rsssf.org/tablesc/chilechamp.html"]]},"130795":{"trophies":[["Chile national league titles",["2014/15 Clausura"],"https://rsssf.org/tablesc/chilechamp.html"]]},"414":{"trophies":[["Chinese professional league titles (since 1994)",["1995"],"https://rsssf.org/tablesc/chinachamp.html"]]},"116403":{"trophies":[["Chinese professional league titles (since 1994)",["1999","2006","2008","2010","2021/22"],"https://rsssf.org/tablesc/chinachamp.html"]]},"115942":{"trophies":[["Chinese professional league titles (since 1994)",["2004"],"https://rsssf.org/tablesc/chinachamp.html"]]},"131135":{"trophies":[["Chinese professional league titles (since 1994)",["2007"],"https://rsssf.org/tablesc/chinachamp.html"]]},"406":{"trophies":[["Chinese professional league titles (since 1994)",["2009"],"https://rsssf.org/tablesc/chinachamp.html"]]},"409":{"trophies":[["Chinese professional league titles (since 1994)",["2011","2012","2013","2014","2015","2016","2017","2019"],"https://rsssf.org/tablesc/chinachamp.html"]]},"23292170":{"trophies":[["Chinese professional league titles (since 1994)",["2018"],"https://rsssf.org/tablesc/chinachamp.html"]]},"433":{"trophies":[["Croatian league titles (since 1992)",["1992","1993/94","1994/95","2000/01","2003/04","2004/05"],"https://rsssf.org/tablesk/kroachamp.html"]]},"432":{"trophies":[["Croatian league titles (since 1992)",["1992/93","1995/96","1996/97","1997/98","1998/99","1999/00","2002/03","2005/06","2006/07","2007/08","2008/09","2009/10","2010/11","2011/12","2012/13","2013/14","2014/15","2015/16","2017/18","2018/19","2019/20","2020/21","2021/22","2022/23"],"https://rsssf.org/tablesk/kroachamp.html"]]},"441":{"trophies":[["Croatian league titles (since 1992)",["2016/17"],"https://rsssf.org/tablesk/kroachamp.html"]]},"476":{"trophies":[["Czech league titles (since 1993)",["1993/94","1994/95","1996/97","1997/98","1998/99","1999/00","2000/01","2002/03","2004/05","2006/07","2009/10","2013/14","2022/23"],"https://rsssf.org/tablest/tsjechamp.html"]]},"474":{"trophies":[["Czech league titles (since 1993)",["1995/96","2007/08","2008/09","2016/17","2018/19","2019/20","2020/21"],"https://rsssf.org/tablest/tsjechamp.html"]]},"475":{"trophies":[["Czech league titles (since 1993)",["2001/02","2005/06","2011/12"],"https://rsssf.org/tablest/tsjechamp.html"]]},"1300301":{"trophies":[["Czech league titles (since 1993)",["2003/04"],"https://rsssf.org/tablest/tsjechamp.html"]]},"477":{"trophies":[["Czech league titles (since 1993)",["2010/11","2012/13","2014/15","2015/16","2017/18","2021/22"],"https://rsssf.org/tablest/tsjechamp.html"]]},"493":{"trophies":[["Denmark national league titles",["1915/16","1926/27","1928/29","1929/30","1933/34","1934/35","1938/39","1941/42","1945/46"],"https://rsssf.org/tablesd/denchamp.html"],["Danish Cup",["1982"],"https://rsssf.org/tablesd/dencuphist.html"]]},"480":{"trophies":[["Denmark national league titles",["1918/19","1920/21","1936/37","1942/43","1944/45","1946/47","1950/51","1951/52","1967"],"https://rsssf.org/tablesd/denchamp.html"],["Danish Cup",["1999"],"https://rsssf.org/tablesd/dencuphist.html"]]},"507":{"trophies":[["Denmark national league titles",["1922/23","1930/31","1932/33","1935/36","1940/41","1943/44"],"https://rsssf.org/tablesd/denchamp.html"],["Danish Cup",["1956","1978"],"https://rsssf.org/tablesd/dencuphist.html"]]},"482":{"trophies":[["Denmark national league titles",["1954/55","1955/56","1956/57","1960","1986"],"https://rsssf.org/tablesd/denchamp.html"],["Danish Cup",["1955","1957","1960","1961","1965","1987","1988","1992","1996"],"https://rsssf.org/tablesd/dencuphist.html"]]},"2142":{"trophies":[["Denmark national league titles",["1958","1971","1972","1978","1984"],"https://rsssf.org/tablesd/denchamp.html"],["Danish Cup",["1958","1959","1972","1975","1977","1981"],"https://rsssf.org/tablesd/dencuphist.html"]]},"502":{"trophies":[["Denmark national league titles",["1961","1962","1963","1965","1979"],"https://rsssf.org/tablesd/denchamp.html"],["Danish Cup",["1964","1976","2013"],"https://rsssf.org/tablesd/dencuphist.html"]]},"524":{"trophies":[["Denmark national league titles",["1966","1973","1981"],"https://rsssf.org/tablesd/denchamp.html"],["Danish Cup",["1980"],"https://rsssf.org/tablesd/dencuphist.html"]]},"545":{"trophies":[["Denmark national league titles",["1977","1982","1989"],"https://rsssf.org/tablesd/denchamp.html"],["Danish Cup",["1983","1991","1993","2002","2007"],"https://rsssf.org/tablesd/dencuphist.html"]]},"533":{"trophies":[["Denmark national league titles",["1983","1991/92"],"https://rsssf.org/tablesd/denchamp.html"],["Danish Cup",["1984","1985","1990"],"https://rsssf.org/tablesd/dencuphist.html"]]},"496":{"trophies":[["Denmark national league titles",["1985","1987","1988","1990","1991","1995/96","1996/97","1997/98","2001/02","2004/05","2020/21"],"https://rsssf.org/tablesd/denchamp.html"],["Danish Cup",["1989","1994","1998","2003","2005","2008","2018"],"https://rsssf.org/tablesd/dencuphist.html"]]},"505":{"trophies":[["Denmark national league titles",["1992/93","2000/01","2002/03","2003/04","2005/06","2006/07","2008/09","2009/10","2010/11","2012/13","2015/16","2016/17","2018/19","2021/22","2022/23"],"https://rsssf.org/tablesd/denchamp.html"],["Danish Cup",["1995","1997","2004","2009","2012","2015","2016","2017","2023"],"https://rsssf.org/tablesd/dencuphist.html"]]},"551":{"trophies":[["Denmark national league titles",["1993/94"],"https://rsssf.org/tablesd/denchamp.html"],["Danish Cup",["2001"],"https://rsssf.org/tablesd/dencuphist.html"]]},"483":{"trophies":[["Denmark national league titles",["1994/95","1998/99","2007/08","2013/14"],"https://rsssf.org/tablesd/denchamp.html"],["Danish Cup",["1966","1970","2014"],"https://rsssf.org/tablesd/dencuphist.html"]]},"932443":{"trophies":[["Denmark national league titles",["2011/12"],"https://rsssf.org/tablesd/denchamp.html"]]},"526":{"trophies":[["Denmark national league titles",["2014/15","2017/18","2019/20"],"https://rsssf.org/tablesd/denchamp.html"],["Danish Cup",["2019","2022"],"https://rsssf.org/tablesd/dencuphist.html"]]},"700":{"trophies":[["English league titles",["1889","1890"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1889","1938"],"https://rsssf.org/tablese/engcuphist.html"]]},"650":{"trophies":[["English league titles",["1891","1915","1928","1932","1939","1963","1970","1985","1987"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1906","1933","1966","1984","1995"],"https://rsssf.org/tablese/engcuphist.html"]]},"722":{"trophies":[["English league titles",["1892","1893","1895","1902","1913","1936"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1937","1973"],"https://rsssf.org/tablese/engcuphist.html"]]},"603":{"trophies":[["English league titles",["1894","1896","1897","1899","1900","1910","1981"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1887","1895","1897","1905","1913","1920","1957"],"https://rsssf.org/tablese/engcuphist.html"],["League Cup",["1961","1975","1977","1994","1996"],"https://rsssf.org/tablese/engleagcuphist.html"],["European Cup / Champions League",["1981/82"],"https://rsssf.org/tablese/ec1.html"]]},"708":{"trophies":[["English league titles",["1898"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1899","1902","1915","1925"],"https://rsssf.org/tablese/engcuphist.html"]]},"676":{"trophies":[["English league titles",["1901","1906","1922","1923","1947","1964","1966","1973","1976","1977","1979","1980","1982","1983","1984","1986","1988","1990","2020"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1965","1974","1986","1989","1992","2001","2006","2022"],"https://rsssf.org/tablese/engcuphist.html"],["League Cup",["1981","1982","1983","1984","1995","2001","2003","2012","2022"],"https://rsssf.org/tablese/engleagcuphist.html"],["European Cup / Champions League",["1976/77","1977/78","1980/81","1983/84","2004/05","2018/19"],"https://rsssf.org/tablese/ec1.html"],["UEFA Cup / Europa League",["1972/73","1975/76","2000/01"],"https://rsssf.org/tablese/ec3b.html"]]},"709":{"trophies":[["English league titles",["1903","1904","1929","1930"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1896","1907","1935"],"https://rsssf.org/tablese/engcuphist.html"],["League Cup",["1991"],"https://rsssf.org/tablese/engleagcuphist.html"]]},"688":{"trophies":[["English league titles",["1905","1907","1909","1927"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1910","1924","1932","1951","1952","1955"],"https://rsssf.org/tablese/engcuphist.html"]]},"680":{"trophies":[["English league titles",["1908","1911","1952","1956","1957","1965","1967","1993","1994","1996","1997","1999","2000","2001","2003","2007","2008","2009","2011","2013"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1909","1948","1963","1977","1983","1985","1990","1994","1996","1999","2004","2016"],"https://rsssf.org/tablese/engcuphist.html"],["League Cup",["1992","2006","2009","2010","2017","2023"],"https://rsssf.org/tablese/engleagcuphist.html"],["European Cup / Champions League",["1967/68","1998/99","2007/08"],"https://rsssf.org/tablese/ec1.html"],["UEFA Cup / Europa League",["2016/17"],"https://rsssf.org/tablese/ec3b.html"]]},"612":{"trophies":[["English league titles",["1912","1914","1995"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1884","1885","1886","1890","1891","1928"],"https://rsssf.org/tablese/engcuphist.html"],["League Cup",["2002"],"https://rsssf.org/tablese/engleagcuphist.html"]]},"734":{"trophies":[["English league titles",["1920"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1888","1892","1931","1954","1968"],"https://rsssf.org/tablese/engcuphist.html"],["League Cup",["1966"],"https://rsssf.org/tablese/engleagcuphist.html"]]},"622":{"trophies":[["English league titles",["1921","1960"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1914"],"https://rsssf.org/tablese/engcuphist.html"]]},"664":{"trophies":[["English league titles",["1924","1925","1926"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1922"],"https://rsssf.org/tablese/engcuphist.html"]]},"602":{"trophies":[["English league titles",["1931","1933","1934","1935","1938","1948","1953","1971","1989","1991","1998","2002","2004"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1930","1936","1950","1971","1979","1993","1998","2002","2003","2005","2014","2015","2017","2020"],"https://rsssf.org/tablese/engcuphist.html"],["League Cup",["1987","1993"],"https://rsssf.org/tablese/engleagcuphist.html"]]},"679":{"trophies":[["English league titles",["1937","1968","2012","2014","2018","2019","2021","2022","2023"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1904","1934","1956","1969","2011","2019","2023"],"https://rsssf.org/tablese/engcuphist.html"],["League Cup",["1970","1976","2014","2016","2018","2019","2020","2021"],"https://rsssf.org/tablese/engleagcuphist.html"],["European Cup / Champions League",["2022/23"],"https://rsssf.org/tablese/ec1.html"]]},"699":{"trophies":[["English league titles",["1949","1950"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1939","2008"],"https://rsssf.org/tablese/engcuphist.html"]]},"728":{"trophies":[["English league titles",["1951","1961"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1901","1921","1961","1962","1967","1981","1982","1991"],"https://rsssf.org/tablese/engcuphist.html"],["League Cup",["1971","1973","1999","2008"],"https://rsssf.org/tablese/engleagcuphist.html"],["UEFA Cup / Europa League",["1971/72","1983/84"],"https://rsssf.org/tablese/ec3b.html"]]},"740":{"trophies":[["English league titles",["1954","1958","1959"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1893","1908","1949","1960"],"https://rsssf.org/tablese/engcuphist.html"],["League Cup",["1974","1980"],"https://rsssf.org/tablese/engleagcuphist.html"]]},"630":{"trophies":[["English league titles",["1955","2005","2006","2010","2015","2017"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1970","1997","2000","2007","2009","2010","2012","2018"],"https://rsssf.org/tablese/engcuphist.html"],["League Cup",["1965","1998","2005","2007","2015"],"https://rsssf.org/tablese/engleagcuphist.html"],["European Cup / Champions League",["2011/12","2020/21"],"https://rsssf.org/tablese/ec1.html"],["UEFA Cup / Europa League",["2012/13","2018/19"],"https://rsssf.org/tablese/ec3b.html"]]},"667":{"trophies":[["English league titles",["1962"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1978"],"https://rsssf.org/tablese/engcuphist.html"],["UEFA Cup / Europa League",["1980/81"],"https://rsssf.org/tablese/ec3b.html"]]},"671":{"trophies":[["English league titles",["1969","1974","1992"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1972"],"https://rsssf.org/tablese/engcuphist.html"],["League Cup",["1968"],"https://rsssf.org/tablese/engleagcuphist.html"]]},"645":{"trophies":[["English league titles",["1972","1975"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1946"],"https://rsssf.org/tablese/engcuphist.html"]]},"692":{"trophies":[["English league titles",["1978"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["1898","1959"],"https://rsssf.org/tablese/engcuphist.html"],["League Cup",["1978","1979","1989","1990"],"https://rsssf.org/tablese/engleagcuphist.html"],["European Cup / Champions League",["1978/79","1979/80"],"https://rsssf.org/tablese/ec1.html"]]},"673":{"trophies":[["English league titles",["2016"],"https://rsssf.org/tablese/engchamp.html"],["FA Cup",["2021"],"https://rsssf.org/tablese/engcuphist.html"],["League Cup",["1964","1997","2000"],"https://rsssf.org/tablese/engleagcuphist.html"]]},"816":{"trophies":[["Finland national league titles",["1911","1912","1917","1918","1919","1923","1925","1936","1938","1964","1973","1978","1981","1985","1987","1988","1990","1992","1997","2002","2003","2009","2010","2011","2012","2013","2014","2017","2018","2020","2021","2022"],"https://rsssf.org/tablesf/finchamp.html"]]},"822":{"trophies":[["Finland national league titles",["1928","1939","1941","1945","1949","1968","1971","1972","1975"],"https://rsssf.org/tablesf/finchamp.html"]]},"129129":{"trophies":[["Finland national league titles",["1930","1931","1933","1937","1947","1959","1961"],"https://rsssf.org/tablesf/finchamp.html"]]},"818":{"trophies":[["Finland national league titles",["1956","1958","1966","1974","1976","2019"],"https://rsssf.org/tablesf/finchamp.html"]]},"817":{"trophies":[["Finland national league titles",["1960","1962","1965","1977","1995","1998","1999","2000","2004"],"https://rsssf.org/tablesf/finchamp.html"]]},"129179":{"trophies":[["Finland national league titles",["2016"],"https://rsssf.org/tablesf/finchamp.html"]]},"866":{"trophies":[["French professional league titles",["1936/37","1947/48","1970/71","1971/72","1988/89","1989/90","1990/91","1991/92","2009/10"],"https://rsssf.org/tablesf/franchamp.html"],["Coupe de France",["1969","1972","1976","1989"],"https://rsssf.org/tablesf/francuphist.html"],["European Cup / Champions League",["1992/93"],"https://rsssf.org/tablese/ec1.html"]]},"858":{"trophies":[["French professional league titles",["1945/46","1953/54","2010/11","2020/21"],"https://rsssf.org/tablesf/franchamp.html"],["Coupe de France",["1946","2011"],"https://rsssf.org/tablesf/francuphist.html"]]},"2047":{"trophies":[["French professional league titles",["1948/49","1952/53","1954/55","1957/58","1959/60","1961/62"],"https://rsssf.org/tablesf/franchamp.html"],["Coupe de France",["1958"],"https://rsssf.org/tablesf/francuphist.html"]]},"862":{"trophies":[["French professional league titles",["1950/51","1951/52","1955/56","1958/59"],"https://rsssf.org/tablesf/franchamp.html"],["Coupe de France",["1954","1997"],"https://rsssf.org/tablesf/francuphist.html"]]},"828":{"trophies":[["French professional league titles",["1956/57","1963/64","1966/67","1967/68","1968/69","1969/70","1973/74","1974/75","1975/76","1980/81"],"https://rsssf.org/tablesf/franchamp.html"],["Coupe de France",["1962","1968","1970","1974","1975","1977"],"https://rsssf.org/tablesf/francuphist.html"]]},"826":{"trophies":[["French professional league titles",["1960/61","1962/63","1977/78","1981/82","1987/88","1996/97","1999/00","2016/17"],"https://rsssf.org/tablesf/franchamp.html"],["Coupe de France",["1960","1963","1980","1985","1991"],"https://rsssf.org/tablesf/francuphist.html"]]},"846":{"trophies":[["French professional league titles",["1964/65","1965/66","1972/73","1976/77","1979/80","1982/83","1994/95","2000/01"],"https://rsssf.org/tablesf/franchamp.html"],["Coupe de France",["1979","1999","2000","2022"],"https://rsssf.org/tablesf/francuphist.html"]]},"851":{"trophies":[["French professional league titles",["1983/84","1984/85","1986/87","1998/99","2008/09"],"https://rsssf.org/tablesf/franchamp.html"]]},"868":{"trophies":[["French professional league titles",["1985/86","1993/94","2012/13","2013/14","2014/15","2015/16","2017/18","2018/19","2019/20","2021/22","2022/23"],"https://rsssf.org/tablesf/franchamp.html"],["Coupe de France",["1982","1998","2004","2006","2010","2015","2016","2017","2018","2020","2021"],"https://rsssf.org/tablesf/francuphist.html"]]},"865":{"trophies":[["French professional league titles",["2001/02","2002/03","2003/04","2004/05","2005/06","2006/07","2007/08"],"https://rsssf.org/tablesf/franchamp.html"],["Coupe de France",["1964","1967","1973","2008","2012"],"https://rsssf.org/tablesf/francuphist.html"]]},"2253":{"trophies":[["Germany national league titles",["1913/14","1925/26","1928/29"],"https://rsssf.org/tablesd/duitchamp.html"]]},"899":{"trophies":[["Germany national league titles",["1919/20","1920/21","1923/24","1924/25","1926/27","1935/36","1947/48","1960/61","1967/68"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["1934/35","1938/39","1961/62","2006/07"],"https://rsssf.org/tablesd/duitcuphist.html"]]},"947":{"trophies":[["Germany national league titles",["1922/23","1927/28","1959/60","1978/79","1981/82","1982/83"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["1962/63","1975/76","1986/87"],"https://rsssf.org/tablesd/duitcuphist.html"],["European Cup / Champions League",["1982/83"],"https://rsssf.org/tablese/ec1.html"]]},"2247":{"trophies":[["Germany national league titles",["1929/30","1930/31"],"https://rsssf.org/tablesd/duitchamp.html"]]},"915":{"trophies":[["Germany national league titles",["1931/32","1968/69","1971/72","1972/73","1973/74","1979/80","1980/81","1984/85","1985/86","1986/87","1988/89","1989/90","1993/94","1996/97","1998/99","1999/00","2000/01","2002/03","2004/05","2005/06","2007/08","2009/10","2012/13","2013/14","2014/15","2015/16","2016/17","2017/18","2018/19","2019/20","2020/21","2021/22","2022/23"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["1956/57","1965/66","1966/67","1968/69","1970/71","1981/82","1983/84","1985/86","1997/98","1999/00","2002/03","2004/05","2005/06","2007/08","2009/10","2012/13","2013/14","2015/16","2018/19","2019/20"],"https://rsssf.org/tablesd/duitcuphist.html"],["European Cup / Champions League",["1973/74","1974/75","1975/76","2000/01","2012/13","2019/20"],"https://rsssf.org/tablese/ec1.html"],["UEFA Cup / Europa League",["1995/96"],"https://rsssf.org/tablese/ec3b.html"]]},"921":{"trophies":[["Germany national league titles",["1932/33"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["1978/79","1979/80"],"https://rsssf.org/tablesd/duitcuphist.html"]]},"920":{"trophies":[["Germany national league titles",["1933/34","1934/35","1936/37","1938/39","1939/40","1941/42","1957/58"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["1936/37","1971/72","2000/01","2001/02","2010/11"],"https://rsssf.org/tablesd/duitcuphist.html"],["UEFA Cup / Europa League",["1996/97"],"https://rsssf.org/tablese/ec3b.html"]]},"927":{"trophies":[["Germany national league titles",["1937/38","1953/54"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["1991/92"],"https://rsssf.org/tablesd/duitcuphist.html"]]},"960":{"trophies":[["Germany national league titles",["1949/50","1951/52","1983/84","1991/92","2006/07"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["1953/54","1957/58","1996/97"],"https://rsssf.org/tablesd/duitcuphist.html"]]},"945":{"trophies":[["Germany national league titles",["1950/51","1952/53","1990/91","1997/98"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["1989/90","1995/96"],"https://rsssf.org/tablesd/duitcuphist.html"]]},"2249":{"trophies":[["Germany national league titles",["1954/55"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["1952/53"],"https://rsssf.org/tablesd/duitcuphist.html"]]},"907":{"trophies":[["Germany national league titles",["1955/56","1956/57","1962/63","1994/95","1995/96","2001/02","2010/11","2011/12"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["1964/65","1988/89","2011/12","2016/17","2020/21"],"https://rsssf.org/tablesd/duitcuphist.html"],["European Cup / Champions League",["1996/97"],"https://rsssf.org/tablese/ec1.html"]]},"912":{"trophies":[["Germany national league titles",["1958/59"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["1973/74","1974/75","1980/81","1987/88","2017/18"],"https://rsssf.org/tablesd/duitcuphist.html"],["UEFA Cup / Europa League",["1979/80","2021/22"],"https://rsssf.org/tablese/ec3b.html"]]},"916":{"trophies":[["Germany national league titles",["1961/62","1963/64","1977/78"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["1967/68","1976/77","1977/78","1982/83"],"https://rsssf.org/tablesd/duitcuphist.html"]]},"948":{"trophies":[["Germany national league titles",["1964/65","1987/88","1992/93","2003/04"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["1960/61","1990/91","1993/94","1998/99","2003/04","2008/09"],"https://rsssf.org/tablesd/duitcuphist.html"]]},"955":{"trophies":[["Germany national league titles",["1965/66"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["1941/42","1963/64"],"https://rsssf.org/tablesd/duitcuphist.html"]]},"908":{"trophies":[["Germany national league titles",["1969/70","1970/71","1974/75","1975/76","1976/77"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["1959/60","1972/73","1994/95"],"https://rsssf.org/tablesd/duitcuphist.html"],["UEFA Cup / Europa League",["1974/75","1978/79"],"https://rsssf.org/tablese/ec3b.html"]]},"961":{"trophies":[["Germany national league titles",["2008/09"],"https://rsssf.org/tablesd/duitchamp.html"],["DFB-Pokal / German Cup",["2014/15"],"https://rsssf.org/tablesd/duitcuphist.html"]]},"36500009":{"trophies":[["Gibraltar national league titles",["1928/29","1929/30","1931/32","1932/33","1937/38","1951/52","2016/17"],"https://rsssf.org/tablesg/gibchamp.html"]]},"36500004":{"trophies":[["Gibraltar national league titles",["1985/86","1989/90","1990/91","1991/92","1992/93","1993/94","2000/01","2007/08","2008/09","2009/10","2010/11","2011/12","2012/13","2013/14","2014/15","2015/16","2017/18","2018/19","2020/21","2021/22","2022/23"],"https://rsssf.org/tablesg/gibchamp.html"]]},"36500002":{"trophies":[["Gibraltar national league titles",["1995/96"],"https://rsssf.org/tablesg/gibchamp.html"]]},"969":{"trophies":[["Greece national league titles",["1927/28","1931/32","1945/46"],"https://rsssf.org/tablesg/grkchamp.html"],["Greek Cup",["1969/70"],"https://rsssf.org/tablesg/grkcuphist.html"]]},"983":{"trophies":[["Greece national league titles",["1929/30","1948/49","1952/53","1959/60","1960/61","1961/62","1963/64","1964/65","1968/69","1969/70","1971/72","1976/77","1983/84","1985/86","1989/90","1990/91","1994/95","1995/96","2003/04","2009/10"],"https://rsssf.org/tablesg/grkchamp.html"],["Greek Cup",["1939/40","1947/48","1954/55","1966/67","1968/69","1976/77","1981/82","1983/84","1985/86","1987/88","1988/89","1992/93","1993/94","1994/95","2003/04","2009/10","2013/14","2021/22"],"https://rsssf.org/tablesg/grkcuphist.html"]]},"981":{"trophies":[["Greece national league titles",["1930/31","1932/33","1933/34","1935/36","1936/37","1937/38","1946/47","1947/48","1950/51","1953/54","1954/55","1955/56","1956/57","1957/58","1958/59","1965/66","1966/67","1972/73","1973/74","1974/75","1979/80","1980/81","1981/82","1982/83","1986/87","1996/97","1997/98","1998/99","1999/00","2000/01","2001/02","2002/03","2004/05","2005/06","2006/07","2007/08","2008/09","2010/11","2011/12","2012/13","2013/14","2014/15","2015/16","2016/17","2019/20","2020/21","2021/22"],"https://rsssf.org/tablesg/grkchamp.html"],["Greek Cup",["1946/47","1950/51","1951/52","1952/53","1953/54","1956/57","1957/58","1958/59","1959/60","1960/61","1962/63","1964/65","1967/68","1970/71","1972/73","1974/75","1980/81","1989/90","1991/92","1998/99","2004/05","2005/06","2007/08","2008/09","2011/12","2012/13","2014/15","2019/20"],"https://rsssf.org/tablesg/grkcuphist.html"]]},"967":{"trophies":[["Greece national league titles",["1938/39","1939/40","1962/63","1967/68","1970/71","1977/78","1978/79","1988/89","1991/92","1992/93","1993/94","2017/18","2022/23"],"https://rsssf.org/tablesg/grkchamp.html"],["Greek Cup",["1931/32","1938/39","1948/49","1949/50","1955/56","1965/66","1977/78","1982/83","1995/96","1996/97","1999/00","2001/02","2010/11","2015/16","2022/23"],"https://rsssf.org/tablesg/grkcuphist.html"]]},"982":{"trophies":[["Greece national league titles",["1975/76","1984/85","2018/19"],"https://rsssf.org/tablesg/grkchamp.html"],["Greek Cup",["1971/72","1973/74","2000/01","2002/03","2016/17","2017/18","2018/19","2020/21"],"https://rsssf.org/tablesg/grkcuphist.html"]]},"978":{"trophies":[["Greece national league titles",["1987/88"],"https://rsssf.org/tablesg/grkchamp.html"],["Greek Cup",["1984/85","2006/07"],"https://rsssf.org/tablesg/grkcuphist.html"]]},"133674":{"trophies":[["Hong Kong (China PR) national league titles",["1947/48","1949/50","1963/64","2010/11","2011/12","2013/14","2014/15","2016/17","2017/18","2019/20","2020/21","2022/23"],"https://rsssf.org/tablesh/hkchamp.html"]]},"133669":{"trophies":[["Hong Kong (China PR) national league titles",["1955/56","1992/93","1993/94","1994/95","2015/16"],"https://rsssf.org/tablesh/hkchamp.html"]]},"7400958":{"trophies":[["Hong Kong (China PR) national league titles",["2018/19"],"https://rsssf.org/tablesh/hkchamp.html"]]},"1055":{"trophies":[["Hungary national league titles",["1903","1905","1906/07","1908/09","1909/10","1910/11","1911/12","1912/13","1925/26","1926","1926/27","1927/28","1931/32","1933/34","1937/38","1939/40","1940/41","1948/49","1957","1962/63","1964","1967","1968","1975/76","1980/81","1991/92","1994/95","1995/96","2000/01","2003/04","2015/16","2018/19","2019/20","2020/21","2021/22","2022/23"],"https://rsssf.org/tablesh/hongchamp.html"]]},"1060":{"trophies":[["Hungary national league titles",["1904","1907/08","1913/14","1916/17","1917/18","1918/19","1919/20","1920/21","1921/22","1922/23","1923/24","1924/25","1928/29","1935/36","1936/37","1957","1957/58","1974","1986/87","1991","1996/97","1997","1998/99","2002/03","2007/08"],"https://rsssf.org/tablesh/hongchamp.html"]]},"1064":{"trophies":[["Hungary national league titles",["1929/30","1930/31","1932/33","1934/35","1938/39","1945","1945/46","1946/47","1959/60","1969","1970","1970/71","1971/72","1972/73","1973/74","1974/75","1977/78","1978/79","1989/90","1997/98"],"https://rsssf.org/tablesh/hongchamp.html"]]},"1059":{"trophies":[["Hungary national league titles",["1949/50","1950","1952","1954","1955","1979/80","1983/84","1984/85","1985/86","1987/88","1988/89","1990/91","2016/17"],"https://rsssf.org/tablesh/hongchamp.html"]]},"1066":{"trophies":[["Hungary national league titles",["1957","1960/61","1961/62","1965","1966","1976/77"],"https://rsssf.org/tablesh/hongchamp.html"]]},"1054":{"trophies":[["Hungary national league titles",["1981/82","1982/83","2012/13"],"https://rsssf.org/tablesh/hongchamp.html"]]},"1068":{"trophies":[["Hungary national league titles",["2001/02"],"https://rsssf.org/tablesh/hongchamp.html"]]},"1052":{"trophies":[["Hungary national league titles",["2004/05","2005/06","2006/07","2008/09","2009/10","2011/12","2013/14"],"https://rsssf.org/tablesh/hongchamp.html"]]},"1062":{"trophies":[["Hungary national league titles",["2010/11","2014/15","2017/18"],"https://rsssf.org/tablesh/hongchamp.html"]]},"1076":{"trophies":[["Iceland national league titles",["1912","1919","1926","1927","1928","1929","1931","1932","1934","1941","1948","1949","1950","1952","1955","1959","1961","1963","1965","1968","1999","2000","2002","2003","2011","2013","2019"],"https://rsssf.org/tablesi/ijschamp.html"]]},"1071":{"trophies":[["Iceland national league titles",["1913","1914","1915","1916","1917","1918","1921","1922","1923","1925","1939","1946","1947","1962","1972","1986","1988","1990"],"https://rsssf.org/tablesi/ijschamp.html"]]},"1101637":{"trophies":[["Iceland national league titles",["1920","1924","1981","1982","1991","2021"],"https://rsssf.org/tablesi/ijschamp.html"]]},"1080":{"trophies":[["Iceland national league titles",["1930","1933","1935","1936","1937","1938","1940","1942","1943","1944","1945","1956","1966","1967","1976","1978","1980","1985","1987","2007","2017","2018","2020"],"https://rsssf.org/tablesi/ijschamp.html"]]},"1072":{"trophies":[["Iceland national league titles",["1951","1953","1954","1957","1958","1960","1970","1974","1975","1977","1983","1984","1992","1993","1994","1995","1996","2001"],"https://rsssf.org/tablesi/ijschamp.html"]]},"1074":{"trophies":[["Iceland national league titles",["1979","1997","1998"],"https://rsssf.org/tablesi/ijschamp.html"]]},"4300030":{"trophies":[["Iceland national league titles",["1989"],"https://rsssf.org/tablesi/ijschamp.html"]]},"1070":{"trophies":[["Iceland national league titles",["2004","2005","2006","2008","2009","2012","2015","2016"],"https://rsssf.org/tablesi/ijschamp.html"]]},"1069":{"trophies":[["Iceland national league titles",["2010","2022"],"https://rsssf.org/tablesi/ijschamp.html"]]},"1078":{"trophies":[["Iceland national league titles",["2014"],"https://rsssf.org/tablesi/ijschamp.html"]]},"1090":{"trophies":[["Israel national league titles",["1933/34","1939/40","1943/44","1956/57","1965/66","1968/69","1980/81","1985/86","1987/88","1999/00","2009/10"],"https://rsssf.org/tablesi/israchamp.html"]]},"1097":{"trophies":[["Israel national league titles",["1935/36","1936/37","1941/42","1946/47","1949/50","1951/52","1953/54","1955/56","1957/58","1969/70","1971/72","1976/77","1978/79","1991/92","1994/95","1995/96","2002/03","2012/13","2013/14","2014/15","2018/19","2019/20"],"https://rsssf.org/tablesi/israchamp.html"]]},"7860423":{"trophies":[["Israel national league titles",["1963/64"],"https://rsssf.org/tablesi/israchamp.html"]]},"1095":{"trophies":[["Israel national league titles",["1970/71","1973/74","1977/78","1979/80","1982/83"],"https://rsssf.org/tablesi/israchamp.html"]]},"1300665":{"trophies":[["Israel national league titles",["1981/82"],"https://rsssf.org/tablesi/israchamp.html"]]},"1093":{"trophies":[["Israel national league titles",["1983/84","1984/85","1988/89","1990/91","1993/94","2000/01","2001/02","2003/04","2004/05","2005/06","2008/09","2010/11","2020/21","2021/22","2022/23"],"https://rsssf.org/tablesi/israchamp.html"]]},"1083":{"trophies":[["Israel national league titles",["1986/87","1992/93","1996/97","1997/98","2006/07","2007/08"],"https://rsssf.org/tablesi/israchamp.html"]]},"1087":{"trophies":[["Israel national league titles",["1998/99"],"https://rsssf.org/tablesi/israchamp.html"]]},"1132":{"trophies":[["Italy national league titles",["1898","1899","1900","1902","1903","1904","1914/15","1922/23","1923/24"],"https://rsssf.org/tablesi/italchamp.html"],["Coppa Italia",["1936/37"],"https://rsssf.org/tablesi/italcuphist.html"]]},"1099":{"trophies":[["Italy national league titles",["1901","1906","1907","1950/51","1954/55","1956/57","1958/59","1961/62","1967/68","1978/79","1987/88","1991/92","1992/93","1993/94","1995/96","1998/99","2003/04","2010/11","2021/22"],"https://rsssf.org/tablesi/italchamp.html"],["Coppa Italia",["1966/67","1971/72","1972/73","1976/77","2002/03"],"https://rsssf.org/tablesi/italcuphist.html"],["European Cup / Champions League",["1962/63","1968/69","1988/89","1989/90","1993/94","2002/03","2006/07"],"https://rsssf.org/tablese/ec1.html"]]},"1139":{"trophies":[["Italy national league titles",["1905","1925/26","1930/31","1931/32","1932/33","1933/34","1934/35","1949/50","1951/52","1957/58","1959/60","1960/61","1966/67","1971/72","1972/73","1974/75","1976/77","1977/78","1980/81","1981/82","1983/84","1985/86","1994/95","1996/97","1997/98","2001/02","2002/03","2011/12","2012/13","2013/14","2014/15","2015/16","2016/17","2017/18","2018/19","2019/20"],"https://rsssf.org/tablesi/italchamp.html"],["Coppa Italia",["1937/38","1941/42","1958/59","1959/60","1964/65","1978/79","1982/83","1989/90","1994/95","2014/15","2015/16","2016/17","2017/18","2020/21"],"https://rsssf.org/tablesi/italcuphist.html"],["European Cup / Champions League",["1984/85","1995/96"],"https://rsssf.org/tablese/ec1.html"],["UEFA Cup / Europa League",["1976/77","1989/90","1992/93"],"https://rsssf.org/tablese/ec3b.html"]]},"2218":{"trophies":[["Italy national league titles",["1908","1909","1910/11","1911/12","1912/13","1920/21","1921/22"],"https://rsssf.org/tablesi/italchamp.html"]]},"1135":{"trophies":[["Italy national league titles",["1909/10","1919/20","1929/30","1937/38","1939/40","1952/53","1953/54","1962/63","1964/65","1965/66","1970/71","1979/80","1988/89","2005/06","2006/07","2007/08","2008/09","2009/10","2020/21"],"https://rsssf.org/tablesi/italchamp.html"],["Coppa Italia",["1938/39","1977/78","1981/82","2004/05","2005/06","2009/10","2010/11","2021/22","2022/23"],"https://rsssf.org/tablesi/italcuphist.html"],["European Cup / Champions League",["1963/64","1964/65","2009/10"],"https://rsssf.org/tablese/ec1.html"],["UEFA Cup / Europa League",["1990/91","1993/94","1997/98"],"https://rsssf.org/tablese/ec3b.html"]]},"1111":{"trophies":[["Italy national league titles",["1924/25","1928/29","1935/36","1936/37","1938/39","1940/41","1963/64"],"https://rsssf.org/tablesi/italchamp.html"],["Coppa Italia",["1969/70","1973/74"],"https://rsssf.org/tablesi/italcuphist.html"]]},"1174":{"trophies":[["Italy national league titles",["1927/28","1942/43","1945/46","1946/47","1947/48","1948/49","1975/76"],"https://rsssf.org/tablesi/italchamp.html"],["Coppa Italia",["1935/36","1942/43","1967/68","1970/71","1992/93"],"https://rsssf.org/tablesi/italcuphist.html"]]},"1100":{"trophies":[["Italy national league titles",["1941/42","1982/83","2000/01"],"https://rsssf.org/tablesi/italchamp.html"],["Coppa Italia",["1963/64","1968/69","1979/80","1980/81","1983/84","1985/86","1990/91","2006/07","2007/08"],"https://rsssf.org/tablesi/italcuphist.html"]]},"1129":{"trophies":[["Italy national league titles",["1955/56","1968/69"],"https://rsssf.org/tablesi/italchamp.html"],["Coppa Italia",["1939/40","1960/61","1965/66","1974/75","1995/96","2000/01"],"https://rsssf.org/tablesi/italcuphist.html"]]},"1114":{"trophies":[["Italy national league titles",["1969/70"],"https://rsssf.org/tablesi/italchamp.html"]]},"1140":{"trophies":[["Italy national league titles",["1973/74","1999/00"],"https://rsssf.org/tablesi/italchamp.html"],["Coppa Italia",["1958","1997/98","1999/00","2003/04","2008/09","2012/13","2018/19"],"https://rsssf.org/tablesi/italcuphist.html"]]},"2201":{"trophies":[["Italy national league titles",["1984/85"],"https://rsssf.org/tablesi/italchamp.html"]]},"1150":{"trophies":[["Italy national league titles",["1986/87","1989/90","2022/23"],"https://rsssf.org/tablesi/italchamp.html"],["Coppa Italia",["1961/62","1975/76","1986/87","2011/12","2013/14","2019/20"],"https://rsssf.org/tablesi/italcuphist.html"],["UEFA Cup / Europa League",["1988/89"],"https://rsssf.org/tablese/ec3b.html"]]},"1167":{"trophies":[["Italy national league titles",["1990/91"],"https://rsssf.org/tablesi/italchamp.html"],["Coppa Italia",["1984/85","1987/88","1988/89","1993/94"],"https://rsssf.org/tablesi/italcuphist.html"]]},"1193":{"trophies":[["Japan national league titles",["1965","1966","1967","1968","1970","2012","2013","2015"],"https://rsssf.org/tablesj/japchamp.html"],["J.League Cup (since 1992)",["2022"],"https://rsssf.org/tablesj/japleagcuphist.html"]]},"1195":{"trophies":[["Japan national league titles",["1969","1973","1978","1982","2006"],"https://rsssf.org/tablesj/japchamp.html"],["Emperor\u2019s Cup",["2005","2006","2018","2021"],"https://rsssf.org/tablesj/japcuphist.html"],["J.League Cup (since 1992)",["2003","2016"],"https://rsssf.org/tablesj/japleagcuphist.html"]]},"1185":{"trophies":[["Japan national league titles",["1971","1974","1975","1980"],"https://rsssf.org/tablesj/japchamp.html"],["Emperor\u2019s Cup",["1968","1970","1974","2017"],"https://rsssf.org/tablesj/japcuphist.html"],["J.League Cup (since 1992)",["2017"],"https://rsssf.org/tablesj/japleagcuphist.html"]]},"1190":{"trophies":[["Japan national league titles",["1972","2011"],"https://rsssf.org/tablesj/japchamp.html"],["Emperor\u2019s Cup",["1972","1975","2012"],"https://rsssf.org/tablesj/japcuphist.html"],["J.League Cup (since 1992)",["1999","2013"],"https://rsssf.org/tablesj/japleagcuphist.html"]]},"1187":{"trophies":[["Japan national league titles",["1976","1985/86"],"https://rsssf.org/tablesj/japchamp.html"],["J.League Cup (since 1992)",["2005"],"https://rsssf.org/tablesj/japleagcuphist.html"]]},"1184":{"trophies":[["Japan national league titles",["1977","1979","1981"],"https://rsssf.org/tablesj/japchamp.html"],["Emperor\u2019s Cup",["1994"],"https://rsssf.org/tablesj/japcuphist.html"],["J.League Cup (since 1992)",["2018"],"https://rsssf.org/tablesj/japleagcuphist.html"]]},"1196":{"trophies":[["Japan national league titles",["1983","1984","1986/87","1990/91","1991/92","1993","1994"],"https://rsssf.org/tablesj/japchamp.html"],["Emperor\u2019s Cup",["1996"],"https://rsssf.org/tablesj/japcuphist.html"],["J.League Cup (since 1992)",["1992","1993","1994"],"https://rsssf.org/tablesj/japleagcuphist.html"]]},"1188":{"trophies":[["Japan national league titles",["1987/88","1997","1999","2002"],"https://rsssf.org/tablesj/japchamp.html"],["Emperor\u2019s Cup",["2003"],"https://rsssf.org/tablesj/japcuphist.html"],["J.League Cup (since 1992)",["1998","2010"],"https://rsssf.org/tablesj/japleagcuphist.html"]]},"1198":{"trophies":[["Japan national league titles",["1988/89","1989/90","1995","2003","2004","2019","2022"],"https://rsssf.org/tablesj/japchamp.html"],["Emperor\u2019s Cup",["1983","1985","1988","1989","1991","1992","2013"],"https://rsssf.org/tablesj/japcuphist.html"],["J.League Cup (since 1992)",["2001"],"https://rsssf.org/tablesj/japleagcuphist.html"]]},"1189":{"trophies":[["Japan national league titles",["1996","1998","2000","2001","2007","2008","2009","2016"],"https://rsssf.org/tablesj/japchamp.html"],["Emperor\u2019s Cup",["1997","2000","2007","2010","2016"],"https://rsssf.org/tablesj/japcuphist.html"],["J.League Cup (since 1992)",["1997","2000","2002","2011","2012","2015"],"https://rsssf.org/tablesj/japleagcuphist.html"]]},"1186":{"trophies":[["Japan national league titles",["2005","2014"],"https://rsssf.org/tablesj/japchamp.html"],["Emperor\u2019s Cup",["2008","2009","2014","2015"],"https://rsssf.org/tablesj/japcuphist.html"],["J.League Cup (since 1992)",["2007","2014"],"https://rsssf.org/tablesj/japleagcuphist.html"]]},"1191":{"trophies":[["Japan national league titles",["2010"],"https://rsssf.org/tablesj/japchamp.html"],["Emperor\u2019s Cup",["1995","1999"],"https://rsssf.org/tablesj/japcuphist.html"],["J.League Cup (since 1992)",["2021"],"https://rsssf.org/tablesj/japleagcuphist.html"]]},"107296":{"trophies":[["Japan national league titles",["2017","2018","2020","2021"],"https://rsssf.org/tablesj/japchamp.html"],["Emperor\u2019s Cup",["2020"],"https://rsssf.org/tablesj/japcuphist.html"],["J.League Cup (since 1992)",["2019"],"https://rsssf.org/tablesj/japleagcuphist.html"]]},"8404703":{"trophies":[["Latvia national league titles",["2015"],"https://rsssf.org/tablesl/letchamp.html"]]},"47053664":{"trophies":[["Latvia national league titles",["2018","2019","2020"],"https://rsssf.org/tablesl/letchamp.html"]]},"483870":{"trophies":[["Latvia national league titles",["2022"],"https://rsssf.org/tablesl/letchamp.html"]]},"1101511":{"trophies":[["Malaysia national league titles",["1982","1998","2001"],"https://rsssf.org/tablesm/malaychamp.html"]]},"106694":{"trophies":[["Malaysia national league titles",["1984","1989","1990","2000","2009","2010"],"https://rsssf.org/tablesm/malaychamp.html"]]},"106696":{"trophies":[["Malaysia national league titles",["1996"],"https://rsssf.org/tablesm/malaychamp.html"]]},"135382":{"trophies":[["Malaysia national league titles",["2002","2003"],"https://rsssf.org/tablesm/malaychamp.html"]]},"135362":{"trophies":[["Malaysia national league titles",["2005/06"],"https://rsssf.org/tablesm/malaychamp.html"]]},"135371":{"trophies":[["Malaysia national league titles",["2011","2012"],"https://rsssf.org/tablesm/malaychamp.html"]]},"1039":{"trophies":[["Netherlands national league titles",["1908/09","1910/11","1911/12","1912/13","1914/15 (emergency competition)","1958/59"],"https://rsssf.org/tablesn/nedchamp.html"],["KNVB Cup",["1958","1962","1966"],"https://rsssf.org/tablesn/nedcuphist.html"]]},"1047":{"trophies":[["Netherlands national league titles",["1915/16","1951/52","1954/55"],"https://rsssf.org/tablesn/nedchamp.html"],["KNVB Cup",["1944","1963"],"https://rsssf.org/tablesn/nedcuphist.html"]]},"1015":{"trophies":[["Netherlands national league titles",["1916/17","1921/22","1929/30","1932/33"],"https://rsssf.org/tablesn/nedchamp.html"]]},"992":{"trophies":[["Netherlands national league titles",["1917/18","1918/19","1930/31","1931/32","1933/34","1936/37","1938/39","1946/47","1956/57","1959/60","1965/66","1966/67","1967/68","1969/70","1971/72","1972/73","1976/77","1978/79","1979/80","1981/82","1982/83","1984/85","1989/90","1993/94","1994/95","1995/96","1997/98","2001/02","2003/04","2010/11","2011/12","2012/13","2013/14","2018/19","2020/21","2021/22"],"https://rsssf.org/tablesn/nedchamp.html"],["KNVB Cup",["1917","1943","1961","1967","1970","1971","1972","1979","1983","1986","1987","1993","1998","1999","2002","2006","2007","2010","2019","2021"],"https://rsssf.org/tablesn/nedcuphist.html"],["European Cup / Champions League",["1970/71","1971/72","1972/73","1994/95"],"https://rsssf.org/tablese/ec1.html"],["UEFA Cup / Europa League",["1991/92"],"https://rsssf.org/tablese/ec3b.html"]]},"1013":{"trophies":[["Netherlands national league titles",["1923/24","1927/28","1935/36","1937/38","1939/40 (emergency competition)","1960/61","1961/62","1964/65","1968/69","1970/71","1973/74","1983/84","1992/93","1998/99","2016/17","2022/23"],"https://rsssf.org/tablesn/nedchamp.html"],["KNVB Cup",["1930","1935","1965","1969","1980","1984","1992","1994","1995","2008","2016","2018"],"https://rsssf.org/tablesn/nedcuphist.html"],["European Cup / Champions League",["1969/70"],"https://rsssf.org/tablese/ec1.html"],["UEFA Cup / Europa League",["1973/74","2001/02"],"https://rsssf.org/tablese/ec3b.html"]]},"1028":{"trophies":[["Netherlands national league titles",["1928/29","1934/35","1950/51","1962/63","1974/75","1975/76","1977/78","1985/86","1986/87","1987/88","1988/89","1990/91","1991/92","1996/97","1999/00","2000/01","2002/03","2004/05","2005/06","2006/07","2007/08","2014/15","2015/16","2017/18"],"https://rsssf.org/tablesn/nedchamp.html"],["KNVB Cup",["1950","1974","1976","1988","1989","1990","1996","2005","2012","2022","2023"],"https://rsssf.org/tablesn/nedcuphist.html"],["European Cup / Champions League",["1987/88"],"https://rsssf.org/tablese/ec1.html"],["UEFA Cup / Europa League",["1977/78"],"https://rsssf.org/tablese/ec3b.html"]]},"1002":{"trophies":[["Netherlands national league titles",["1953/54"],"https://rsssf.org/tablesn/nedchamp.html"],["KNVB Cup",["1937"],"https://rsssf.org/tablesn/nedcuphist.html"]]},"1009":{"trophies":[["Netherlands national league titles",["2009/10"],"https://rsssf.org/tablesn/nedchamp.html"],["KNVB Cup",["1977","2001","2011"],"https://rsssf.org/tablesn/nedcuphist.html"]]},"1284":{"trophies":[["Northern Ireland national league titles",["1890/91","1891/92","1892/93","1894/95","1897/98","1901/02","1903/04","1906/07","1907/08","1908/09","1910/11","1913/14","1915/16","1917/18","1921/22","1922/23","1929/30","1931/32","1933/34","1934/35","1942/43","1944/45","1945/46","1948/49","1949/50","1953/54","1954/55","1955/56","1958/59","1960/61","1961/62","1965/66","1968/69","1970/71","1974/75","1977/78","1978/79","1979/80","1981/82","1982/83","1983/84","1984/85","1985/86","1986/87","1988/89","1992/93","1993/94","1999/00","2000/01","2003/04","2005/06","2006/07","2007/08","2009/10","2010/11","2011/12","2016/17","2018/19","2019/20","2020/21","2021/22"],"https://rsssf.org/tablesn/nilchamp.html"],["Irish Cup",["1890/91","1891/92","1892/93","1894/95","1897/98","1898/99","1901/02","1903/04","1912/13","1914/15","1915/16","1918/19","1921/22","1922/23","1929/30","1930/31","1933/34","1935/36","1938/39","1941/42","1944/45","1945/46","1947/48","1949/50","1952/53","1959/60","1961/62","1962/63","1969/70","1977/78","1979/80","1981/82","1993/94","1994/95","2001/02","2005/06","2006/07","2007/08","2009/10","2010/11","2011/12","2016/17","2020/21"],"https://rsssf.org/tablesn/nilcuphist.html"]]},"1282":{"trophies":[["Northern Ireland national league titles",["1893/94","1896/97","1904/05","1911/12","1912/13","1916/17","1920/21","1924/25","1930/31","1950/51","1952/53","1963/64","1966/67","1967/68","1969/70","1971/72","1976/77","1980/81","1987/88","1991/92","1998/99","2002/03","2004/05","2008/09"],"https://rsssf.org/tablesn/nilchamp.html"],["Irish Cup",["1913/14","1916/17","1920/21","1931/32","1932/33","1934/35","1950/51","1965/66","1972/73","1982/83","1984/85","1985/86","1986/87","1987/88","1989/90","1995/96","1997/98","1999/00","2000/01","2003/04","2012/13","2014/15","2019/20"],"https://rsssf.org/tablesn/nilcuphist.html"]]},"1280":{"trophies":[["Northern Ireland national league titles",["1895/96","1898/99","1900/01","1902/03","1962/63"],"https://rsssf.org/tablesn/nilchamp.html"],["Irish Cup",["1883/84","1884/85","1885/86","1888/89","1893/94","1895/96","1902/03","1904/05","1909/10","1924/25","1955/56","1970/71"],"https://rsssf.org/tablesn/nilcuphist.html"]]},"1277":{"trophies":[["Northern Ireland national league titles",["1909/10","1997/98","2012/13","2013/14"],"https://rsssf.org/tablesn/nilchamp.html"],["Irish Cup",["1882/83","1887/88","1896/97","1899/00","1900/01","1906/07","1908/09","1978/79"],"https://rsssf.org/tablesn/nilcuphist.html"]]},"1281":{"trophies":[["Northern Ireland national league titles",["1951/52","1956/57","1959/60"],"https://rsssf.org/tablesn/nilchamp.html"],["Irish Cup",["1956/57","1958/59","1960/61","1991/92","1996/97","2013/14","2015/16"],"https://rsssf.org/tablesn/nilcuphist.html"]]},"1272":{"trophies":[["Northern Ireland national league titles",["1957/58"],"https://rsssf.org/tablesn/nilchamp.html"],["Irish Cup",["1926/27","1951/52","1968/69","1973/74"],"https://rsssf.org/tablesn/nilcuphist.html"]]},"1279":{"trophies":[["Northern Ireland national league titles",["1972/73","1975/76","1994/95","1996/97","2014/15","2015/16","2017/18"],"https://rsssf.org/tablesn/nilchamp.html"],["Irish Cup",["1966/67","1967/68","2008/09","2018/19","2021/22","2022/23"],"https://rsssf.org/tablesn/nilcuphist.html"]]},"1278":{"trophies":[["Northern Ireland national league titles",["1973/74"],"https://rsssf.org/tablesn/nilchamp.html"],["Irish Cup",["1964/65","1971/72","1974/75","1976/77","2002/03","2017/18"],"https://rsssf.org/tablesn/nilcuphist.html"]]},"1288":{"trophies":[["Northern Ireland national league titles",["1989/90","1990/91","1995/96","2001/02"],"https://rsssf.org/tablesn/nilchamp.html"],["Irish Cup",["1990/91","1998/99","2004/05"],"https://rsssf.org/tablesn/nilcuphist.html"]]},"1283":{"trophies":[["Northern Ireland national league titles",["2022/23"],"https://rsssf.org/tablesn/nilchamp.html"]]},"1312":{"trophies":[["Norway national league titles",["1937/38","1938/39","1948/49","1950/51","1951/52","1953/54","1956/57","1959/60","1960/61"],"https://rsssf.org/tablesn/noochamp.html"],["Norwegian Cup",["1932","1935","1936","1938","1940","1950","1957","1961","1966","1984","2006"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1422":{"trophies":[["Norway national league titles",["1957/58","1972","1973","1974","1975","1979","1982","1991"],"https://rsssf.org/tablesn/noochamp.html"],["Norwegian Cup",["1953","1959","1979","1989","2001","2019"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1341":{"trophies":[["Norway national league titles",["1958/59","1976","1977","1986","1989"],"https://rsssf.org/tablesn/noochamp.html"],["Norwegian Cup",["1977","1978","1981","1985","2007","2017"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1378":{"trophies":[["Norway national league titles",["1961/62","1963","2007"],"https://rsssf.org/tablesn/noochamp.html"],["Norwegian Cup",["1923","1925","1972","1976","1982","2004"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1387":{"trophies":[["Norway national league titles",["1966"],"https://rsssf.org/tablesn/noochamp.html"],["Norwegian Cup",["1947","1954","1955","1956","1958","1963","1965","1974"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1376":{"trophies":[["Norway national league titles",["1967","1969","1971","1985","1988","1990","1992","1993","1994","1995","1996","1997","1998","1999","2000","2001","2002","2003","2004","2006","2009","2010","2015","2016","2017","2018"],"https://rsssf.org/tablesn/noochamp.html"],["Norwegian Cup",["1960","1964","1971","1988","1990","1992","1995","1999","2003","2015","2016","2018"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1404":{"trophies":[["Norway national league titles",["1970","2013"],"https://rsssf.org/tablesn/noochamp.html"],["Norwegian Cup",["1969","1970","1973","1991","2010"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1355":{"trophies":[["Norway national league titles",["1987"],"https://rsssf.org/tablesn/noochamp.html"],["Norwegian Cup",["1983"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1426":{"trophies":[["Norway national league titles",["2005"],"https://rsssf.org/tablesn/noochamp.html"],["Norwegian Cup",["1997","2002","2008"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1353":{"trophies":[["Norway national league titles",["2011","2012","2014","2019","2022"],"https://rsssf.org/tablesn/noochamp.html"],["Norwegian Cup",["1994","2005","2013","2014","2021/22"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1293":{"trophies":[["Norway national league titles",["2020","2021"],"https://rsssf.org/tablesn/noochamp.html"],["Norwegian Cup",["1975","1993"],"https://rsssf.org/tablesn/noocuphist.html"]]},"117754":{"trophies":[["Peru national league titles",["1918","1919","1927","1928","1931","1932","1933","1948","1952","1954","1955","1962","1963","1965","1975","1977","1978","1997","2001","2003","2004","2006","2017","2021","2022"],"https://rsssf.org/tablesp/peruchamp.html"]]},"1450":{"trophies":[["Peru national league titles",["1929","1934","1939","1941","1945","1946","1949","1959","1960","1964","1966","1967","1969","1971","1974","1982","1985","1987","1990","1992","1993","1998","1999","2000","2009","2013"],"https://rsssf.org/tablesp/peruchamp.html"]]},"303816":{"trophies":[["Peru national league titles",["1935","1937","1942","1951","1958","1984"],"https://rsssf.org/tablesp/peruchamp.html"]]},"1446":{"trophies":[["Peru national league titles",["1938","1940","1943","1950"],"https://rsssf.org/tablesp/peruchamp.html"]]},"1449":{"trophies":[["Peru national league titles",["1956","1961","1968","1970","1972","1979","1980","1983","1988","1991","1994","1995","1996","2002","2005","2012","2014","2016","2018","2020"],"https://rsssf.org/tablesp/peruchamp.html"]]},"303815":{"trophies":[["Peru national league titles",["1981","2015"],"https://rsssf.org/tablesp/peruchamp.html"]]},"77029556":{"trophies":[["Peru national league titles",["2019"],"https://rsssf.org/tablesp/peruchamp.html"]]},"129583":{"trophies":[["Poland national league titles",["1921","1930","1932","1937","1948"],"https://rsssf.org/tablesp/polchamp.html"],["Polish Cup",["2020"],"https://rsssf.org/tablesp/polcuphist.html"]]},"1300881":{"trophies":[["Poland national league titles",["1927","1928","1949","1950","1977/78","1998/99","2000/01","2002/03","2003/04","2004/05","2007/08","2008/09","2010/11"],"https://rsssf.org/tablesp/polchamp.html"],["Polish Cup",["1926","1967","2000","2003"],"https://rsssf.org/tablesp/polcuphist.html"]]},"710032":{"trophies":[["Poland national league titles",["1929","1947"],"https://rsssf.org/tablesp/polchamp.html"]]},"1462":{"trophies":[["Poland national league titles",["1933","1934","1935","1936","1938","1951","1952","1953","1960","1967/68","1973/74","1974/75","1978/79","1988/89"],"https://rsssf.org/tablesp/polchamp.html"],["Polish Cup",["1974","1996"],"https://rsssf.org/tablesp/polcuphist.html"]]},"1300879":{"trophies":[["Poland national league titles",["1946","1999/00"],"https://rsssf.org/tablesp/polchamp.html"]]},"1456":{"trophies":[["Poland national league titles",["1955","1956","1968/69","1969/70","1993/94","1994/95","2001/02","2005/06","2012/13","2013/14","2015/16","2016/17","2017/18","2019/20","2020/21"],"https://rsssf.org/tablesp/polchamp.html"],["Polish Cup",["1955","1956","1964","1966","1973","1980","1981","1989","1990","1994","1995","1997","2008","2011","2012","2015","2016","2018","2023"],"https://rsssf.org/tablesp/polcuphist.html"]]},"1452":{"trophies":[["Poland national league titles",["1957","1959","1961","1962/63","1963/64","1964/65","1965/66","1966/67","1970/71","1971/72","1984/85","1985/86","1986/87","1987/88"],"https://rsssf.org/tablesp/polchamp.html"],["Polish Cup",["1965","1968","1969","1970","1971","1972","2001"],"https://rsssf.org/tablesp/polcuphist.html"]]},"715911":{"trophies":[["Poland national league titles",["1972/73","1975/76"],"https://rsssf.org/tablesp/polchamp.html"]]},"1300885":{"trophies":[["Poland national league titles",["1976/77","2011/12"],"https://rsssf.org/tablesp/polchamp.html"],["Polish Cup",["1976","1987","2013"],"https://rsssf.org/tablesp/polcuphist.html"]]},"1468":{"trophies":[["Poland national league titles",["1980/81","1981/82","1995/96","1996/97"],"https://rsssf.org/tablesp/polchamp.html"],["Polish Cup",["1985"],"https://rsssf.org/tablesp/polcuphist.html"]]},"1455":{"trophies":[["Poland national league titles",["1982/83","1983/84","1989/90","1991/92","1992/93","2009/10","2014/15","2021/22"],"https://rsssf.org/tablesp/polchamp.html"],["Polish Cup",["1982","1984","1988","2004","2009"],"https://rsssf.org/tablesp/polcuphist.html"]]},"1469":{"trophies":[["Poland national league titles",["1990/91","2006/07"],"https://rsssf.org/tablesp/polchamp.html"],["Polish Cup",["2006"],"https://rsssf.org/tablesp/polcuphist.html"]]},"1478":{"trophies":[["Portuguese league titles",["1934/35","1938/39","1939/40","1955/56","1958/59","1977/78","1978/79","1984/85","1985/86","1987/88","1989/90","1991/92","1992/93","1994/95","1995/96","1996/97","1997/98","1998/99","2002/03","2003/04","2005/06","2006/07","2007/08","2008/09","2010/11","2011/12","2012/13","2017/18","2019/20","2021/22"],"https://rsssf.org/tablesp/portchamp.html"],["Ta\u00e7a de Portugal",["1955/56","1957/58","1967/68","1976/77","1983/84","1987/88","1990/91","1993/94","1997/98","1999/00","2000/01","2002/03","2005/06","2008/09","2009/10","2010/11","2019/20","2021/22","2022/23"],"https://rsssf.org/tablesp/portcuphist.html"],["European Cup / Champions League",["1986/87","2003/04"],"https://rsssf.org/tablese/ec1.html"],["UEFA Cup / Europa League",["2002/03","2010/11"],"https://rsssf.org/tablese/ec3b.html"]]},"1487":{"trophies":[["Portuguese league titles",["1935/36","1936/37","1937/38","1941/42","1942/43","1944/45","1949/50","1954/55","1956/57","1959/60","1960/61","1962/63","1963/64","1964/65","1966/67","1967/68","1968/69","1970/71","1971/72","1972/73","1974/75","1975/76","1976/77","1980/81","1982/83","1983/84","1986/87","1988/89","1990/91","1993/94","2004/05","2009/10","2013/14","2014/15","2015/16","2016/17","2018/19","2022/23"],"https://rsssf.org/tablesp/portchamp.html"],["Ta\u00e7a de Portugal",["1939/40","1942/43","1943/44","1948/49","1950/51","1951/52","1952/53","1954/55","1956/57","1958/59","1961/62","1963/64","1968/69","1969/70","1971/72","1979/80","1980/81","1982/83","1984/85","1985/86","1986/87","1992/93","1995/96","2003/04","2013/14","2016/17"],"https://rsssf.org/tablesp/portcuphist.html"],["European Cup / Champions League",["1960/61","1961/62"],"https://rsssf.org/tablese/ec1.html"]]},"1489":{"trophies":[["Portuguese league titles",["1940/41","1943/44","1946/47","1947/48","1948/49","1950/51","1951/52","1952/53","1953/54","1957/58","1961/62","1965/66","1969/70","1973/74","1979/80","1981/82","1999/00","2001/02","2020/21"],"https://rsssf.org/tablesp/portchamp.html"],["Ta\u00e7a de Portugal",["1940/41","1944/45","1945/46","1947/48","1953/54","1962/63","1970/71","1972/73","1973/74","1977/78","1981/82","1994/95","2001/02","2006/07","2007/08","2014/15","2018/19"],"https://rsssf.org/tablesp/portcuphist.html"]]},"1474":{"trophies":[["Portuguese league titles",["1945/46"],"https://rsssf.org/tablesp/portchamp.html"],["Ta\u00e7a de Portugal",["1941/42","1959/60","1988/89"],"https://rsssf.org/tablesp/portcuphist.html"]]},"1471":{"trophies":[["Portuguese league titles",["2000/01"],"https://rsssf.org/tablesp/portchamp.html"],["Ta\u00e7a de Portugal",["1974/75","1975/76","1978/79","1991/92","1996/97"],"https://rsssf.org/tablesp/portcuphist.html"]]},"596":{"trophies":[["Republic of Ireland national league titles",["1922/23","1924/25","1926/27","1931/32","1937/38","1938/39","1953/54","1956/57","1958/59","1963/64","1983/84","1984/85","1985/86","1986/87","1993/94","2010","2011","2020","2021","2022"],"https://rsssf.org/tablesi/ierchamp.html"],["FAI Cup",["1925","1929","1930","1931","1932","1933","1936","1940","1944","1945","1948","1955","1956","1962","1964","1965","1966","1967","1968","1969","1978","1985","1986","1987","2019"],"https://rsssf.org/tablesi/iercuphist.html"]]},"588":{"trophies":[["Republic of Ireland national league titles",["1923/24","1927/28","1929/30","1933/34","1935/36","1974/75","1977/78","2000/01","2002/03","2008","2009"],"https://rsssf.org/tablesi/ierchamp.html"],["FAI Cup",["1928","1935","1970","1976","1992","2001","2008"],"https://rsssf.org/tablesi/iercuphist.html"]]},"597":{"trophies":[["Republic of Ireland national league titles",["1925/26","1928/29","1930/31","1943/44","1946/47","1952/53","1961/62","1991/92","1999/00","2001/02","2003","2004","2006"],"https://rsssf.org/tablesi/ierchamp.html"],["FAI Cup",["1939","1960","1963","1993","1996","1997","2000"],"https://rsssf.org/tablesi/iercuphist.html"]]},"592":{"trophies":[["Republic of Ireland national league titles",["1932/33","1962/63","1966/67","1975/76","1978/79","1981/82","1987/88","1990/91","1994/95","2014","2015","2016","2018","2019"],"https://rsssf.org/tablesi/ierchamp.html"],["FAI Cup",["1942","1949","1952","1958","1977","1979","1981","1988","2002","2015","2018","2020"],"https://rsssf.org/tablesi/iercuphist.html"]]},"598":{"trophies":[["Republic of Ireland national league titles",["1936/37","1976/77","2012"],"https://rsssf.org/tablesi/ierchamp.html"],["FAI Cup",["1983","1994","2010","2011","2013"],"https://rsssf.org/tablesi/iercuphist.html"]]},"599":{"trophies":[["Republic of Ireland national league titles",["1951/52","1954/55","1955/56","1989/90","1995/96","1997/98","1998/99","2013"],"https://rsssf.org/tablesi/ierchamp.html"]]},"52085341":{"trophies":[["Republic of Ireland national league titles",["1965/66","1967/68","1968/69","1969/70","1971/72","1972/73"],"https://rsssf.org/tablesi/ierchamp.html"],["FAI Cup",["1937","1980"],"https://rsssf.org/tablesi/iercuphist.html"]]},"587":{"trophies":[["Republic of Ireland national league titles",["1980/81","1982/83"],"https://rsssf.org/tablesi/ierchamp.html"],["FAI Cup",["1924"],"https://rsssf.org/tablesi/iercuphist.html"]]},"591":{"trophies":[["Republic of Ireland national league titles",["1988/89","1996/97"],"https://rsssf.org/tablesi/ierchamp.html"],["FAI Cup",["1989","1995","2003","2006","2012","2022"],"https://rsssf.org/tablesi/iercuphist.html"]]},"590":{"trophies":[["Republic of Ireland national league titles",["1992/93","2005","2017"],"https://rsssf.org/tablesi/ierchamp.html"],["FAI Cup",["1998","2007","2016","2017"],"https://rsssf.org/tablesi/iercuphist.html"]]},"1529":{"trophies":[["Russia national league titles",["1992","1993","1994","1996","1997","1998","1999","2000","2001","2016/17"],"https://rsssf.org/tablesr/ruschamp.html"]]},"1530":{"trophies":[["Russia national league titles",["1995"],"https://rsssf.org/tablesr/ruschamp.html"]]},"1525":{"trophies":[["Russia national league titles",["2002","2004","2017/18"],"https://rsssf.org/tablesr/ruschamp.html"]]},"1518":{"trophies":[["Russia national league titles",["2003","2005","2006","2012/13","2013/14","2015/16"],"https://rsssf.org/tablesr/ruschamp.html"],["UEFA Cup / Europa League",["2004/05"],"https://rsssf.org/tablese/ec3b.html"]]},"1301108":{"trophies":[["Russia national league titles",["2007","2010","2011/12","2014/15","2018/19","2019/20","2020/21","2021/22","2022/23"],"https://rsssf.org/tablesr/ruschamp.html"],["UEFA Cup / Europa League",["2007/08"],"https://rsssf.org/tablese/ec3b.html"]]},"130509":{"trophies":[["Russia national league titles",["2008","2009"],"https://rsssf.org/tablesr/ruschamp.html"]]},"1554":{"trophies":[["Scotland national league titles",["1891","1892"],"https://rsssf.org/tabless/scotchamp.html"],["Scottish Cup",["1883"],"https://rsssf.org/tabless/scotcuphist.html"]]},"1570":{"trophies":[["Scotland national league titles",["1891","1899","1900","1901","1902","1911","1912","1913","1918","1920","1921","1923","1924","1925","1927","1928","1929","1930","1931","1933","1934","1935","1937","1939","1947","1949","1950","1953","1956","1957","1959","1961","1963","1964","1975","1976","1978","1987","1989","1990","1991","1992","1993","1994","1995","1996","1997","1999","2000","2003","2005","2009","2010","2011","2021"],"https://rsssf.org/tabless/scotchamp.html"],["Scottish Cup",["1894","1897","1898","1903","1928","1930","1932","1934","1935","1936","1948","1949","1950","1953","1960","1962","1963","1964","1966","1973","1976","1978","1979","1981","1992","1993","1996","1999","2000","2002","2003","2008","2009","2022"],"https://rsssf.org/tabless/scotcuphist.html"],["Scottish League Cup",["1946/47","1948/49","1960/61","1961/62","1963/64","1964/65","1970/71","1975/76","1977/78","1978/79","1981/82","1983/84","1984/85","1986/87","1987/88","1988/89","1990/91","1992/93","1993/94","1996/97","1998/99","2001/02","2002/03","2004/05","2007/08","2009/10","2010/11"],"https://rsssf.org/tabless/scotleagcuphist.html"]]},"1569":{"trophies":[["Scotland national league titles",["1893","1894","1896","1898","1905","1906","1907","1908","1909","1910","1914","1915","1916","1917","1919","1922","1926","1936","1938","1954","1966","1967","1968","1969","1970","1971","1972","1973","1974","1977","1979","1981","1982","1986","1988","1998","2001","2002","2004","2006","2007","2008","2012","2013","2014","2015","2016","2017","2018","2019","2020","2022","2023"],"https://rsssf.org/tabless/scotchamp.html"],["Scottish Cup",["1892","1899","1900","1904","1907","1908","1911","1912","1914","1923","1925","1927","1931","1933","1937","1951","1954","1965","1967","1969","1971","1972","1974","1975","1977","1980","1985","1988","1989","1995","2001","2004","2005","2007","2011","2013","2017","2018","2019","2020","2023"],"https://rsssf.org/tabless/scotcuphist.html"],["Scottish League Cup",["1956/57","1957/58","1965/66","1966/67","1967/68","1968/69","1969/70","1974/75","1982/83","1997/98","1999/00","2000/01","2005/06","2008/09","2014/15","2016/17","2017/18","2018/19","2019/20","2021/22","2022/23"],"https://rsssf.org/tabless/scotleagcuphist.html"],["European Cup / Champions League",["1966/67"],"https://rsssf.org/tablese/ec1.html"]]},"1573":{"trophies":[["Scotland national league titles",["1895","1897","1958","1960"],"https://rsssf.org/tabless/scotchamp.html"],["Scottish Cup",["1891","1896","1901","1906","1956","1998","2006","2012"],"https://rsssf.org/tabless/scotcuphist.html"],["Scottish League Cup",["1954/55","1958/59","1959/60","1962/63"],"https://rsssf.org/tabless/scotleagcuphist.html"]]},"1575":{"trophies":[["Scotland national league titles",["1903","1948","1951","1952"],"https://rsssf.org/tabless/scotchamp.html"],["Scottish Cup",["1887","1902","2016"],"https://rsssf.org/tabless/scotcuphist.html"],["Scottish League Cup",["1972/73","1991/92","2006/07"],"https://rsssf.org/tabless/scotleagcuphist.html"]]},"1584":{"trophies":[["Scotland national league titles",["1932"],"https://rsssf.org/tabless/scotchamp.html"],["Scottish Cup",["1952","1991"],"https://rsssf.org/tabless/scotcuphist.html"],["Scottish League Cup",["1950/51"],"https://rsssf.org/tabless/scotleagcuphist.html"]]},"1536":{"trophies":[["Scotland national league titles",["1955","1980","1984","1985"],"https://rsssf.org/tabless/scotchamp.html"],["Scottish Cup",["1947","1970","1982","1983","1984","1986","1990"],"https://rsssf.org/tabless/scotcuphist.html"],["Scottish League Cup",["1955/56","1976/77","1985/86","1989/90","1995/96","2013/14"],"https://rsssf.org/tabless/scotleagcuphist.html"]]},"1555":{"trophies":[["Scotland national league titles",["1962"],"https://rsssf.org/tabless/scotchamp.html"],["Scottish Cup",["1910"],"https://rsssf.org/tabless/scotcuphist.html"],["Scottish League Cup",["1951/52","1952/53","1973/74"],"https://rsssf.org/tabless/scotleagcuphist.html"]]},"1580":{"trophies":[["Scotland national league titles",["1965"],"https://rsssf.org/tabless/scotchamp.html"],["Scottish Cup",["1920","1929","1997"],"https://rsssf.org/tabless/scotcuphist.html"],["Scottish League Cup",["2011/12"],"https://rsssf.org/tabless/scotleagcuphist.html"]]},"1556":{"trophies":[["Scotland national league titles",["1983"],"https://rsssf.org/tabless/scotchamp.html"],["Scottish Cup",["1994","2010"],"https://rsssf.org/tabless/scotcuphist.html"],["Scottish League Cup",["1979/80","1980/81"],"https://rsssf.org/tabless/scotleagcuphist.html"]]},"1955":{"trophies":[["Serbian / Serbia and Montenegro league titles (since 1991)",["1991/92","1994/95","1999/00","2000/01","2003/04","2005/06","2006/07","2013/14","2015/16","2017/18","2018/19","2019/20","2020/21","2021/22","2022/23"],"https://rsssf.org/tablesj/joegchamp.html"],["European Cup / Champions League",["1990/91"],"https://rsssf.org/tablese/ec1.html"]]},"1952":{"trophies":[["Serbian / Serbia and Montenegro league titles (since 1991)",["1992/93","1993/94","1995/96","1996/97","1998/99","2001/02","2002/03","2004/05","2007/08","2008/09","2009/10","2010/11","2011/12","2012/13","2014/15","2016/17"],"https://rsssf.org/tablesj/joegchamp.html"]]},"1622":{"trophies":[["Slovak league titles (since 1993)",["1993/94","1994/95","1995/96","1998/99","2008/09","2010/11","2012/13","2013/14","2018/19","2019/20","2020/21","2021/22","2022/23"],"https://rsssf.org/tabless/slowchamp.html"]]},"1620":{"trophies":[["Slovak league titles (since 1993)",["2001/02","2002/03","2003/04","2006/07","2009/10","2011/12","2016/17"],"https://rsssf.org/tabless/slowchamp.html"]]},"1301169":{"trophies":[["Slovak league titles (since 1993)",["2004/05","2007/08"],"https://rsssf.org/tabless/slowchamp.html"]]},"130873":{"trophies":[["Slovak league titles (since 1993)",["2005/06"],"https://rsssf.org/tabless/slowchamp.html"]]},"130872":{"trophies":[["Slovak league titles (since 1993)",["2014/15","2015/16"],"https://rsssf.org/tabless/slowchamp.html"]]},"1623":{"trophies":[["Slovak league titles (since 1993)",["2017/18"],"https://rsssf.org/tabless/slowchamp.html"]]},"1627":{"trophies":[["Slovenian league titles (since 1991)",["1995/96","2003/04","2004/05","2005/06"],"https://rsssf.org/tabless/slovchamp.html"]]},"1629":{"trophies":[["Slovenian league titles (since 1991)",["1996/97","1997/98","1998/99","1999/00","2000/01","2001/02","2002/03","2008/09","2010/11","2011/12","2012/13","2013/14","2014/15","2016/17","2018/19","2021/22"],"https://rsssf.org/tabless/slovchamp.html"]]},"128652":{"trophies":[["Slovenian league titles (since 1991)",["2006/07","2007/08"],"https://rsssf.org/tabless/slovchamp.html"]]},"1632":{"trophies":[["Slovenian league titles (since 1991)",["2009/10"],"https://rsssf.org/tabless/slovchamp.html"]]},"1639":{"trophies":[["Slovenian league titles (since 1991)",["2015/16","2017/18","2022/23"],"https://rsssf.org/tabless/slovchamp.html"]]},"1637":{"trophies":[["Slovenian league titles (since 1991)",["2019/20"],"https://rsssf.org/tabless/slovchamp.html"]]},"1630":{"trophies":[["Slovenian league titles (since 1991)",["2020/21"],"https://rsssf.org/tabless/slovchamp.html"]]},"1708":{"trophies":[["Spain national league titles",["1928/29","1944/45","1947/48","1948/49","1951/52","1952/53","1958/59","1959/60","1973/74","1984/85","1990/91","1991/92","1992/93","1993/94","1997/98","1998/99","2004/05","2005/06","2008/09","2009/10","2010/11","2012/13","2014/15","2015/16","2017/18","2018/19","2022/23"],"https://rsssf.org/tabless/spanchamp.html"],["Copa del Rey",["1910","1912","1913","1920","1922","1925","1926","1928","1942","1951","1952","1953","1957","1959","1963","1968","1971","1978","1981","1983","1988","1990","1997","1998","2009","2012","2015","2016","2017","2018","2021"],"https://rsssf.org/tabless/spancuphist.html"],["European Cup / Champions League",["1991/92","2005/06","2008/09","2010/11","2014/15"],"https://rsssf.org/tablese/ec1.html"]]},"1664":{"trophies":[["Spain national league titles",["1929/30","1930/31","1933/34","1935/36","1942/43","1955/56","1982/83","1983/84"],"https://rsssf.org/tabless/spanchamp.html"],["Copa del Rey",["1903","1904","1910","1911","1914","1915","1916","1921","1923","1930","1931","1932","1933","1943","1944","1945","1950","1955","1956","1958","1969","1973","1984"],"https://rsssf.org/tabless/spancuphist.html"]]},"1736":{"trophies":[["Spain national league titles",["1931/32","1932/33","1953/54","1954/55","1956/57","1957/58","1960/61","1961/62","1962/63","1963/64","1964/65","1966/67","1967/68","1968/69","1971/72","1974/75","1975/76","1977/78","1978/79","1979/80","1985/86","1986/87","1987/88","1988/89","1989/90","1994/95","1996/97","2000/01","2002/03","2006/07","2007/08","2011/12","2016/17","2019/20","2021/22"],"https://rsssf.org/tabless/spanchamp.html"],["Copa del Rey",["1905","1906","1907","1908","1917","1934","1936","1946","1947","1962","1970","1974","1975","1980","1982","1989","1993","2011","2014","2023"],"https://rsssf.org/tabless/spancuphist.html"],["European Cup / Champions League",["1955/56","1956/57","1957/58","1958/59","1959/60","1965/66","1997/98","1999/00","2001/02","2013/14","2015/16","2016/17","2017/18","2021/22"],"https://rsssf.org/tablese/ec1.html"],["UEFA Cup / Europa League",["1984/85","1985/86"],"https://rsssf.org/tablese/ec3b.html"]]},"1733":{"trophies":[["Spain national league titles",["1934/35"],"https://rsssf.org/tabless/spanchamp.html"],["Copa del Rey",["1977","2005","2022"],"https://rsssf.org/tabless/spancuphist.html"]]},"1687":{"trophies":[["Spain national league titles",["1939/40","1940/41","1949/50","1950/51","1965/66","1969/70","1972/73","1976/77","1995/96","2013/14","2020/21"],"https://rsssf.org/tabless/spanchamp.html"],["Copa del Rey",["1960","1961","1965","1972","1976","1985","1991","1992","1996","2013"],"https://rsssf.org/tabless/spancuphist.html"],["UEFA Cup / Europa League",["2009/10","2011/12","2017/18"],"https://rsssf.org/tablese/ec3b.html"]]},"1775":{"trophies":[["Spain national league titles",["1941/42","1943/44","1946/47","1970/71","2001/02","2003/04"],"https://rsssf.org/tabless/spanchamp.html"],["Copa del Rey",["1941","1949","1954","1967","1979","1999","2008","2019"],"https://rsssf.org/tabless/spancuphist.html"],["UEFA Cup / Europa League",["2003/04"],"https://rsssf.org/tablese/ec3b.html"]]},"1759":{"trophies":[["Spain national league titles",["1945/46"],"https://rsssf.org/tabless/spanchamp.html"],["Copa del Rey",["1935","1939","1948","2007","2010"],"https://rsssf.org/tabless/spancuphist.html"],["UEFA Cup / Europa League",["2005/06","2006/07","2013/14","2014/15","2015/16","2019/20","2022/23"],"https://rsssf.org/tablese/ec3b.html"]]},"1742":{"trophies":[["Spain national league titles",["1980/81","1981/82"],"https://rsssf.org/tabless/spanchamp.html"],["Copa del Rey",["1987","2020"],"https://rsssf.org/tabless/spancuphist.html"]]},"1705":{"trophies":[["Spain national league titles",["1999/00"],"https://rsssf.org/tabless/spanchamp.html"]]},"1843":{"trophies":[["Sweden national league titles",["1896","1897","1898","1899","1902","1904","1905","1906","1907","1909","1913","1985"],"https://rsssf.org/tablesz/zwedchamp.html"],["Svenska Cupen",["1997/98"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"1780":{"trophies":[["Sweden national league titles",["1900","1901","1911","1914","1916","1923","1931/32","1936/37","1992","1998","2009","2018"],"https://rsssf.org/tablesz/zwedchamp.html"],["Svenska Cupen",["1943","1949","1950","1984/85","1995/96","1996/97","1998/99","1999/00","2009"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"1803":{"trophies":[["Sweden national league titles",["1908","1910","1918","1934/35","1941/42","1957/58","1969","1982","1983","1984","1987","1990","1991","1993","1994","1995","1996","2007"],"https://rsssf.org/tablesz/zwedchamp.html"],["Svenska Cupen",["1978/79","1981/82","1982/83","1991","2008","2012/13","2014/15","2019/20"],"https://rsssf.org/tablesz/zwedcuphist.html"],["UEFA Cup / Europa League",["1981/82","1986/87"],"https://rsssf.org/tablese/ec3b.html"]]},"1787":{"trophies":[["Sweden national league titles",["1912","1915","1917","1920","1954/55","1959","1964","1966","2002","2003","2005","2019"],"https://rsssf.org/tablesz/zwedchamp.html"],["Svenska Cupen",["1989/90","2002","2004","2005","2017/18"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"2153":{"trophies":[["Sweden national league titles",["1919","1922","1930/31","1953/54"],"https://rsssf.org/tablesz/zwedchamp.html"],["Svenska Cupen",["1942"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"2566":{"trophies":[["Sweden national league titles",["1921"],"https://rsssf.org/tablesz/zwedchamp.html"]]},"1798":{"trophies":[["Sweden national league titles",["1932/33","1933/34","1940/41","1999","2011"],"https://rsssf.org/tablesz/zwedchamp.html"],["Svenska Cupen",["1941","2006","2010","2011"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"1802":{"trophies":[["Sweden national league titles",["1935/36","1938/39","1939/40","1961","2006","2012"],"https://rsssf.org/tablesz/zwedchamp.html"],["Svenska Cupen",["2000/01","2003","2013/14"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"1806":{"trophies":[["Sweden national league titles",["1942/43","1944/45","1945/46","1946/47","1947/48","1951/52","1955/56","1956/57","1960","1962","1963","1989","2015"],"https://rsssf.org/tablesz/zwedchamp.html"],["Svenska Cupen",["1945","1968/69","1971/72","1987/88","1990/91","1993/94"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"1816":{"trophies":[["Sweden national league titles",["1943/44","1948/49","1949/50","1950/51","1952/53","1965","1967","1970","1971","1974","1975","1977","1986","1988","2004","2010","2013","2014","2016","2017","2020","2021"],"https://rsssf.org/tablesz/zwedchamp.html"],["Svenska Cupen",["1944","1946","1947","1951","1953","1967","1972/73","1973/74","1974/75","1977/78","1979/80","1983/84","1985/86","1988/89","2021/22"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"1844":{"trophies":[["Sweden national league titles",["1968","1978","1980","1981"],"https://rsssf.org/tablesz/zwedchamp.html"],["Svenska Cupen",["1976/77"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"1841":{"trophies":[["Sweden national league titles",["1972","1973"],"https://rsssf.org/tablesz/zwedchamp.html"],["Svenska Cupen",["1969/70","1970/71"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"1796":{"trophies":[["Sweden national league titles",["1976","1979","1997","2000"],"https://rsssf.org/tablesz/zwedchamp.html"],["Svenska Cupen",["1994/95"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"1797":{"trophies":[["Sweden national league titles",["2001"],"https://rsssf.org/tablesz/zwedchamp.html"],["Svenska Cupen",["2020/21"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"1809":{"trophies":[["Sweden national league titles",["2008"],"https://rsssf.org/tablesz/zwedchamp.html"],["Svenska Cupen",["1980/81","1986/87","2007"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"1783":{"trophies":[["Sweden national league titles",["2022"],"https://rsssf.org/tablesz/zwedchamp.html"],["Svenska Cupen",["2015/16","2018/19","2022/23"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"1855":{"trophies":[["Switzerland national league titles",["1897/98","1899/00","1900/01","1904/05","1920/21","1926/27","1927/28","1930/31","1936/37","1938/39","1941/42","1942/43","1944/45","1951/52","1955/56","1970/71","1977/78","1981/82","1982/83","1983/84","1989/90","1990/91","1994/95","1995/96","1997/98","2000/01","2002/03"],"https://rsssf.org/tablesz/zwitchamp.html"]]},"1854":{"trophies":[["Switzerland national league titles",["1901/02","1923/24","1962/63","1965/66","1967/68","1973/74","1974/75","1975/76","1980/81","2005/06","2006/07","2008/09","2021/22"],"https://rsssf.org/tablesz/zwitchamp.html"]]},"1847":{"trophies":[["Switzerland national league titles",["1902/03","1908/09","1909/10","1910/11","1919/20","1928/29","1956/57","1957/58","1958/59","1959/60","1985/86","2017/18","2018/19","2019/20","2020/21","2022/23"],"https://rsssf.org/tablesz/zwitchamp.html"]]},"1853":{"trophies":[["Switzerland national league titles",["1903/04","1999/00"],"https://rsssf.org/tablesz/zwitchamp.html"]]},"1200101":{"trophies":[["Switzerland national league titles",["1905/06","1907/08","1916/17"],"https://rsssf.org/tablesz/zwitchamp.html"]]},"1858":{"trophies":[["Switzerland national league titles",["1906/07","1917/18","1921/22","1924/25","1925/26","1929/30","1932/33","1933/34","1939/40","1945/46","1949/50","1960/61","1961/62","1978/79","1984/85","1993/94","1998/99"],"https://rsssf.org/tablesz/zwitchamp.html"]]},"1848":{"trophies":[["Switzerland national league titles",["1911/12","1913/14","1992/93"],"https://rsssf.org/tablesz/zwitchamp.html"]]},"1856":{"trophies":[["Switzerland national league titles",["1931/32","1934/35","1935/36","1943/44","1950/51","1964/65"],"https://rsssf.org/tablesz/zwitchamp.html"]]},"1850":{"trophies":[["Switzerland national league titles",["1937/38","1940/41","1948/49"],"https://rsssf.org/tablesz/zwitchamp.html"]]},"1101431":{"trophies":[["Switzerland national league titles",["1947/48"],"https://rsssf.org/tablesz/zwitchamp.html"]]},"1849":{"trophies":[["Switzerland national league titles",["1952/53","1966/67","1968/69","1969/70","1971/72","1972/73","1976/77","1979/80","2001/02","2003/04","2004/05","2007/08","2009/10","2010/11","2011/12","2012/13","2013/14","2014/15","2015/16","2016/17"],"https://rsssf.org/tablesz/zwitchamp.html"]]},"1857":{"trophies":[["Switzerland national league titles",["1986/87","1987/88"],"https://rsssf.org/tablesz/zwitchamp.html"]]},"1851":{"trophies":[["Switzerland national league titles",["1988/89"],"https://rsssf.org/tablesz/zwitchamp.html"]]},"1852":{"trophies":[["Switzerland national league titles",["1991/92","1996/97"],"https://rsssf.org/tablesz/zwitchamp.html"]]},"1885":{"trophies":[["Ukraine national league titles",["1992/93","1993/94","1994/95","1995/96","1996/97","1997/98","1998/99","1999/00","2000/01","2002/03","2003/04","2006/07","2008/09","2014/15","2015/16","2020/21"],"https://rsssf.org/tableso/oekrchamp.html"]]},"1895":{"trophies":[["Ukraine national league titles",["2001/02","2004/05","2005/06","2007/08","2009/10","2010/11","2011/12","2012/13","2013/14","2016/17","2017/18","2018/19","2019/20","2022/23"],"https://rsssf.org/tableso/oekrchamp.html"],["UEFA Cup / Europa League",["2008/09"],"https://rsssf.org/tablese/ec3b.html"]]},"1921":{"trophies":[["Uruguay national league titles",["1902","1903","1912","1915","1916","1917","1919","1920","1922","1923","1924","1933","1934","1939","1940","1941","1942","1943","1946","1947","1950","1952","1955","1956","1957","1963","1966","1969","1970","1971","1972","1977","1980","1983","1992","1998","2000","2001","2002","2005","2005/06","2008/09","2010/11","2011/12","2014/15","2016","2019","2020/21","2022"],"https://rsssf.org/tablesu/uruchamp.html"]]},"1926":{"trophies":[["Uruguay national league titles",["1906","1909","1931"],"https://rsssf.org/tablesu/uruchamp.html"]]},"1925":{"trophies":[["Uruguay national league titles",["1908","1910","1913","1914"],"https://rsssf.org/tablesu/uruchamp.html"]]},"1922":{"trophies":[["Uruguay national league titles",["1918","1921","1928","1929","1932","1935","1936","1937","1938","1944","1945","1949","1951","1953","1954","1958","1959","1960","1961","1962","1964","1965","1967","1968","1973","1974","1975","1978","1979","1981","1982","1985","1986","1993","1994","1995","1996","1997","1999","2003","2009/10","2012/13","2015/16","2017","2018","2021"],"https://rsssf.org/tablesu/uruchamp.html"]]},"1924":{"trophies":[["Uruguay national league titles",["1927"],"https://rsssf.org/tablesu/uruchamp.html"]]},"1918":{"trophies":[["Uruguay national league titles",["1988","2004","2006/07","2013/14"],"https://rsssf.org/tablesu/uruchamp.html"]]},"1923":{"trophies":[["Uruguay national league titles",["1989"],"https://rsssf.org/tablesu/uruchamp.html"]]},"1915":{"trophies":[["Uruguay national league titles",["1990"],"https://rsssf.org/tablesu/uruchamp.html"]]},"1919":{"trophies":[["Uruguay national league titles",["1991","2007/08"],"https://rsssf.org/tablesu/uruchamp.html"]]},"74032523":{"trophies":[["Wales national league titles",["1995/96","1996/97","1997/98","1998/99","2000/01","2001/02","2002/03"],"https://rsssf.org/tablesw/walchamp.html"],["Welsh Cup",["1954/55","1993/94","1996/97","2000/01","2001/02","2002/03"],"https://rsssf.org/tablesw/walcuphist.html"]]},"1940":{"trophies":[["Wales national league titles",["1999/00","2004/05","2005/06","2006/07","2009/10","2011/12","2012/13","2013/14","2014/15","2015/16","2016/17","2017/18","2018/19","2021/22","2022/23"],"https://rsssf.org/tablesw/walchamp.html"],["Welsh Cup",["2004/05","2011/12","2013/14","2014/15","2015/16","2018/19","2021/22","2022/23"],"https://rsssf.org/tablesw/walcuphist.html"]]},"1913":{"trophies":[["MLS Cup",["1996","1997","1999","2004"],"https://rsssf.org/tablesu/usachamp.html"]]},"108893":{"trophies":[["MLS Cup",["1998"],"https://rsssf.org/tablesu/usachamp.html"]]},"72023746":{"trophies":[["MLS Cup",["2000","2013"],"https://rsssf.org/tablesu/usachamp.html"]]},"1910":{"trophies":[["MLS Cup",["2001","2003"],"https://rsssf.org/tablesu/usachamp.html"]]},"1907":{"trophies":[["MLS Cup",["2002","2005","2011","2012","2014"],"https://rsssf.org/tablesu/usachamp.html"]]},"72000112":{"trophies":[["MLS Cup",["2006","2007"],"https://rsssf.org/tablesu/usachamp.html"]]},"1904":{"trophies":[["MLS Cup",["2008","2020"],"https://rsssf.org/tablesu/usachamp.html"]]},"980543":{"trophies":[["MLS Cup",["2009"],"https://rsssf.org/tablesu/usachamp.html"]]},"1903":{"trophies":[["MLS Cup",["2010"],"https://rsssf.org/tablesu/usachamp.html"]]},"975489":{"trophies":[["MLS Cup",["2015"],"https://rsssf.org/tablesu/usachamp.html"]]},"72014006":{"trophies":[["MLS Cup",["2016","2019"],"https://rsssf.org/tablesu/usachamp.html"]]},"72000789":{"trophies":[["MLS Cup",["2017"],"https://rsssf.org/tablesu/usachamp.html"]]},"72047296":{"trophies":[["MLS Cup",["2018"],"https://rsssf.org/tablesu/usachamp.html"]]},"72041885":{"trophies":[["MLS Cup",["2021"],"https://rsssf.org/tablesu/usachamp.html"]]},"72049313":{"trophies":[["MLS Cup",["2022"],"https://rsssf.org/tablesu/usachamp.html"]]},"130775":{"trophies":[["K League titles",["1984","1987","1991","1997"],"https://rsssf.org/tabless/skorchamp.html"]]},"130777":{"trophies":[["K League titles",["1985","1990","2000","2010","2012","2016"],"https://rsssf.org/tabless/skorchamp.html"]]},"106818":{"trophies":[["K League titles",["1986","1988","1992","2007","2013"],"https://rsssf.org/tabless/skorchamp.html"]]},"106817":{"trophies":[["K League titles",["1989"],"https://rsssf.org/tabless/skorchamp.html"]]},"200373":{"trophies":[["K League titles",["1993","1994","1995","2001","2002","2003","2006"],"https://rsssf.org/tabless/skorchamp.html"]]},"106808":{"trophies":[["K League titles",["1996","2005","2022"],"https://rsssf.org/tabless/skorchamp.html"]]},"106813":{"trophies":[["K League titles",["1998","1999","2004","2008"],"https://rsssf.org/tabless/skorchamp.html"]]},"130776":{"trophies":[["K League titles",["2009","2011","2014","2015","2017","2018","2019","2020","2021"],"https://rsssf.org/tabless/skorchamp.html"]]},"1644":{"trophies":[["South African Premier Soccer League titles",["1997/98","1998/99","1999/00","2005/06","2006/07","2013/14","2015/16","2017/18","2018/19","2019/20","2020/21","2021/22","2022/23"],"https://rsssf.org/tablesz/zafchamp.html"]]},"1645":{"trophies":[["South African Premier Soccer League titles",["2000/01","2002/03","2010/11","2011/12"],"https://rsssf.org/tablesz/zafchamp.html"]]},"1643":{"trophies":[["South African Premier Soccer League titles",["2003/04","2004/05","2012/13","2014/15"],"https://rsssf.org/tablesz/zafchamp.html"]]},"1646":{"trophies":[["South African Premier Soccer League titles",["2007/08","2008/09","2009/10"],"https://rsssf.org/tablesz/zafchamp.html"]]},"1870":{"trophies":[["Turkish national league titles (since 1959)",["1959","1960/61","1963/64","1964/65","1967/68","1969/70","1973/74","1974/75","1977/78","1982/83","1984/85","1988/89","1995/96","2000/01","2003/04","2004/05","2006/07","2010/11","2013/14"],"https://rsssf.org/tablest/turkchamp.html"],["Turkish Cup",["1967/68","1973/74","1978/79","1982/83","2011/12","2012/13","2022/23"],"https://rsssf.org/tablest/turkcuphist.html"]]},"1866":{"trophies":[["Turkish national league titles (since 1959)",["1959/60","1965/66","1966/67","1981/82","1985/86","1989/90","1990/91","1991/92","1994/95","2002/03","2008/09","2015/16","2016/17","2020/21"],"https://rsssf.org/tablest/turkchamp.html"],["Turkish Cup",["1974/75","1988/89","1989/90","1993/94","1997/98","2005/06","2006/07","2008/09","2010/11","2020/21"],"https://rsssf.org/tablest/turkcuphist.html"]]},"1871":{"trophies":[["Turkish national league titles (since 1959)",["1961/62","1962/63","1968/69","1970/71","1971/72","1972/73","1986/87","1987/88","1992/93","1993/94","1996/97","1997/98","1998/99","1999/00","2001/02","2005/06","2007/08","2011/12","2012/13","2014/15","2017/18","2018/19","2022/23"],"https://rsssf.org/tablest/turkchamp.html"],["Turkish Cup",["1962/63","1963/64","1964/65","1965/66","1972/73","1975/76","1981/82","1984/85","1990/91","1992/93","1995/96","1998/99","1999/00","2004/05","2013/14","2014/15","2015/16","2018/19"],"https://rsssf.org/tablest/turkcuphist.html"],["UEFA Cup / Europa League",["1999/00"],"https://rsssf.org/tablese/ec3b.html"]]},"1879":{"trophies":[["Turkish national league titles (since 1959)",["1975/76","1976/77","1978/79","1979/80","1980/81","1983/84","2021/22"],"https://rsssf.org/tablest/turkchamp.html"],["Turkish Cup",["1976/77","1977/78","1983/84","1991/92","1994/95","2002/03","2003/04","2009/10","2019/20"],"https://rsssf.org/tablest/turkcuphist.html"]]},"1867":{"trophies":[["Turkish national league titles (since 1959)",["2009/10"],"https://rsssf.org/tablest/turkchamp.html"],["Turkish Cup",["1985/86"],"https://rsssf.org/tablest/turkcuphist.html"]]},"5395665":{"trophies":[["Singapore league titles (since 1996)",["1996","2001"],"https://rsssf.org/tabless/singchamp.html"]]},"23501219":{"trophies":[["Singapore league titles (since 1996)",["1999","2003","2021"],"https://rsssf.org/tabless/singchamp.html"]]},"1609":{"trophies":[["Singapore league titles (since 1996)",["2004","2005","2011","2012","2013"],"https://rsssf.org/tabless/singchamp.html"]]},"5626771":{"trophies":[["Singapore league titles (since 1996)",["2015","2019"],"https://rsssf.org/tabless/singchamp.html"]]},"1000037":{"trophies":[["Singapore league titles (since 1996)",["2016","2017","2018","2020","2022"],"https://rsssf.org/tabless/singchamp.html"]]},"693":{"trophies":[["FA Cup",["1894"],"https://rsssf.org/tablese/engcuphist.html"]]},"616":{"trophies":[["FA Cup",["1911"],"https://rsssf.org/tablese/engcuphist.html"]]},"606":{"trophies":[["FA Cup",["1912"],"https://rsssf.org/tablese/engcuphist.html"]]},"614":{"trophies":[["FA Cup",["1923","1926","1929","1958"],"https://rsssf.org/tablese/engcuphist.html"]]},"628":{"trophies":[["FA Cup",["1947"],"https://rsssf.org/tablese/engcuphist.html"]]},"613":{"trophies":[["FA Cup",["1953"],"https://rsssf.org/tablese/engcuphist.html"]]},"735":{"trophies":[["FA Cup",["1964","1975","1980"],"https://rsssf.org/tablese/engcuphist.html"]]},"713":{"trophies":[["FA Cup",["1976"],"https://rsssf.org/tablese/engcuphist.html"]]},"691":{"trophies":[["League Cup",["1962","1985"],"https://rsssf.org/tablese/engleagcuphist.html"]]},"609":{"trophies":[["League Cup",["1963","2011"],"https://rsssf.org/tablese/engleagcuphist.html"]]},"701":{"trophies":[["League Cup",["1967"],"https://rsssf.org/tablese/engleagcuphist.html"]]},"721":{"trophies":[["League Cup",["1972"],"https://rsssf.org/tablese/engleagcuphist.html"]]},"695":{"trophies":[["League Cup",["1986"],"https://rsssf.org/tablese/engleagcuphist.html"]]},"685":{"trophies":[["League Cup",["2004"],"https://rsssf.org/tablese/engleagcuphist.html"]]},"1179":{"trophies":[["Coppa Italia",["1940/41"],"https://rsssf.org/tablesi/italcuphist.html"]]},"1106":{"trophies":[["Coppa Italia",["1962/63"],"https://rsssf.org/tablesi/italcuphist.html"]]},"1156":{"trophies":[["Coppa Italia",["1991/92","1998/99","2001/02"],"https://rsssf.org/tablesi/italcuphist.html"],["UEFA Cup / Europa League",["1994/95","1998/99"],"https://rsssf.org/tablese/ec3b.html"]]},"1181":{"trophies":[["Coppa Italia",["1996/97"],"https://rsssf.org/tablesi/italcuphist.html"]]},"886":{"trophies":[["Coupe de France",["1957","2023"],"https://rsssf.org/tablesf/francuphist.html"]]},"884":{"trophies":[["Coupe de France",["1965","1971","2019"],"https://rsssf.org/tablesf/francuphist.html"]]},"872":{"trophies":[["Coupe de France",["1966","2001"],"https://rsssf.org/tablesf/francuphist.html"]]},"844":{"trophies":[["Coupe de France",["1984","1988"],"https://rsssf.org/tablesf/francuphist.html"]]},"824":{"trophies":[["Coupe de France",["1994","1996","2003","2005"],"https://rsssf.org/tablesf/francuphist.html"]]},"840":{"trophies":[["Coupe de France",["2009","2014"],"https://rsssf.org/tablesf/francuphist.html"]]},"931":{"trophies":[["DFB-Pokal / German Cup",["1954/55","1955/56"],"https://rsssf.org/tablesd/duitcuphist.html"]]},"91013388":{"trophies":[["DFB-Pokal / German Cup",["2021/22","2022/23"],"https://rsssf.org/tablesd/duitcuphist.html"]]},"2393":{"trophies":[["Ta\u00e7a de Portugal",["1938/39","2011/12"],"https://rsssf.org/tablesp/portcuphist.html"]]},"2406":{"trophies":[["Ta\u00e7a de Portugal",["1960/61"],"https://rsssf.org/tablesp/portcuphist.html"]]},"1495":{"trophies":[["Ta\u00e7a de Portugal",["1964/65","1966/67","2004/05"],"https://rsssf.org/tablesp/portcuphist.html"]]},"1488":{"trophies":[["Ta\u00e7a de Portugal",["1965/66","2015/16","2020/21"],"https://rsssf.org/tablesp/portcuphist.html"]]},"2000030636":{"trophies":[["Ta\u00e7a de Portugal",["1989/90"],"https://rsssf.org/tablesp/portcuphist.html"]]},"1484":{"trophies":[["Ta\u00e7a de Portugal",["1998/99"],"https://rsssf.org/tablesp/portcuphist.html"]]},"1494":{"trophies":[["Ta\u00e7a de Portugal",["2012/13"],"https://rsssf.org/tablesp/portcuphist.html"]]},"1591":{"trophies":[["Scottish Cup",["1874","1875","1876","1880","1881","1882","1884","1886","1890","1893"],"https://rsssf.org/tabless/scotcuphist.html"]]},"1563":{"trophies":[["Scottish Cup",["1913","1957"],"https://rsssf.org/tabless/scotcuphist.html"]]},"1586":{"trophies":[["Scottish Cup",["1921"],"https://rsssf.org/tabless/scotcuphist.html"],["Scottish League Cup",["1971/72"],"https://rsssf.org/tabless/scotleagcuphist.html"]]},"1571":{"trophies":[["Scottish Cup",["1922"],"https://rsssf.org/tabless/scotcuphist.html"]]},"5203872":{"trophies":[["Scottish Cup",["1924"],"https://rsssf.org/tabless/scotcuphist.html"]]},"1597":{"trophies":[["Scottish Cup",["1926","1959","1987"],"https://rsssf.org/tabless/scotcuphist.html"],["Scottish League Cup",["2012/13"],"https://rsssf.org/tabless/scotleagcuphist.html"]]},"1558":{"trophies":[["Scottish Cup",["1938"],"https://rsssf.org/tabless/scotcuphist.html"],["Scottish League Cup",["1947/48","1949/50","1953/54"],"https://rsssf.org/tabless/scotleagcuphist.html"]]},"1548":{"trophies":[["Scottish Cup",["1939","1955","1958"],"https://rsssf.org/tabless/scotcuphist.html"]]},"1557":{"trophies":[["Scottish Cup",["1961","1968"],"https://rsssf.org/tabless/scotcuphist.html"]]},"1596":{"trophies":[["Scottish Cup",["2014","2021"],"https://rsssf.org/tabless/scotcuphist.html"],["Scottish League Cup",["2020/21"],"https://rsssf.org/tabless/scotleagcuphist.html"]]},"1592":{"trophies":[["Scottish League Cup",["1994/95"],"https://rsssf.org/tabless/scotleagcuphist.html"]]},"1581":{"trophies":[["Scottish League Cup",["2003/04"],"https://rsssf.org/tabless/scotleagcuphist.html"]]},"1593":{"trophies":[["Scottish League Cup",["2015/16"],"https://rsssf.org/tabless/scotleagcuphist.html"]]},"1010":{"trophies":[["KNVB Cup",["1982","1985","2003","2004"],"https://rsssf.org/tablesn/nedcuphist.html"]]},"1036":{"trophies":[["KNVB Cup",["2009"],"https://rsssf.org/tablesn/nedcuphist.html"]]},"1046":{"trophies":[["KNVB Cup",["2017"],"https://rsssf.org/tablesn/nedcuphist.html"]]},"289":{"trophies":[["Belgian Cup",["2001"],"https://rsssf.org/tablesb/belgcuphist.html"]]},"299":{"trophies":[["Belgian Cup",["2006","2017"],"https://rsssf.org/tablesb/belgcuphist.html"]]},"16309710":{"trophies":[["Austrian Cup",["1980/81","1999/00","2001/02","2003/04"],"https://rsssf.org/tableso/oostcuphist.html"]]},"159":{"trophies":[["Austrian Cup",["1997/98","2010/11"],"https://rsssf.org/tableso/oostcuphist.html"]]},"2139":{"trophies":[["Danish Cup",["1974"],"https://rsssf.org/tablesd/dencuphist.html"]]},"569":{"trophies":[["Danish Cup",["2000"],"https://rsssf.org/tablesd/dencuphist.html"]]},"930621":{"trophies":[["Danish Cup",["2006","2021"],"https://rsssf.org/tablesd/dencuphist.html"]]},"926867":{"trophies":[["Danish Cup",["2020"],"https://rsssf.org/tablesd/dencuphist.html"]]},"1365":{"trophies":[["Norwegian Cup",["1903","1904","1905","1906","1913","1915","1919","1922","1924","1926","1931"],"https://rsssf.org/tablesn/noocuphist.html"]]},"53021327":{"trophies":[["Norwegian Cup",["1917","1929","1939","1948","1949","1951"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1351":{"trophies":[["Norwegian Cup",["1933","1934","1937"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1316":{"trophies":[["Norwegian Cup",["1962"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1410":{"trophies":[["Norwegian Cup",["1986","1996"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1295":{"trophies":[["Norwegian Cup",["1987"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1396":{"trophies":[["Norwegian Cup",["1998"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1289":{"trophies":[["Norwegian Cup",["2009","2011"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1328":{"trophies":[["Norwegian Cup",["2012"],"https://rsssf.org/tablesn/noocuphist.html"]]},"1811":{"trophies":[["Svenska Cupen",["1975/76"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"1786":{"trophies":[["Svenska Cupen",["1992/93"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"1101813":{"trophies":[["Svenska Cupen",["2016/17"],"https://rsssf.org/tablesz/zwedcuphist.html"]]},"129585":{"trophies":[["Polish Cup",["1962","1963","1977","1978"],"https://rsssf.org/tablesp/polcuphist.html"]]},"130127":{"trophies":[["Polish Cup",["1975"],"https://rsssf.org/tablesp/polcuphist.html"]]},"129580":{"trophies":[["Polish Cup",["1979","2017"],"https://rsssf.org/tablesp/polcuphist.html"]]},"715912":{"trophies":[["Polish Cup",["1983","2019"],"https://rsssf.org/tablesp/polcuphist.html"]]},"1451":{"trophies":[["Polish Cup",["1986","1991","1993"],"https://rsssf.org/tablesp/polcuphist.html"]]},"1863":{"trophies":[["Turkish Cup",["1966/67","1979/80"],"https://rsssf.org/tablest/turkcuphist.html"]]},"130338":{"trophies":[["Turkish Cup",["1968/69","1969/70"],"https://rsssf.org/tablest/turkcuphist.html"]]},"1864":{"trophies":[["Turkish Cup",["1971/72","1980/81"],"https://rsssf.org/tablest/turkcuphist.html"]]},"130346":{"trophies":[["Turkish Cup",["1987/88"],"https://rsssf.org/tablest/turkcuphist.html"]]},"1876":{"trophies":[["Turkish Cup",["1996/97","2001/02"],"https://rsssf.org/tablest/turkcuphist.html"]]},"1873":{"trophies":[["Turkish Cup",["2000/01"],"https://rsssf.org/tablest/turkcuphist.html"]]},"1875":{"trophies":[["Turkish Cup",["2007/08"],"https://rsssf.org/tablest/turkcuphist.html"]]},"130344":{"trophies":[["Turkish Cup",["2016/17"],"https://rsssf.org/tablest/turkcuphist.html"]]},"130382":{"trophies":[["Turkish Cup",["2021/22"],"https://rsssf.org/tablest/turkcuphist.html"]]},"976":{"trophies":[["Greek Cup",["1975/76"],"https://rsssf.org/tablesg/grkcuphist.html"]]},"980":{"trophies":[["Greek Cup",["1986/87"],"https://rsssf.org/tablesg/grkcuphist.html"]]},"1194":{"trophies":[["Emperor\u2019s Cup",["2001"],"https://rsssf.org/tablesj/japcuphist.html"],["J.League Cup (since 1992)",["1996"],"https://rsssf.org/tablesj/japleagcuphist.html"]]},"107313":{"trophies":[["Emperor\u2019s Cup",["2011"],"https://rsssf.org/tablesj/japcuphist.html"],["J.League Cup (since 1992)",["2004","2009","2020"],"https://rsssf.org/tablesj/japleagcuphist.html"]]},"106844":{"trophies":[["Emperor\u2019s Cup",["2019"],"https://rsssf.org/tablesj/japcuphist.html"]]},"107314":{"trophies":[["Emperor\u2019s Cup",["2022"],"https://rsssf.org/tablesj/japcuphist.html"]]},"1300918":{"trophies":[["FAI Cup",["1974"],"https://rsssf.org/tablesi/iercuphist.html"]]},"1300916":{"trophies":[["FAI Cup",["1990","1999"],"https://rsssf.org/tablesi/iercuphist.html"]]},"130173":{"trophies":[["Irish Cup",["1880/81"],"https://rsssf.org/tablesn/nilcuphist.html"]]},"1274":{"trophies":[["Irish Cup",["1939/40","1957/58","1980/81","1983/84","1988/89"],"https://rsssf.org/tablesn/nilcuphist.html"]]},"130176":{"trophies":[["Irish Cup",["1954/55"],"https://rsssf.org/tablesn/nilcuphist.html"]]},"1276":{"trophies":[["Irish Cup",["1975/76"],"https://rsssf.org/tablesn/nilcuphist.html"]]},"1275":{"trophies":[["Irish Cup",["1992/93"],"https://rsssf.org/tablesn/nilcuphist.html"]]},"741":{"trophies":[["Welsh Cup",["1877/78","1882/83","1892/93","1896/97","1902/03","1904/05","1908/09","1909/10","1910/11","1913/14","1914/15","1920/21","1923/24","1924/25","1930/31","1956/57","1957/58","1959/60","1961/62","1971/72","1974/75","1977/78","1985/86","1994/95"],"https://rsssf.org/tablesw/walcuphist.html"]]},"710":{"trophies":[["Welsh Cup",["1890/91","1937/38","1976/77","1978/79","1983/84","1984/85"],"https://rsssf.org/tablesw/walcuphist.html"]]},"1943":{"trophies":[["Welsh Cup",["1894/95"],"https://rsssf.org/tablesw/walcuphist.html"]]},"1927":{"trophies":[["Welsh Cup",["1899/00"],"https://rsssf.org/tablesw/walcuphist.html"]]},"625":{"trophies":[["Welsh Cup",["1911/12","1919/20","1921/22","1922/23","1926/27","1927/28","1929/30","1955/56","1958/59","1964/65","1966/67","1967/68","1968/69","1969/70","1970/71","1972/73","1973/74","1975/76","1987/88","1991/92","1992/93"],"https://rsssf.org/tablesw/walcuphist.html"]]},"724":{"trophies":[["Welsh Cup",["1912/13","1931/32","1949/50","1960/61","1965/66","1980/81","1981/82","1982/83","1988/89","1990/91"],"https://rsssf.org/tablesw/walcuphist.html"]]},"1932":{"trophies":[["Welsh Cup",["2017/18"],"https://rsssf.org/tablesw/walcuphist.html"]]},"324":{"trophies":[["Copa do Brasil",["1989","1994","1997","2001","2016"],"https://rsssf.org/tablesb/brazcuphist.html"],["Brazilian national league titles",["1981","1996"],"https://rsssfbrasil.com/tablesae/brcamp.htm"]]},"322":{"trophies":[["Copa do Brasil",["1990","2006","2013","2022"],"https://rsssf.org/tablesb/brazcuphist.html"],["Brazilian national league titles",["1980","1982","1983","1992","2009","2019","2020"],"https://rsssfbrasil.com/tablesae/brcamp.htm"]]},"320":{"trophies":[["Copa do Brasil",["1991"],"https://rsssf.org/tablesb/brazcuphist.html"]]},"326":{"trophies":[["Copa do Brasil",["1992"],"https://rsssf.org/tablesb/brazcuphist.html"],["Brazilian national league titles",["1975","1976","1979"],"https://rsssfbrasil.com/tablesae/brcamp.htm"]]},"321":{"trophies":[["Copa do Brasil",["1993","1996","2000","2003","2017","2018"],"https://rsssf.org/tablesb/brazcuphist.html"],["Brazilian national league titles",["1966 Ta\u00e7a Brasil","2003","2013","2014"],"https://rsssfbrasil.com/tablesae/brcamp.htm"]]},"319":{"trophies":[["Copa do Brasil",["1995","2002","2009"],"https://rsssf.org/tablesb/brazcuphist.html"],["Brazilian national league titles",["1990","1998","1999","2005","2011","2015","2017"],"https://rsssfbrasil.com/tablesae/brcamp.htm"]]},"329":{"trophies":[["Copa do Brasil",["1998","2012","2015","2020"],"https://rsssf.org/tablesb/brazcuphist.html"],["Brazilian national league titles",["1960 Ta\u00e7a Brasil","1967 Roberto Gomes Pedrosa","1967 Ta\u00e7a Brasil","1969 Roberto Gomes Pedrosa","1972","1973","1993","1994","2016","2018","2022"],"https://rsssfbrasil.com/tablesae/brcamp.htm"]]},"327":{"trophies":[["Copa do Brasil",["1999"],"https://rsssf.org/tablesb/brazcuphist.html"]]},"323":{"trophies":[["Copa do Brasil",["2007"],"https://rsssf.org/tablesb/brazcuphist.html"],["Brazilian national league titles",["1970 Roberto Gomes Pedrosa","1984","2010","2012"],"https://rsssfbrasil.com/tablesae/brcamp.htm"]]},"338":{"trophies":[["Copa do Brasil",["2008"],"https://rsssf.org/tablesb/brazcuphist.html"]]},"335":{"trophies":[["Copa do Brasil",["2010"],"https://rsssf.org/tablesb/brazcuphist.html"],["Brazilian national league titles",["1961 Ta\u00e7a Brasil","1962 Ta\u00e7a Brasil","1963 Ta\u00e7a Brasil","1964 Ta\u00e7a Brasil","1965 Ta\u00e7a Brasil","1968 Roberto Gomes Pedrosa","2002","2004"],"https://rsssfbrasil.com/tablesae/brcamp.htm"]]},"339":{"trophies":[["Copa do Brasil",["2011"],"https://rsssf.org/tablesb/brazcuphist.html"],["Brazilian national league titles",["1974","1989","1997","2000"],"https://rsssfbrasil.com/tablesae/brcamp.htm"]]},"314":{"trophies":[["Copa do Brasil",["2014","2021"],"https://rsssf.org/tablesb/brazcuphist.html"],["Brazilian national league titles",["1971","2021"],"https://rsssfbrasil.com/tablesae/brcamp.htm"]]},"107206":{"trophies":[["Copa do Brasil",["2019"],"https://rsssf.org/tablesb/brazcuphist.html"],["Brazilian national league titles",["2001"],"https://rsssfbrasil.com/tablesae/brcamp.htm"]]},"1749":{"trophies":[["Copa del Rey",["1964","1966","1986","1994","2001","2004"],"https://rsssf.org/tabless/spancuphist.html"]]},"1725":{"trophies":[["Copa del Rey",["2000","2006"],"https://rsssf.org/tabless/spancuphist.html"]]},"1726":{"trophies":[["Copa del Rey",["2003"],"https://rsssf.org/tabless/spancuphist.html"]]},"82":{"trophies":[["Argentine professional league titles",["1931 Campeonato","1934 Campeonato","1935 Campeonato","1940 Campeonato","1943 Campeonato","1944 Campeonato","1954 Campeonato","1962 Campeonato","1964 Campeonato","1965 Campeonato","1969 Campeonato Nacional","1970 Campeonato Nacional","1976 Campeonato Metropolitano","1976 Campeonato Nacional","1981 Campeonato","1992/93 Torneo Apertura","1998/99 Torneo Apertura","1998/99 Torneo Clausura","2000/01 Torneo Apertura","2003/04 Torneo Apertura","2005/06 Torneo Apertura","2005/06 Torneo Clausura","2008/09 Torneo Apertura","2011/12 Torneo Apertura","2015 Campeonato","2016/17 Campeonato","2017/18 Campeonato","2019/20 Campeonato","2022 Campeonato"],"https://rsssf.org/tablesa/argchamp.html"]]},"94":{"trophies":[["Argentine professional league titles",["1932 Campeonato","1936 Campeonato","1936 Copa de Oro","1937 Campeonato","1941 Campeonato","1942 Campeonato","1945 Campeonato","1947 Campeonato","1952 Campeonato","1953 Campeonato","1955 Campeonato","1956 Campeonato","1957 Campeonato","1975 Campeonato Metropolitano","1975 Campeonato Nacional","1977 Campeonato Metropolitano","1979 Campeonato Metropolitano","1979 Campeonato Nacional","1980 Campeonato","1981 Campeonato Nacional","1985/86 Campeonato","1989/90 Campeonato","1991/92 Torneo Apertura","1993/94 Torneo Apertura","1994/95 Torneo Apertura","1996/97 Torneo Apertura","1996/97 Torneo Clausura","1997/98 Torneo Apertura","1999/00 Torneo Apertura","1999/00 Torneo Clausura","2001/02 Torneo Clausura","2002/03 Torneo Clausura","2003/04 Torneo Clausura","2007/08 Torneo Clausura","2013/14 Torneo Final","2021 Campeonato"],"https://rsssf.org/tablesa/argchamp.html"]]},"96":{"trophies":[["Argentine professional league titles",["1933 Campeonato","1936 Copa de Honor","1946 Campeonato","1959 Campeonato","1968 Campeonato Metropolitano","1972 Campeonato Metropolitano","1972 Campeonato Nacional","1974 Campeonato Nacional","1994/95 Torneo Clausura","2000/01 Torneo Clausura","2006/07 Torneo Clausura","2013/14 Torneo Inicial"],"https://rsssf.org/tablesa/argchamp.html"]]},"89":{"trophies":[["Argentine professional league titles",["1938 Campeonato","1939 Campeonato","1948 Campeonato","1960 Campeonato","1963 Campeonato","1967 Campeonato Nacional","1970 Campeonato Metropolitano","1971 Campeonato Metropolitano","1977 Campeonato Nacional","1978 Campeonato Nacional","1983 Campeonato","1988/89 Campeonato","1993/94 Torneo Clausura","2002/03 Torneo Apertura"],"https://rsssf.org/tablesa/argchamp.html"]]},"93":{"trophies":[["Argentine professional league titles",["1949 Campeonato","1950 Campeonato","1951 Campeonato","1958 Campeonato","1961 Campeonato","1966 Campeonato","2001/02 Torneo Apertura","2014 Campeonato","2018/19 Campeonato"],"https://rsssf.org/tablesa/argchamp.html"]]},"85":{"trophies":[["Argentine professional league titles",["1967 Campeonato Metropolitano","1982 Campeonato","1983 Campeonato Nacional","2006/07 Torneo Apertura","2010/11 Torneo Apertura"],"https://rsssf.org/tablesa/argchamp.html"]]},"98":{"trophies":[["Argentine professional league titles",["1968 Campeonato Nacional","1992/93 Torneo Clausura","1995/96 Torneo Apertura","1995/96 Torneo Clausura","1997/98 Torneo Clausura","2004/05 Torneo Clausura","2008/09 Torneo Clausura","2010/11 Torneo Clausura","2012/13 Campeonato","2012/13 Torneo Inicial"],"https://rsssf.org/tablesa/argchamp.html"]]},"102493":{"trophies":[["Argentine professional league titles",["1969 Campeonato Metropolitano"],"https://rsssf.org/tablesa/argchamp.html"]]},"95":{"trophies":[["Argentine professional league titles",["1971 Campeonato Nacional","1973 Campeonato Nacional","1980 Campeonato Nacional","1986/87 Campeonato"],"https://rsssf.org/tablesa/argchamp.html"]]},"88":{"trophies":[["Argentine professional league titles",["1973 Campeonato Metropolitano"],"https://rsssf.org/tablesa/argchamp.html"]]},"91":{"trophies":[["Argentine professional league titles",["1974 Campeonato Metropolitano","1987/88 Campeonato","1990/91 Campeonato","1991/92 Torneo Clausura","2004/05 Torneo Apertura","2012/13 Toneo Final"],"https://rsssf.org/tablesa/argchamp.html"]]},"86":{"trophies":[["Argentine professional league titles",["1982 Campeonato Nacional","1984 Campeonato Nacional"],"https://rsssf.org/tablesa/argchamp.html"]]},"78":{"trophies":[["Argentine professional league titles",["1984 Campeonato","1985 Campeonato Nacional","2009/10 Torneo Clausura"],"https://rsssf.org/tablesa/argchamp.html"]]},"90":{"trophies":[["Argentine professional league titles",["2007/08 Torneo Apertura","2016 Campeonato"],"https://rsssf.org/tablesa/argchamp.html"]]},"80":{"trophies":[["Argentine professional league titles",["2009/10 Torneo Apertura"],"https://rsssf.org/tablesa/argchamp.html"]]},"315":{"trophies":[["Brazilian national league titles",["1959 Ta\u00e7a Brasil","1988"],"https://rsssfbrasil.com/tablesae/brcamp.htm"]]},"316":{"trophies":[["Brazilian national league titles",["1968 Ta\u00e7a Brasil","1995"],"https://rsssfbrasil.com/tablesae/brcamp.htm"]]},"337":{"trophies":[["Brazilian national league titles",["1977","1986","1991","2006","2007","2008"],"https://rsssfbrasil.com/tablesae/brcamp.htm"]]},"325":{"trophies":[["Brazilian national league titles",["1978"],"https://rsssfbrasil.com/tablesae/brcamp.htm"]]},"901":{"trophies":[["UEFA Cup / Europa League",["1987/88"],"https://rsssf.org/tablese/ec3b.html"]]},"1777":{"trophies":[["UEFA Cup / Europa League",["2020/21"],"https://rsssf.org/tablese/ec3b.html"]]}});
  const clubHonourRecords = Object.freeze((() => {
    const merged = {};
    for (const [id, record] of Object.entries(archiveClubHonourRecords)) {
      merged[id] = { trophies: record.trophies.map(trophy => [...trophy]) };
    }
    for (const [id, record] of Object.entries(officialClubHonourRecords)) {
      const trophies = merged[id]?.trophies ?? [];
      for (const [name, years] of record.trophies) {
        const previous = trophies.findIndex(trophy => trophy[0] === name);
        const trophy = [name, years, record.source, record.sourceName];
        if (previous === -1) trophies.push(trophy);
        else trophies[previous] = trophy;
      }
      merged[id] = { trophies };
    }
    return merged;
  })());

  // Static snapshot of the archive's publicly displayed 2023/24 kit index.
  // Only the app's eligible club IDs and observed home/away/third paths are
  // retained. Bit 1 = home, 2 = away, 4 = third. No newer-season fallback.
  // Artwork remains on the publisher's server; no kit files or API keys ship.
  const archiveKitImageRoot = "https://pub-fe85639f33b44259bd7d325c860b317d.r2.dev/thumbs/2023-24";
  const archiveKitSlots = Object.freeze({"1000":3,"1001":3,"1002":3,"1003":3,"1004":3,"1005":3,"1007":3,"1009":7,"1010":7,"1011":7,"101154":3,"1012":3,"1013":7,"1014":7,"1015":7,"1017":3,"102029":3,"1022":3,"102355":7,"102356":3,"1024":7,"102462":3,"102467":7,"102474":7,"102476":7,"102485":7,"102489":7,"102491":7,"1025":7,"102555":7,"1028":7,"1032":3,"103283":3,"1033":3,"1036":7,"1037":7,"1039":7,"1042":3,"1043":3,"104360":7,"104386":7,"1044":3,"1046":7,"1047":7,"104749":7,"104750":7,"104776":7,"1049":3,"1052":7,"1054":3,"1055":7,"1056":3,"105898":3,"1059":3,"1060":7,"106027":7,"106028":3,"106029":7,"1062":3,"1063":7,"106363":3,"1064":7,"1066":7,"106694":7,"106696":7,"106749":7,"1068":7,"1072":3,"107201":7,"107205":7,"107206":7,"107208":7,"107216":3,"107230":3,"107236":3,"1079":3,"1083":7,"1085":7,"108526":7,"1087":7,"108893":3,"1089":7,"108985":7,"108986":7,"108997":7,"1090":7,"109005":3,"109009":3,"109011":3,"109017":7,"109023":3,"109027":7,"109037":3,"109042":3,"1091":3,"109106":3,"109206":7,"109210":7,"109212":3,"1093":7,"1095":7,"1096":7,"1097":7,"1099":7,"1100":7,"1101151":3,"1101431":3,"1101511":7,"1101812":3,"1101813":3,"1102":3,"1102540":3,"1102772":3,"1103728":3,"1103878":3,"1104":7,"1105":7,"1105064":3,"1106":7,"1106011":3,"1108":7,"1110":7,"1111":7,"1113":7,"1114":7,"1116":7,"1119":7,"1120":7,"112031":3,"1123":7,"1124":3,"1125":7,"1126":7,"1129":7,"1130":7,"1131":7,"1132":7,"1135":7,"1138":7,"1139":7,"1140":7,"1141":7,"1142":3,"1144":7,"1145":7,"1147":7,"114804":3,"1149":7,"1150":7,"1153":7,"1154":7,"1156":7,"1157":7,"1158":7,"115942":3,"116156":3,"1162":7,"116204":7,"116331":3,"116334":3,"116384":3,"1164":7,"116403":3,"1166":7,"1167":7,"1173":7,"1174":7,"117754":3,"1178":7,"1179":7,"1181":7,"1200101":7,"120779":3,"120783":3,"120936":7,"121182":7,"121183":7,"121196":7,"121198":7,"121200":7,"121201":7,"121208":7,"121265":7,"123001":3,"1253":7,"1254":7,"1255":7,"1257":3,"1258":3,"1259":3,"1260":7,"126302":7,"126423":3,"1272":3,"1273":3,"1274":3,"1275":3,"1276":3,"1277":3,"1278":3,"1279":3,"1280":3,"1281":3,"1282":3,"1283":7,"1284":7,"128652":7,"1288":7,"1289":3,"1291":3,"1293":3,"1294":3,"1295":3,"129565":7,"129567":3,"129577":7,"129580":3,"129583":7,"129585":7,"129657":7,"129658":3,"129659":3,"129661":7,"129665":7,"129666":7,"129667":7,"129692":7,"129699":7,"129704":3,"1298":3,"129859":3,"1300111":3,"1300113":3,"1300119":7,"1300125":3,"1300134":3,"1300197":3,"1300201":3,"1300245":3,"1300301":7,"1300307":3,"1300309":3,"130031":3,"130032":3,"1300489":3,"1300490":3,"1300491":7,"1300565":3,"1300567":7,"1300612":3,"1300640":3,"1300671":3,"1300879":3,"1300881":3,"1300885":7,"1300916":3,"1300918":3,"1301":3,"1301102":7,"1301104":3,"1301106":7,"1301108":7,"1301169":7,"1301254":7,"130127":7,"1301293":7,"1301344":3,"1301372":3,"1301374":3,"130159":3,"130162":3,"130167":3,"130170":3,"130171":3,"130173":3,"130174":7,"130175":3,"130176":3,"130220":7,"130289":7,"130304":7,"130338":7,"130340":3,"130341":7,"130342":7,"130343":7,"130344":7,"130346":7,"130351":7,"130354":7,"130355":7,"130360":7,"130362":7,"130366":7,"130367":7,"130380":7,"130382":7,"130496":7,"130498":7,"130501":3,"130509":7,"130510":3,"130511":3,"130515":3,"130525":7,"130550":3,"130561":7,"130800":7,"130801":7,"130802":7,"130803":7,"130804":3,"130820":3,"130821":7,"130823":3,"130837":3,"130856":3,"130859":7,"130872":3,"130873":7,"130875":3,"130877":3,"130879":3,"130881":3,"131125":3,"131135":3,"131162":3,"1312":3,"131229":3,"131289":3,"1316":3,"1318":3,"1326":7,"1328":3,"1330":3,"1332":3,"1336":3,"1339":3,"1341":3,"1344":7,"134732":3,"1351":3,"1353":3,"135351":3,"135356":3,"135359":7,"135362":3,"135368":7,"135371":7,"135377":7,"135382":7,"1355":3,"136007":3,"136013":7,"136014":3,"136021":7,"136153":3,"136156":3,"136158":3,"136197":3,"136208":3,"136237":3,"136281":7,"136460":3,"136464":3,"136468":3,"1365":7,"1374":3,"1376":7,"1378":7,"137897":3,"137904":7,"137912":3,"137917":3,"137947":3,"137958":3,"137959":3,"137962":3,"137973":3,"1380":3,"138156":7,"138174":3,"138447":3,"1387":7,"1392":3,"1396":7,"1397":3,"1399":3,"14018428":7,"1403":3,"1404":3,"1409":3,"1410":7,"1412":3,"1413262":7,"1413274":7,"1414":3,"1416":7,"1422":3,"1426":7,"1430":3,"1432":3,"1446":3,"1449":3,"1450":3,"1451":3,"1452":7,"1454":3,"1455":7,"1456":7,"1458":7,"1459":7,"1462":7,"1468":7,"1469":3,"1471":7,"1474":3,"1476":7,"1477":7,"1478":7,"1479":3,"1480":7,"1481":7,"1484":3,"1485":7,"1486":3,"1487":7,"1488":7,"1489":7,"1493":3,"1494":7,"1495":7,"1500":7,"15004168":3,"1502":3,"1503260":7,"1503308":7,"1503411":3,"1503465":7,"15035999":3,"15051934":7,"15086549":3,"15086550":3,"151027":7,"1513":7,"1515":3,"1518":7,"1519":3,"152":3,"1520":3,"1522":3,"1523":7,"1525":7,"1529":7,"1530":3,"1533":7,"1536":7,"1539":7,"154":7,"1540":3,"1541":7,"1542":7,"1548":3,"155":3,"1551":3,"1554":3,"1555":7,"1556":7,"1557":7,"1558":7,"156":3,"1562":3,"1563":3,"1564":3,"1569":7,"1570":7,"1571":7,"1572":3,"1573":7,"1575":7,"1577":7,"158":3,"1580":7,"1581":3,"1583":3,"1584":3,"1586":7,"1588":7,"159":3,"1590":3,"1591":3,"1592":3,"1593":7,"1596":7,"1597":7,"1598":3,"1599":3,"160":3,"1600":7,"1601":3,"16034828":3,"16036182":3,"16057026":3,"16077360":3,"16123919":3,"1613":7,"1614":3,"1615":7,"1620":7,"1622":7,"1623":7,"1624":3,"1629":3,"1630":7,"16309710":3,"1632":7,"16324690":3,"1637":3,"1639":7,"1660":7,"1661":7,"1664":7,"1665":7,"1666":7,"1667":7,"1668":7,"1675":3,"1676":3,"1678":7,"168":7,"1680":7,"1682":7,"1684":3,"1685":7,"1687":7,"1688":3,"1689":3,"1690":7,"1695":7,"1697":7,"1699":7,"17000059":3,"17004083":3,"17026902":3,"17033577":7,"17037713":3,"1704":7,"17040498":3,"17041311":3,"1705":7,"1707":7,"1708":7,"1709":7,"1710":7,"1714":7,"1716":7,"1717":7,"1723":3,"1724":3,"1725":7,"1726":7,"1727":7,"1728":7,"1729":7,"1733":7,"1736":7,"1737":7,"1739":7,"1740":7,"1741":7,"1742":7,"1743":7,"1744":7,"1746":3,"1747":7,"1749":7,"1750":7,"1751":7,"1752":7,"1753":7,"1759":7,"1767":7,"1772":7,"1775":7,"1776":7,"1777":7,"1780":3,"1783":3,"1784":3,"1786":3,"1787":7,"1788":3,"1791":3,"1792":7,"1796":7,"1797":3,"1798":3,"1800":3,"18008817":3,"1801":3,"1802":3,"1803":3,"1804":3,"1805":3,"1806":7,"1807":7,"1808":3,"1809":3,"1810":7,"1811":3,"1816":7,"1817":3,"1818":3,"1823":3,"1825":3,"1827":3,"1829":7,"1831":3,"1833":3,"1836":3,"1839":7,"184":3,"1840":3,"1841":3,"1842":7,"1843":3,"1844":3,"1847":3,"1848":3,"1849":7,"1850":7,"1851":3,"1852":3,"1853":3,"1854":3,"1855":7,"1856":3,"1857":7,"1858":7,"186":7,"1862":7,"1863":7,"1864":7,"1865":7,"1866":7,"1867":7,"1868":7,"1870":7,"1871":3,"1873":7,"1874":7,"1875":7,"1876":7,"1878":7,"1879":7,"1881":7,"1884":3,"1885":7,"1895":7,"1900709":3,"1902":3,"1903":3,"1904":3,"1905":3,"1907":3,"1909":3,"1910":3,"1913":3,"19144990":3,"1927":3,"1932":3,"1938":3,"194":7,"1940":7,"1943":7,"1950":7,"1951":7,"1952":7,"1954":7,"1955":7,"1957":7,"1971":7,"199":7,"1991":7,"1992":7,"2000015950":3,"2000017276":3,"2000017421":7,"2000020418":7,"2000022413":7,"2000028043":7,"2000030636":7,"2000032491":3,"2000034640":3,"2000034642":3,"2000034652":3,"2000040208":3,"2000078066":3,"2000082862":7,"2000104441":7,"2000105301":3,"2000111526":3,"2000112559":7,"2000115816":3,"2000125448":3,"2000152066":3,"2000153732":3,"2000173149":7,"2000173150":7,"2000173154":7,"2000183268":3,"2000188795":7,"2000193551":3,"2000255116":3,"2000260278":3,"2000263090":7,"2000282424":7,"20030048":3,"20041327":3,"20046403":3,"2005":7,"2009":7,"2047":7,"2048":7,"2061":7,"2062":3,"2068":3,"2072":7,"2075":3,"2083":7,"2085":7,"2090":3,"2092":3,"2093":7,"2094":7,"2096":7,"2097":7,"2104":3,"2121":7,"2139":7,"2141":7,"2142":3,"2150":3,"2151":3,"2153":7,"2157":3,"2158":3,"2159":3,"216":3,"2161":3,"2164":7,"2165":3,"2168":3,"2170":3,"2172":3,"2175":3,"2176":3,"2180":3,"2185":7,"2188":7,"2191":3,"2193":7,"2194":7,"2195":7,"2199":7,"2200063":7,"22003932":7,"22003969":7,"2201":7,"22019542":7,"22033716":3,"22033833":7,"22034856":3,"22040114":7,"2205":7,"22067423":7,"22069955":7,"22070174":7,"22087833":7,"2212":7,"2215":7,"2216":7,"2217":7,"2218":7,"2219":7,"2220":3,"2222":3,"2224":7,"2227":7,"2229":7,"2231":7,"2233":7,"2237":3,"2238":7,"2245":7,"2247":7,"2249":7,"2253":7,"228":3,"231":7,"23195015":3,"23199255":3,"232":7,"23292170":3,"233":7,"23340823":3,"23396078":7,"23447397":3,"23486440":3,"23487243":3,"23500747":7,"23500764":7,"23501058":3,"23501071":3,"23501076":7,"23501090":3,"23501094":3,"23501107":7,"23501271":3,"23501281":3,"23501368":3,"2383":7,"2384":3,"2386":7,"2387":7,"2388":7,"2389":3,"2390":7,"2391":3,"2393":3,"2394":7,"2395":3,"2397":7,"2401":3,"24013516":7,"24014012":3,"24021028":3,"2403":7,"2404":3,"2405":3,"24059190":7,"24059986":3,"2406":7,"2407":3,"2410":3,"2413":7,"2416":7,"2420":3,"2422":7,"2423":3,"2424":3,"2427":3,"2428":3,"2433":7,"2435":3,"2437":3,"2438":7,"2440":3,"2443":7,"2444":3,"2446":3,"2447":3,"2448":7,"2450":3,"2454":3,"2455":3,"2456":3,"2460":3,"2463":3,"2466":3,"2471":3,"2473":3,"2478":3,"2479":3,"248":3,"2484":7,"2493":3,"250":7,"25001307":3,"2506":3,"2514":3,"2518":3,"2537":3,"254":3,"2557":3,"2558":3,"256":7,"2566":3,"257":7,"2579":3,"258":7,"2580":3,"2588":3,"2593":3,"2598":3,"2603":3,"2608":3,"2609":3,"262":7,"2621":3,"2625":3,"2627":3,"263":7,"2634":3,"2639":3,"2643":3,"2645":3,"2658":3,"2668":3,"2677":3,"2678":3,"27017889":7,"27035536":7,"27128372":3,"27147895":3,"27155310":3,"2720":3,"278":3,"280":7,"288":7,"289":7,"29066004":3,"29106539":7,"29130446":3,"298":7,"299":7,"30010181":3,"30015287":3,"30019954":3,"30021186":3,"301102":7,"301151":7,"301304":7,"301344":3,"303":3,"303815":3,"303816":3,"307":7,"308104":3,"308107":7,"308516":3,"309345":7,"309346":7,"309348":3,"309353":3,"3100018":7,"3101516":7,"312":7,"314":7,"315":7,"316":7,"317":7,"318860":7,"318915":7,"319":7,"320":7,"321":7,"322":7,"323":7,"324":7,"325":3,"326":7,"327":3,"329":7,"332":7,"335":7,"337":7,"338":7,"339":7,"340":7,"3400446":3,"34053971":3,"341":7,"349":7,"3501956":7,"351":7,"351064":3,"352":3,"353":7,"354":7,"356":3,"358409":3,"36000499":7,"36006475":3,"36018144":3,"36043527":7,"36077318":7,"36136195":7,"36500001":3,"36500002":3,"36500003":3,"36500004":3,"36500008":3,"36500009":3,"36500015":3,"36510163":7,"36510164":7,"36512955":7,"36518155":3,"3800256":7,"38004842":3,"38004848":7,"38013478":3,"38013493":3,"38017639":3,"38019804":3,"38032696":7,"38037178":3,"38042162":7,"39001207":3,"39002395":3,"39048732":3,"4001706":3,"400362":7,"406":3,"4100013":3,"4102502":3,"412":3,"414":3,"414171":3,"414175":3,"414179":3,"414230":3,"416":3,"416239":3,"416240":3,"416241":3,"417":7,"419":3,"420":7,"4200483":3,"4200564":7,"4200566":7,"4200572":3,"4200575":7,"4202262":3,"42027989":7,"4203003":7,"4203006":3,"4203018":7,"4203033":3,"4203036":7,"42074476":7,"421":7,"4212102":3,"4212111":7,"4212115":3,"4212118":3,"4212151":7,"4212156":3,"4212168":7,"4212197":7,"4212207":7,"4212228":3,"4212243":3,"4212275":3,"4212278":3,"4212284":7,"4212292":3,"4212294":7,"4212307":7,"4212313":3,"4212372":3,"4212395":7,"4212400":3,"4212406":7,"4212419":3,"4212901":7,"423":7,"425":3,"426":3,"426430":7,"427":7,"429":7,"430":3,"4300018":3,"4300046":3,"4300229":3,"4300347":3,"4300353":3,"4300358":3,"43006436":3,"4300655":3,"4300678":3,"4300693":3,"43007150":7,"4300728":3,"4300731":3,"4300744":3,"4300754":3,"4300771":3,"43018336":7,"4302207":3,"43036943":7,"4303997":3,"43058693":3,"43065074":7,"43079093":7,"43124315":7,"43152205":7,"43156731":3,"432":7,"43204872":7,"43210768":7,"43269673":7,"433":7,"440":7,"4400014":3,"441":3,"442":3,"447":7,"450550":3,"450573":7,"453567":7,"453682":7,"454194":7,"454840":7,"455675":7,"457419":7,"458631":7,"458718":7,"459181":7,"463":3,"465":3,"467":3,"468":3,"470":3,"47001127":3,"47024031":3,"47053664":3,"47085621":3,"472":3,"473":3,"474":3,"475":3,"476":7,"477":7,"478":3,"480":7,"481":3,"482":7,"483":7,"483870":7,"484460":7,"485662":7,"485665":7,"485667":3,"485671":3,"485674":3,"485682":3,"485686":3,"485706":3,"493":7,"496":3,"5000207":3,"50034825":7,"502":7,"504":3,"505":7,"507":3,"508":3,"5100015":3,"5100019":3,"5100031":3,"5100047":7,"5100078":3,"5100088":3,"5100123":3,"5100132":7,"5100139":3,"5100145":3,"5100153":3,"5100157":3,"5100163":3,"5100186":7,"5100192":3,"5100210":3,"5100217":7,"5100225":3,"5100326":3,"51008732":7,"51008744":7,"5103640":3,"5103643":3,"5103663":3,"5103671":7,"5103697":3,"5103719":3,"5103760":3,"5103834":3,"5103842":7,"5103900":3,"51039162":7,"5103927":3,"51045865":7,"51047275":3,"51051210":7,"51051219":7,"51052402":3,"5110769":7,"512":3,"514173":3,"516":3,"520":3,"52004979":3,"5201527":7,"5201742":3,"5201786":3,"5203872":7,"52065322":7,"52085341":3,"52086656":3,"52098789":7,"521":3,"523":3,"524":3,"526":7,"5260325":3,"5260969":3,"5261737":7,"5261738":3,"5261740":7,"5261741":7,"527945":3,"5290560":3,"5290566":7,"5290571":3,"5290593":3,"5290626":3,"5290629":3,"53000245":3,"53000361":3,"53021327":3,"533":7,"534":7,"539":3,"539089":7,"54003060":3,"541":3,"5410568":3,"5410642":3,"542":3,"545":7,"55000306":7,"55000307":7,"55000308":7,"55001072":3,"55001075":7,"55001110":7,"55012090":3,"55027091":3,"55038928":3,"55056835":7,"55056925":7,"551":3,"552":7,"5601448":3,"5602973":3,"5604963":7,"5605072":7,"5609646":3,"562":3,"5623370":7,"5623377":3,"5640780":3,"5645563":7,"5647950":7,"5652987":7,"5661013":3,"5661074":3,"5661084":3,"5666338":3,"569":7,"57000252":3,"57000777":7,"57031764":3,"57048549":3,"57053599":3,"57055056":3,"57057268":7,"57061123":3,"57065222":3,"57065617":3,"57066631":3,"57080206":3,"57086204":3,"57110237":7,"57110301":3,"57111101":7,"57113687":3,"57131211":3,"57141891":7,"57143011":7,"57151105":7,"57151160":7,"57152989":3,"57153289":3,"57161868":7,"57170797":3,"57171586":7,"5720002":3,"573":7,"5740640":3,"5742987":7,"5742993":3,"5743000":3,"5743879":7,"5744631":7,"5745180":3,"5747642":7,"5748006":3,"5754056":3,"5766280":3,"5774738":3,"58029064":3,"58046584":3,"58066512":3,"581":7,"58126754":3,"58127493":7,"58137861":3,"58145316":7,"58145347":7,"58145944":7,"58148224":3,"58148228":7,"587":3,"589":7,"593":7,"600":7,"6000005":7,"6000006":7,"6002479":3,"601":3,"602":7,"603":7,"605":3,"606":7,"607":7,"608":3,"609":7,"610653":3,"611":7,"611417":3,"611596":3,"612":7,"613":7,"614":7,"615":3,"616":7,"616339":3,"617":7,"618":7,"618372":3,"619":7,"619060":3,"619064":3,"619076":7,"619816":3,"620":7,"62030404":7,"62031842":7,"62063172":3,"62085128":7,"620906":3,"62159794":3,"62176216":3,"622":7,"624":3,"625":7,"626":3,"628":7,"629":3,"630":7,"63000888":7,"63000893":3,"63000895":3,"63010727":3,"63011666":7,"63011669":7,"63025380":7,"63032360":3,"63035357":7,"631":3,"634":3,"635":7,"636":7,"637":7,"639":7,"640":7,"6400020":3,"64000753":7,"641":7,"6410294":3,"6410420":3,"6410547":3,"642":7,"643":3,"645":7,"646":7,"647":3,"650":7,"650441":7,"651":7,"654":7,"655":7,"656":7,"657":3,"658":7,"658353":7,"661":3,"661027":3,"661680":3,"662735":3,"664":7,"665":7,"667":7,"669":3,"67000108":3,"67000113":7,"67016709":3,"67016725":7,"6703397":3,"67034790":3,"67040821":7,"67040945":3,"67041048":3,"67060765":3,"6706354":7,"6706364":3,"6706369":3,"67070379":7,"67083655":3,"67089705":3,"67090031":3,"671":7,"67105977":3,"67118675":7,"67129155":3,"67129170":3,"67148466":3,"67152828":3,"67156323":3,"67173952":3,"67173955":3,"67174187":3,"67180027":7,"67181500":3,"67224671":3,"67243415":3,"67259056":7,"67276809":3,"67290895":3,"67291347":3,"673":7,"674":7,"675":7,"676":7,"676958":3,"677":7,"677885":7,"678102":7,"679":7,"680":7,"68001174":3,"68002003":7,"68002700":3,"68012711":3,"68017422":7,"68017475":3,"68020055":3,"681":7,"682130":7,"685":7,"686":7,"687":3,"687626":3,"688":7,"689":7,"691":7,"692":7,"693":3,"694":7,"694366":3,"695":7,"696":7,"697":7,"698":7,"699":7,"700":7,"7000003":3,"7000008":3,"7000097":7,"70002930":3,"7000476":3,"700059":3,"700060":3,"70016859":7,"700198":7,"700206":7,"70028001":7,"70042969":7,"70042997":7,"70043025":7,"70054558":7,"70054564":7,"70054576":7,"70055738":7,"70061794":7,"70061796":7,"70061804":7,"70061824":7,"70061827":7,"70078171":7,"70078177":7,"70078180":7,"70078650":7,"70080498":7,"70080976":7,"70080983":7,"70080997":7,"70081029":7,"70081334":7,"70081336":7,"70081535":7,"70095984":7,"701":3,"70108557":7,"702":7,"703":3,"704":7,"707":7,"707654":3,"708":7,"709":7,"710":3,"710017":3,"710032":7,"710052":3,"71016825":3,"71045065":3,"71063212":7,"71075348":7,"71098591":7,"71099430":7,"71100066":3,"71100094":7,"71105155":7,"712":3,"713":7,"714":7,"714200":3,"714209":7,"714221":3,"714240":3,"715":3,"715911":3,"715912":3,"716":3,"717313":3,"717327":7,"717332":7,"719":7,"720":7,"72000112":3,"72000160":7,"72000789":7,"72014006":3,"72014193":3,"72019000":3,"72023746":3,"72041885":7,"72047296":7,"72049313":3,"72052048":3,"72053036":3,"721":7,"722":7,"722115":3,"723":7,"724":7,"725":7,"725011":3,"725038":3,"725060":3,"727":3,"728":7,"729":7,"729461":3,"729500":7,"729707":7,"731":7,"732":7,"733":3,"733870":3,"734":7,"734119":3,"734125":3,"735":7,"736258":3,"737":7,"739":7,"740":7,"74032523":3,"74032529":3,"741":7,"741496":3,"742":7,"743":7,"744":7,"7442930":7,"7443983":3,"7446368":3,"7446432":7,"7452056":3,"7452072":7,"7481153":3,"7483392":3,"7485067":7,"7500388":7,"7500389":3,"7500394":3,"7500399":3,"7500915":3,"7501927":7,"7506018":3,"750633":3,"7506471":7,"7521258":7,"7521266":7,"7521273":7,"7521283":7,"7521304":7,"7521327":7,"7524224":3,"7540205":7,"7540447":7,"7542454":3,"755792":3,"7560016":3,"7560050":3,"7563783":3,"7563786":7,"7581525":3,"759312":3,"76003535":7,"76019314":7,"76033284":7,"76034968":3,"76045729":7,"763464":3,"766164":3,"77002090":3,"77005796":3,"77016717":3,"77017082":3,"77029556":7,"78":7,"7840005":3,"7840110":3,"7840114":3,"7840141":3,"7841979":3,"7860421":7,"7983711":7,"7983734":7,"7983747":3,"80":7,"800118":3,"801870":3,"802270":3,"81":7,"8100363":3,"810090":3,"810130":3,"8103641":3,"8104219":3,"8104684":3,"8113017":3,"814059":3,"814071":7,"814086":3,"814089":7,"814350":3,"814437":3,"814590":7,"814632":3,"814662":3,"814840":3,"814898":3,"814935":7,"814968":3,"8157175":3,"82":7,"82070144":3,"824":7,"826":7,"827":7,"828":7,"829172":3,"831":7,"83111318":7,"831197":7,"831366":7,"83163969":3,"83202832":3,"832138":7,"8325012":3,"8325039":7,"8325049":3,"83301114":3,"83314396":3,"838":3,"839":3,"840":7,"8403700":7,"8404703":3,"84107058":3,"84107097":3,"84107152":3,"84107162":3,"84108481":7,"843":7,"844":7,"8457492":3,"846":3,"8478376":3,"85":7,"850022":7,"85052735":7,"851":7,"852":7,"855":7,"856":3,"857":3,"858":7,"859":7,"860":7,"8601358":3,"862":7,"865":7,"866":7,"867":7,"868":7,"87":7,"871":7,"8714658":7,"872":7,"873":3,"874":7,"875":7,"876":7,"876844":7,"877":3,"879226":7,"879516":7,"879643":7,"88":7,"880295":7,"881":3,"8830831":3,"884":7,"886":7,"8878352":3,"888":7,"89":7,"899":7,"90":3,"90002300":7,"90018556":3,"90018558":3,"90060453":3,"900678":7,"901":7,"904":7,"905":7,"907":7,"908":7,"91":7,"91013388":7,"911":7,"912":7,"915":7,"916":7,"918":7,"92":3,"920":7,"921":7,"925050":3,"926867":3,"927":7,"928":7,"928485":3,"93":7,"930105":3,"93018994":3,"93019001":3,"930210":3,"930248":3,"93030437":3,"93030438":3,"93030439":3,"93050950":3,"93052555":3,"93053134":3,"93055260":3,"93056640":7,"93056988":3,"93058662":3,"930621":7,"93063381":3,"93097541":3,"931":7,"93143640":3,"93154509":7,"932443":3,"933":7,"933945":3,"935":7,"937":7,"94":7,"943":7,"943835":7,"944":7,"945":7,"946":7,"947":7,"948":7,"949":7,"95":7,"952695":7,"955":7,"957":7,"958":7,"959":7,"96":7,"960":7,"96000060":3,"96012813":7,"961":7,"967":7,"969":7,"975":7,"975489":3,"976":3,"978":3,"979":3,"98":7,"980":7,"980543":3,"981":7,"982":7,"983":7,"986":7,"991":7,"992":7,"994":3});

  const badgeRequests = new WeakMap();

  function sourceLink(url, label) {
    const link = textElement("a", "club-source-link", label);
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  }

  function renderClubBadge(host, club) {
    const fallback = textElement("span", "club-badge-fallback", club.initials);
    host.classList.add("fm-club-badge");
    host.classList.remove("has-club-image");
    host.style.setProperty("--club-colour", club.colour);
    host.setAttribute("role", "img");
    host.setAttribute("aria-label", `${club.name} \u2014 initials shown while its badge loads`);
    if (host.id === "club-crest") fallback.id = "club-initials";

    const image = document.createElement("img");
    image.className = "club-badge-image";
    image.alt = "";
    image.hidden = true;
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";
    badgeRequests.set(host, image);
    host.replaceChildren(fallback, image);
    image.addEventListener("load", () => {
      // A late response from a previous reroll must not replace this club.
      if (badgeRequests.get(host) !== image) return;
      fallback.hidden = true;
      image.hidden = false;
      host.classList.add("has-club-image");
      host.setAttribute("aria-label", `${club.name} club badge`);
    }, { once: true });
    image.addEventListener("error", () => {
      if (badgeRequests.get(host) !== image) return;
      image.hidden = true;
      fallback.hidden = false;
      host.setAttribute("aria-label", `${club.name} initials \u2014 badge image unavailable`);
    }, { once: true });
    image.src = `https://sortitoutsi.b-cdn.net/uploads/team/club_${club.fmId}.png`;
  }

  function renderClubHonours(container, club) {
    container.replaceChildren();
    const record = clubHonourRecords[club.fmId];
    if (!record) {
      container.append(textElement("p", "club-data-gap", "Trophy history is not yet available for this club in our selected competition records. This does not mean the club has never won a trophy."));
      return;
    }

    const grid = document.createElement("div");
    grid.className = "honours-grid";
    record.trophies.forEach(([name, years, source, sourceName]) => {
      const card = document.createElement("article");
      card.className = "honour-card";
      card.append(
        textElement("strong", "honour-count", years.length),
        textElement("span", "honour-name", name),
        textElement("span", "honour-year", `Last won: ${years[years.length - 1]}`)
      );
      const history = document.createElement("details");
      history.className = "honour-history";
      history.append(
        textElement("summary", "", "Winning years / seasons"),
        textElement("p", "", years.join(" \u00b7 "))
      );
      card.append(history);
      const credit = textElement("p", "club-source-note", "Source: ");
      credit.append(sourceLink(source, sourceName || "RSSSF historical archive"));
      card.append(credit);
      grid.append(card);
    });
    container.append(grid, textElement("p", "club-source-note", "Selected honours only. Counts cover the winning seasons listed; minor, regional and some historical competitions may not be included."));
  }

  function clubKitProfile(club) {
    // Preserve the existing, explicitly checked SS images where supplied.
    const existing = verifiedKits[club.fmId];
    if (existing) {
      return {
        images: Object.fromEntries(existing[1].map(number => [
          ["home", "away", "third"][number - 1],
          `${kitImageRoot}${existing[0]}_${number}.png?width=180&height=180`
        ])),
        source: kitPackSource,
        credit: "Kit artwork by bolid74, via ",
        sourceName: "sortitoutsi\u2019s 2023/24 pack"
      };
    }
    const slots = archiveKitSlots[club.fmId];
    if (!slots) return null;
    const images = {};
    ["home", "away", "third"].forEach((type, index) => {
      if (slots & (1 << index)) {
        images[type] = `${archiveKitImageRoot}/${club.fmId}/${type}.png`;
      }
    });
    return {
      images,
      source: `https://kits.fmslovakia.com/club/${club.fmId}?season=2023-24`,
      credit: "FC\u201912 kit artwork by Allstar Kitmakers, via ",
      sourceName: "FM Slovakia\u2019s 2023/24 archive"
    };
  }

  function renderClubKits(container, club) {
    container.replaceChildren();
    const profile = clubKitProfile(club);
    const grid = document.createElement("div");
    grid.className = "club-kit-grid";
    ["Home", "Away", "Third"].forEach((label) => {
      const type = label.toLowerCase();
      const url = profile?.images[type];
      const card = document.createElement("figure");
      card.className = "club-kit-card";
      const frame = document.createElement("div");
      frame.className = "club-kit-frame";
      const status = textElement("p", "kit-image-status", "2023/24 kit image not available yet");
      frame.append(status);

      if (url) {
        status.textContent = "Loading kit\u2026";
        const image = document.createElement("img");
        image.alt = `${club.name} ${type} kit, 2023/24`;
        image.hidden = true;
        image.width = 180;
        image.height = 180;
        image.decoding = "async";
        image.referrerPolicy = "no-referrer";
        const slowImageTimer = window.setTimeout(() => {
          status.textContent = "Kit image is taking longer to load";
        }, 10000);
        image.addEventListener("load", () => {
          window.clearTimeout(slowImageTimer);
          status.hidden = true;
          image.hidden = false;
        }, { once: true });
        image.addEventListener("error", () => {
          window.clearTimeout(slowImageTimer);
          image.hidden = true;
          status.hidden = false;
          status.textContent = "Kit image unavailable";
        }, { once: true });
        frame.append(image);
        image.src = url;
      }
      card.append(frame, textElement("figcaption", "", `${label} \u00b7 2023/24`));
      grid.append(card);
    });
    container.append(grid);
    const note = textElement("p", "club-source-note", profile
      ? profile.credit
      : "No kit images for this club are listed in our 2023/24 sources yet.");
    if (profile) {
      note.append(sourceLink(profile.source, profile.sourceName));
      note.append(document.createTextNode(". Empty slots mean an image is missing from our sources."));
    }
    container.append(note);
  }


  function renderClubProfile() {
    if (!selectedClub) return;
    const club = selectedClub;
    const panel = byId("profile-panel");
    panel.replaceChildren();
    const intro = document.createElement("div");
    intro.className = "club-profile-heading";
    const badge = document.createElement("div");
    badge.className = "profile-club-badge";
    renderClubBadge(badge, club);
    const identity = document.createElement("div");
    identity.append(
      textElement("p", "eyebrow", "The club behind your challenge"),
      textElement("h3", "", club.name),
      textElement("p", "club-meta", `${club.country} \u00b7 ${club.league}`)
    );
    intro.append(badge, identity);
    const badgeCredit = textElement("p", "club-source-note", "Badge image: ");
    badgeCredit.append(sourceLink("https://sortitoutsi.net/football-manager-2024/database", "sortitoutsi club guide"));
    badgeCredit.append(document.createTextNode(" \u00b7 Badge artwork may have changed since 2023."));
    const honours = document.createElement("section");
    honours.className = "club-profile-section";
    honours.append(
      textElement("h3", "", "Trophy history"),
      textElement("p", "club-source-note", "Selected senior men\u2019s first-team honours won by 30 June 2023. Coverage varies by club and competition.")
    );
    const honoursContent = document.createElement("div");
    renderClubHonours(honoursContent, club);
    honours.append(honoursContent);
    const kits = document.createElement("section");
    kits.className = "club-profile-section";
    kits.append(textElement("h3", "", "2023/24 kits"));
    const kitsContent = document.createElement("div");
    renderClubKits(kitsContent, club);
    kits.append(kitsContent);
    panel.append(intro, badgeCredit, honours, kits);
  }

  function careerClubIdentity(club) {
    const identity = document.createElement("div");
    identity.className = "career-club-identity";
    const badge = document.createElement("div");
    badge.className = "career-club-badge";
    renderClubBadge(badge, club);
    identity.append(badge, textElement("p", "career-club-name", club.name));
    return identity;
  }

  function initialiseClubPresentation() {
    const style = document.createElement("style");
    style.id = "club-presentation-styles";
    style.textContent = clubPresentationStyles;
    document.head.append(style);

    byId("honours-title").textContent = "Trophy history";
    const honours = byId("club-honours");
    honours.className = "";
    const honoursNote = textElement("p", "club-source-note", "Selected senior men\u2019s first-team honours won by 30 June 2023. Coverage varies by club and competition.");
    honours.parentNode.insertBefore(honoursNote, honours);

    const kits = document.createElement("section");
    kits.className = "club-profile-section reveal-kit-section";
    const kitTitle = textElement("h3", "", "2023/24 kits");
    kitTitle.id = "reveal-kits-title";
    kits.setAttribute("aria-labelledby", kitTitle.id);
    const kitsContent = document.createElement("div");
    kitsContent.id = "reveal-club-kits";
    kits.append(kitTitle, kitsContent);
    byId("club-result").insertBefore(kits, byId("club-result").querySelector(".reveal-actions"));

    const heading = byId("briefing-screen").querySelector(".briefing-heading");
    const identity = document.createElement("div");
    identity.className = "briefing-club-identity";
    const badge = document.createElement("div");
    badge.id = "briefing-club-badge";
    badge.className = "briefing-club-badge";
    identity.append(badge, heading.firstElementChild);
    heading.insertBefore(identity, heading.firstElementChild);

    const nav = byId("briefing-screen").querySelector(".briefing-tabs");
    const button = textElement("button", "briefing-tab", "Club Profile");
    button.id = "profile-tab-button";
    button.type = "button";
    button.setAttribute("aria-controls", "profile-panel");
    button.addEventListener("click", () => switchTab("profile"));
    nav.insertBefore(button, nav.firstElementChild);
    const panel = document.createElement("section");
    panel.id = "profile-panel";
    panel.className = "club-profile-panel";
    panel.setAttribute("aria-label", "Club profile");
    panel.hidden = true;
    byId("briefing-screen").insertBefore(panel, byId("tactics-panel"));
  }

  const clubPresentationStyles = ".fm-club-badge {\n  display: grid; place-items: center; flex-shrink: 0;\n  clip-path: none; background: transparent;\n}\n.fm-club-badge > * { grid-area: 1 / 1; }\n.fm-club-badge .club-badge-image {\n  display: block; width: 100%; height: 100%; object-fit: contain;\n  filter: drop-shadow(0 6px 14px rgb(0 0 0 / 22%));\n}\n.fm-club-badge .club-badge-fallback {\n  display: grid; place-items: center; padding: 10px;\n  width: 100%; height: 100%; box-sizing: border-box;\n  border: 1px solid var(--border); border-radius: 16px;\n  background: var(--card); color: var(--text); font-weight: 800;\n  font-size: 16px; overflow-wrap: anywhere; text-align: center;\n}\n.fm-club-badge [hidden], .club-kit-frame [hidden] { display: none !important; }\n.briefing-club-identity, .club-profile-heading, .career-club-identity {\n  display: flex; align-items: center; gap: 20px; min-width: 0;\n}\n.briefing-club-identity > div:last-child, .club-profile-heading > div:last-child { min-width: 0; }\n.briefing-club-badge { width: 64px; height: 76px; }\n.profile-club-badge { width: 90px; height: 104px; }\n.career-club-badge { width: 38px; height: 46px; }\n.career-club-badge .club-badge-fallback { padding: 4px; font-size: 10px; border-radius: 8px; }\n.career-club-identity { gap: 12px; margin: 14px 0; }\n.career-club-identity .career-club-name { margin: 0; }\n.briefing-tabs { display: flex; flex-wrap: wrap; }\n.briefing-tabs .briefing-tab { flex: 1 1 130px; }\n.club-profile-panel { padding: 26px; border: 1px solid var(--border); border-radius: 16px; background: var(--card); }\n.club-profile-heading h3 { margin: 0 0 10px; font-size: clamp(24px, 3vw, 32px); overflow-wrap: anywhere; }\n.club-profile-heading .eyebrow { margin: 0 0 12px; }\n.club-profile-section { margin-top: 30px; padding-top: 26px; border-top: 1px solid var(--border); }\n.club-profile-section h3 { margin: 0 0 16px; font-size: 19px; color: var(--text); }\n.club-source-note { color: var(--muted); font-size: 12px; line-height: 1.8; margin: 12px 0 18px; }\n.club-source-link { color: var(--blue); text-underline-offset: 3px; }\n.club-data-gap { color: var(--muted); font-size: 14px; line-height: 1.7; margin: 0; }\n.honour-history { margin-top: 14px; color: var(--muted); font-size: 12px; line-height: 1.8; }\n.honour-history summary { cursor: pointer; color: var(--blue); }\n.honour-history p { margin: 8px 0 0; }\n.club-kit-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }\n.club-kit-card { min-width: 0; margin: 0; border: 1px solid var(--border); border-radius: 14px; overflow: hidden; background: var(--card); }\n.club-kit-frame { display: grid; place-items: center; min-height: 206px; padding: 12px; box-sizing: border-box; background: radial-gradient(ellipse at center, rgb(69 182 255 / 7%), transparent 80%); }\n.club-kit-frame img { width: min(180px, 100%); height: auto; object-fit: contain; }\n.kit-image-status { margin: 0; max-width: 160px; color: var(--muted); text-align: center; font-size: 13px; line-height: 1.7; }\n.club-kit-card figcaption { padding: 14px; border-top: 1px solid var(--border); text-align: center; font-size: 13px; color: var(--text); }\n@media (max-width: 700px) {\n  .club-profile-panel { padding: 18px; }\n  .club-profile-panel .honours-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n  .club-kit-grid { gap: 10px; }\n  .club-kit-frame { min-height: 160px; padding: 8px; }\n  .club-kit-card figcaption { padding: 12px 6px; font-size: 12px; }\n  .briefing-club-identity { gap: 12px; }\n  .briefing-club-badge { width: 48px; height: 58px; }\n}\n@media (max-width: 460px) {\n  .club-kit-grid, .club-profile-panel .honours-grid { grid-template-columns: 1fr; }\n  .club-kit-frame { min-height: 206px; }\n  .club-profile-heading { gap: 14px; }\n  .profile-club-badge { width: 64px; height: 76px; }\n}\n";

  function renderClub(club) {
    updatePoolNotice();
    byId("club-title").textContent = club.name;
    byId("club-initials").textContent = club.initials;
    byId("club-country").textContent = club.country;
    byId("club-league").textContent = club.league;
    byId("club-difficulty").textContent =
      difficultyNames[selectedDifficulty];
    byId("club-introduction").textContent = club.introduction;

    renderClubBadge(byId("club-crest"), club);
    byId("club-honours").closest(".club-honours").hidden = false;
    renderClubHonours(byId("club-honours"), club);
    renderClubKits(byId("reveal-club-kits"), club);

    byId("club-country").title = "League country";
    const arrow = textElement("span", "", "\u2192");
    arrow.setAttribute("aria-hidden", "true");
    byId("view-challenge-button").replaceChildren(
      document.createTextNode("View My Challenge "),
      arrow
    );

  }

  function startClubDraw() {
    if (selectedDifficulty === null || isRevealing || !clubPoolReady) {
      return;
    }

    // Draw directly from the selected difficulty's flat pool. No country or
    // league weighting, sequence, or exclusion of previously drawn clubs.
    const eligible = getClubPool();

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
        eligible[randomIndex(eligible.length)].name;

      const delay = 80 + Math.pow(elapsed / duration, 3) * 320;
      revealTimer = window.setTimeout(tick, delay);
    }

    tick();
  }

  function getSquad() {
    if (squads.has(selectedClub.id)) {
      const existing = squads.get(selectedClub.id);
      ensureSquadTactic(existing);
      return existing;
    }
    if (!squads.has(selectedClub.id)) {
      const snapshot = savedClubSnapshot();
      if (snapshot) {
        const players = snapshot.players.map(player => ({
          ...player, id: nextPlayerId++,
          shortName: player.name.split(/\s+/).at(-1)
        }));
        squads.set(selectedClub.id, {
          players, startingIds: tacticalPositions.map(() => nextPlayerId++),
          source: { kind: snapshot.kind || "saved-export", gameDate: snapshot.gameDate, leagueName: snapshot.leagueName,
            sampleSize: snapshot.sampleSize, clubCount: snapshot.clubCount }
        });
        ensureSquadTactic(squads.get(selectedClub.id));
        return squads.get(selectedClub.id);
      }
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

    return (squad.tactic?.assignments || tacticalPositions).map((assignment, index) => {
      const player = squad.players.find(
        (candidate) => candidate.id === squad.startingIds[index]
      );

      return {
        name: player ? player.name : "Vacant position",
        shortName: player ? player.shortName : "Vacant",
        rating: player ? player.rating : null,
        vacant: !player,
        ratingRange: player?.ratingRange,
        pitchPosition: assignment[0],
        position: assignment[1],
        role: assignment[2],
        duty: assignment[3]
      };
    });
  }


  function renderInjuryReplacement(index) {
    const squad = getSquad();
    let form = byId("injury-replacement-form");
    if (!squad.tactic) { if (form) form.hidden = true; return; }
    if (!form) {
      form = document.createElement("form");
      form.id = "injury-replacement-form";
      form.className = "signing-form";
      form.append(textElement("h4", "", "Injury replacement"));
      form.append(textElement("p", "signing-note", "Select a replacement only when this player is injured. The position, role and duty stay fixed. Check fitness and registration in FM."));
      const select = document.createElement("select");
      select.id = "injury-replacement-player";
      select.className = "squad-select";
      select.setAttribute("aria-label", "Injury replacement player");
      const label = document.createElement("label");
      label.className = "signing-note";
      const confirm = document.createElement("input");
      confirm.type = "checkbox"; confirm.id = "injury-replacement-confirm"; confirm.required = true;
      label.append(confirm, document.createTextNode(" I confirm this change is because of an injury."));
      const button = textElement("button", "button button-secondary", "Confirm Injury Replacement");
      button.type = "submit"; button.id = "injury-replacement-submit";
      const status = textElement("p", "signing-note", ""); status.id = "injury-replacement-status"; status.setAttribute("role", "status");
      form.append(select, label, button, status);
      byId("selected-player-facts").parentNode.append(form);
      form.addEventListener("submit", event => {
        event.preventDefault();
        const current = getSquad();
        const slotIndex = Number(form.dataset.index);
        const replacement = current.players.find(p => p.id === Number(byId("injury-replacement-player").value));
        const slot = current.tactic?.slots[slotIndex];
        if (!byId("injury-replacement-confirm").checked || !slot || !replacement ||
          current.startingIds.includes(replacement.id) || !fitsTacticSlot(replacement, slot)) return;
        const oldId = current.startingIds[slotIndex];
        current.startingIds[slotIndex] = replacement.id;
        (current.injuryChanges ||= []).push({oldId, replacementId:replacement.id, slotIndex, reason:"injury", recordedAt:new Date().toISOString()});
        if (!persistActiveCareer()) {
          current.startingIds[slotIndex] = oldId;
          current.injuryChanges.pop();
          byId("injury-replacement-status").textContent = "The change could not be saved. Your previous lineup is unchanged.";
          return;
        }
        renderTactics();
        showPlayerDetails(slotIndex, false);
        byId("injury-replacement-status").textContent = `${replacement.name} selected. Formation, role and duty unchanged.`;
      });
    }
    form.hidden = false;
    form.dataset.index = String(index);
    byId("injury-replacement-confirm").checked = false;
    byId("injury-replacement-status").textContent = "";
    const choices = squad.players.filter(player => !squad.startingIds.includes(player.id) && fitsTacticSlot(player, squad.tactic.slots[index]));
    const select = byId("injury-replacement-player");
    select.replaceChildren(...choices.map(player => {
      const option = textElement("option", "", `${player.name} \u00b7 ${player.positions}`);
      option.value = String(player.id); return option;
    }));
    select.disabled = !choices.length;
    byId("injury-replacement-submit").disabled = !choices.length;
    if (!choices.length) byId("injury-replacement-status").textContent = "No available reserve has this position listed.";
  }

  function clearPlayerDetails() {
    byId("selected-player-name").textContent = "Select a player";
    byId("selected-player-position").textContent = "";
    byId("selected-player-rating").hidden = true;
    byId("selected-player-rating-caption").hidden = true;
    byId("selected-player-facts").hidden = true;
    if (byId("injury-replacement-form")) byId("injury-replacement-form").hidden = true;
  }

  function showPlayerDetails(index, shouldAnnounce = true) {
    const player = getLineup()[index];

    if (!player || player.vacant) {
      return;
    }

    byId("selected-player-name").textContent = player.name;
    byId("selected-player-position").textContent = player.position;
    byId("selected-player-rating-value").textContent =
      player.rating === null ? "\u2014" : player.rating.toFixed(1);
    byId("selected-player-rating-caption").textContent = getSquad().source
      ? (player.ratingRange ? `Estimated league-relative quality \u00b7 possible ${player.ratingRange.low.toFixed(1)}\u2013${player.ratingRange.high.toFixed(1)}/10`
        : "Not enough attributes for a league-relative rating")
      : "League-relative quality \u00b7 provisional demonstration rating";
    byId("selected-player-pitch-position").textContent =
      player.pitchPosition;
    byId("selected-player-role").textContent = player.role;
    byId("selected-player-duty").textContent = player.duty;

    byId("selected-player-rating").hidden = false;
    byId("selected-player-rating-caption").hidden = false;
    byId("selected-player-facts").hidden = false;
    renderInjuryReplacement(index);

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
        (player.rating === null ? "Rating unavailable." : `Estimated rating: ${player.rating.toFixed(1)} out of 10.`)
      );
    }
  }

  function renderTactics() {
    const lineup = getLineup();
    const container = byId("tactics-players");
    container.replaceChildren();

    const plan = getSquad().tactic;
    const formation = plan?.name || "4-2-3-1";
    byId("formation-title").textContent = formation;
    let note = byId("generated-tactic-note");
    if (!note) {
      note = textElement("p", "hero-note", "");
      note.id = "generated-tactic-note";
      byId("tactics-pitch").parentNode.append(note);
    }
    note.hidden = !plan;
    note.textContent = plan?.explanation || "";
    byId("tactics-pitch").style.setProperty(
      "--club-colour",
      selectedClub.colour
    );
    byId("tactics-pitch").setAttribute(
      "aria-label",
      `${selectedClub.name} ${formation} lineup`
    );

    (plan?.rows || formationRows).forEach((indexes) => {
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
    const note = byId("squad-panel").querySelector(".preview-note");
    if (note) {
      if (squad.source?.kind === "starting-database") {
        note.textContent = `Original FM24 squad snapshot: ${squad.source.gameDate} - ${squad.source.leagueName}. ` +
          `${squad.source.sampleSize} comparison players across ${squad.source.clubCount} represented clubs. ` +
          "Includes youth and reserves where their club links could be verified; some squads are incomplete. " +
          "Ratings estimate league-relative quality against adult players in the same position group, with each club given equal weight. " +
          "A dash means the comparison sample is too small. These are estimates, not official FM ability ratings. " +
          (squad.tactic ? `Open Tactics for your fixed ${squad.tactic.name} formation and roles.`
            : "A full eleven in the supported formations could not be matched to the available positions, so tactics are pending.");
      } else {
        note.textContent = squad.source
      ? `Save snapshot: ${squad.source.gameDate} \u00b7 ${squad.source.leagueName}. ` +
        `${squad.source.sampleSize} comparison players across ${squad.source.clubCount} clubs. ` +
        "These are the players present in your export, including youth and reserves; the list may be incomplete. " +
        "Ratings estimate league-relative quality against adult players in the same position group. " +
        "Masked attributes produce a possible range; a dash means there is not enough information. " +
        "This is your saved game's squad, rather than the original FM24 starting squad. " +
        (squad.tactic ? `Open Tactics for your fixed ${squad.tactic.name} formation and roles.`
          : "A full eleven in the supported formations could not be matched to the exported positions, so tactics are pending.")
      : "Partial demonstration squad with provisional ratings. Save a career to keep your changes.";
      }
    }

    positionGroups.forEach(([groupId, groupName]) => {
      const members = squad.players.filter(
        (player) => player.group === groupId
      );

      if (sort === "rating") {
        members.sort(
          (a, b) => (b.rating ?? -1) - (a.rating ?? -1) || a.name.localeCompare(b.name)
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
          textElement("td", "squad-player-age", player.age ?? "\u2014"),
          textElement("td", "squad-player-position", player.positions)
        );

        const ratingCell = document.createElement("td");
        ratingCell.append(
          textElement(
            "span",
            "squad-player-rating",
            player.rating === null ? "\u2014" : player.rating.toFixed(1)
          )
        );
        if (player.ratingRange) {
          const range = textElement("small", "signing-note", `${player.ratingRange.low.toFixed(1)}\u2013${player.ratingRange.high.toFixed(1)}`);
          range.style.whiteSpace = "nowrap";
          range.style.display = "block";
          range.style.fontSize = "12px";
          range.title = "Possible rating range from masked attributes";
          ratingCell.style.minWidth = "78px";
          ratingCell.append(range);
        }
        row.append(ratingCell);

        const actionCell = document.createElement("td");
        const remove = textElement(
          "button",
          "squad-remove-button",
          "\u00d7"
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
    if ((tab === "tactics" && !hasTactics()) || (tab === "squad" && !hasClubBriefing())) {
      tab = "season";
    }
    activeTab = tab;

    const panels = {
      profile: "profile-panel",
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

    if (tab === "profile") {
      renderClubProfile();
      announce("Club badge, selected trophy history and 2023/24 kits. Missing records are marked.");
    } else if (tab === "squad") {
      renderSquad();

      announce(getSquad().source
        ? "Saved FM squad snapshot with estimated league-relative ratings and possible ranges."
        : "Partial demonstration squad with provisional ratings. Save a career to keep changes.");
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
        getSquad().source ? "Squad-based formation, player roles and duties. Injury replacements keep the tactic fixed."
          : "Demonstration lineup, tactical assignments, and ratings. Vacant positions indicate removed starting players."
      );
    }
  }

  function openBriefing() {
    if (!selectedClub || isRevealing) {
      return;
    }

    getSquad();

    byId("briefing-title").textContent = selectedClub.name;
    renderClubBadge(byId("briefing-club-badge"), selectedClub);
    byId("briefing-league").textContent = selectedClub.league;
    byId("briefing-difficulty").textContent =
      difficultyNames[selectedDifficulty];

    byId("signing-form").hidden = true;
    byId("signing-form").reset();

    renderBriefingAvailability();
    switchTab(hasTactics() ? "tactics" : hasClubBriefing() ? "squad" : "season");
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
    rookie: {arrivals:[8,9,10],age:[30,31],budget:[95],wages:[110],loans:[4],feeShare:[45],ruleCount:2},
    professional: {arrivals:[6,7,8],age:[28,29],budget:[85,90],wages:[100],loans:[3],feeShare:[35],ruleCount:3},
    veteran: {arrivals:[4,5,6],age:[26,27],budget:[75,85],wages:[90,100],loans:[2],feeShare:[25,30],ruleCount:3},
    legendary: {arrivals:[3,4,5],age:[23,24],budget:[65,75],wages:[80,90],loans:[1,2],feeShare:[20,25],ruleCount:4}
  };
  const recruitmentThemes = {
    balanced:{label:'Balanced rebuild',categories:['budget','age','loans','wages','fees']},
    youth:{label:'Develop the next generation',categories:['age','loans','budget','wages','fees']},
    sustainable:{label:'Sustainable spending',categories:['budget','wages','fees','loans','age']},
    permanent:{label:'Build a settled squad',categories:['loans','age','wages','fees','budget']},
    local:{label:'Recruit closer to home',categories:['market','wages','loans','age','budget']}
  };
  function chooseRecruitmentTheme() {
    const progress=getSeasonProgress();
    const previous=progress.history.at(-1)?.policies?.[0]?.theme;
    const available=Object.keys(recruitmentThemes).filter(theme =>
      theme!==previous && (theme!=='local' || ['veteran','legendary'].includes(selectedDifficulty)));
    return available[randomIndex(available.length)];
  }
  function createLoanPolicy(limit) {
    return {category:'loans',title:'Build your own squad',
      rule:`Bring in no more than ${limit} first-team loan ${limit===1?'player':'players'} during Season 1. Each incoming player counts once, even if their loan is extended.`,
      reason:'Develop a settled squad without relying on a large temporary rebuild.',
      example:`${limit} incoming loans meet the limit. A further incoming loan does not.`,
      clarification:'Outgoing loans, your own players returning, and extending an existing loan do not use another place. Incoming loans also count towards the overall arrivals limit. Academy-only loans count if promoted to the first team that season.'};
  }
  function createFeePolicy(percent) {
    return {category:'fees',title:'Spread the investment',
      rule:`The guaranteed transfer fee or loan fee for any one arrival must not exceed ${percent}% of your Season 1 transfer allowance.`,
      reason:'Avoid spending most of the available money on one player.',
      example:`With a 1,000,000 transfer allowance, the guaranteed fee for one player is capped at ${(percent*10000).toLocaleString('en-GB')}.`,
      clarification:"Use the recorded starting transfer budget plus extra money the board actually releases, including retained sale proceeds. Count guaranteed instalments and guaranteed add-ons, including payments due later. Separate deals for the same player are combined. Free agents remain allowed; the board's overall transfer and wage budgets still apply."};
  }
  function createMarketPolicy() {
    return {category:'market',title:'Know your recruitment market',
      rule:'For Season 1, recruit players already contracted to clubs in the same national league system as your current club, or free agents from any country.',
      reason:'Work within a defined recruitment market rather than searching every league.',
      example:"A player from any division in your club's national league system is eligible, regardless of nationality. A free agent is also eligible.",
      clarification:"Apply the rule when agreeing the deal. Use the parent club's league system for a player currently out on loan. Incoming loans follow this rule too. A player signed from a foreign club is not a free agent simply because their contract will expire before arrival. Existing players and contract renewals are exempt."};
  }

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
        "Recruit within the club\u2019s existing salary structure " +
        "rather than depending on expensive new stars.",
      example:
        `If the starting highest basic wage is 20,000 per week in your save's currency, ` +
        `the limit is ${(20000 * percent / 100).toLocaleString("en-GB")} ` +
        "per week for each arrival.",
      clarification:
        "For a loan, count only the basic wage your club pays. " +
        "Record the starting highest wage once; new signings cannot raise " +
        "this limit. Existing players and their renewals are exempt. " +
        "The board\u2019s overall wage budget still applies. If your club has no existing paid basic wages, this percentage ceiling does not apply; use the board\u2019s wage budget."
    };
  }

  function getPolicies() {
    const key = challengeCacheKey();

    if (!savedPolicySets.has(key)) {
            const settings = settingsForCurrentSeason();
      const policies = [];

      const theme=chooseRecruitmentTheme();
      const themeData=recruitmentThemes[theme];
      const makers={age:()=>createAgePolicy(choosePolicyLimit(settings.age)),
        wages:()=>createWagePolicy(choosePolicyLimit(settings.wages)),
        budget:()=>createBudgetPolicy(choosePolicyLimit(settings.budget)),
        loans:()=>createLoanPolicy(choosePolicyLimit(settings.loans)),
        fees:()=>createFeePolicy(choosePolicyLimit(settings.feeShare)),market:createMarketPolicy};
      const arrivalLimit=choosePolicyLimit(settings.arrivals);
      const arrivals=createArrivalPolicy(arrivalLimit);
      arrivals.theme=theme;
      arrivals.reason=`${themeData.label}: ${arrivals.reason}`;
      arrivals.pressure=Math.max(0,(8-arrivalLimit)*0.12);
      policies.push(arrivals);
      const available=themeData.categories.filter(category =>
        (category!=='market' || ['veteran','legendary'].includes(selectedDifficulty)) &&
        (category!=='wages' || getSeasonProgress().highestWeeklyWage!==0) &&
        (!['budget','fees'].includes(category) || getSeasonProgress().transferBudget!==0));
      // Keep the theme's lead restriction, then vary the remaining compatible categories.
      const first=available.shift();
      if(first) policies.push(makers[first]());
      while(policies.length<settings.ruleCount && available.length) {
        const chosen=available.splice(randomIndex(available.length),1)[0];
        // Avoid piling a total spending cap and a per-player fee cap together.
        if((chosen==='fees' && policies.some(p=>p.category==='budget')) ||
          (chosen==='budget' && policies.some(p=>p.category==='fees'))) continue;
        policies.push(makers[chosen]());
      }
      for(const policy of policies) if(policy.pressure===undefined) {
        policy.pressure={age:0.6,wages:0.45,budget:0.45,loans:0.25,fees:0.35,market:0.7}[policy.category] || 0;
        policy.pressure*={rookie:0.5,professional:0.8,veteran:1,legendary:1.2}[selectedDifficulty];
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
          ["budget", "fees"].includes(policy.category) &&
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
          if(policy.category==='fees') policy.clarification += " This is a per-player cap, rather than a total season spending limit.";
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

  function isLeagueChallenge(challenge) {
    return ['league-relative-v1','league-variety-v2'].includes(challenge?.model);
  }
  function createVariedLeagueBonuses(baseline,size) {
    const level=['rookie','professional','veteran','legendary'].indexOf(selectedDifficulty);
    const strong=baseline<=Math.ceil(size*0.3), weak=baseline>=Math.ceil(size*0.7);
    const adjustment=strong?0.25:weak?-0.2:0;
    const scoring=Math.round((1.1+level*0.15+adjustment)*100)/100;
    const conceding=Math.round((1.65-level*0.15-adjustment)*100)/100;
    const difference=strong?level*4:weak?-Math.round(size*(0.45-level*0.08)):0;
    const common='Use the same regular-season league phase as your main target. Cup matches, play-offs and later championship splits do not count.';
    const pool={
      scoring:{type:'scoring-rate',target:scoring,title:`Average at least ${scoring.toFixed(2)} goals per league match`,description:`Score at least ${scoring.toFixed(2)} goals per match across your regular league phase. ${common}`},
      defending:{type:'conceding-rate',target:conceding,title:`Concede no more than ${conceding.toFixed(2)} goals per league match`,description:`Keep goals conceded divided by league matches played at or below ${conceding.toFixed(2)}. ${common}`},
      difference:{type:'goal-difference',target:difference,title:difference===0?'Finish with a level or positive league goal difference':`Finish with league goal difference of ${difference>0?'+':''}${difference} or better`,description:`Your league goals scored minus league goals conceded must be at least ${difference}. ${common}`}
    };
    const previous=getSeasonProgress().history.at(-1)?.challenge?.focus;
    const focuses=['front-foot','hard-to-beat','balanced'].filter(f=>f!==previous);
    const focus=focuses[randomIndex(focuses.length)];
    const keys=focus==='front-foot'?['scoring','difference']:focus==='hard-to-beat'?['defending','difference']:['scoring','defending'];
    return {focus,bonuses:keys.map(k=>pool[k])};
  }
  function assessLeagueBonus(bonus,results) {
    if(bonus.type==='goal-difference')return results.goals-results.goalsConceded>=bonus.target;
    if(bonus.type==='scoring-rate')return results.goals+1e-9>=results.matches*bonus.target;
    if(bonus.type==='conceding-rate')return results.goalsConceded<=results.matches*bonus.target+1e-9;
    return false;
  }
  function validVariedChallenge(challenge,size) {
    return Number.isInteger(challenge.targetFinish) && challenge.targetFinish>=1 && challenge.targetFinish<=size &&
      ['front-foot','hard-to-beat','balanced'].includes(challenge.focus) && challenge.bonuses?.length===2 &&
      new Set(challenge.bonuses.map(b=>b.type)).size===2 && challenge.bonuses.every(b=>
        ['scoring-rate','conceding-rate','goal-difference'].includes(b.type) && Number.isFinite(b.target) &&
        (b.type==='goal-difference'?Number.isInteger(b.target)&&b.target>=-60&&b.target<=60:b.target>=0.5&&b.target<=5));
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
    const pressure = policies.reduce((sum,policy)=>sum+(Number.isFinite(policy.pressure)?policy.pressure:0.4),0);
    const restrictionAdjustment = Math.round(pressure*(size-1)*0.035);
    const forecast = Math.max(1, Math.min(size, baseline + restrictionAdjustment));
    const offsets = {
      rookie: Math.max(1, Math.round((size - 1) * 0.15)),
      professional: 0,
      veteran: -Math.max(1, Math.round((size - 1) * 0.08)),
      legendary: -Math.max(1, Math.round((size - 1) * 0.15))
    };
    const recovery = previous && !previous.mainAchieved ? 1 : 0;
    const target = Math.max(1, Math.min(Math.max(1,size-1), baseline + offsets[selectedDifficulty] + recovery));
    const varied=createVariedLeagueBonuses(baseline,size);
    const focusLabel={'front-foot':'Play on the front foot','hard-to-beat':'Build a resilient side',balanced:'Build a balanced season'}[varied.focus];
    return {
      model: "league-variety-v2",
      targetFinish: target,
      focus:varied.focus,
      mainObjective: {
        title: `${focusLabel}: ${target===1?'finish first':`finish ${ordinal(target)} or higher`}`,
        description: `Finish ${ordinal(target)} or higher in the main regular-season ${progress.league} table for your club's group (${size} clubs). Use the table before play-offs or championship splits. In competitions with separate league phases, use the first full league phase consistently. Cup results do not decide this objective.`
      },
      bonuses: varied.bonuses,
      prediction: {
        finish: forecast,
        beatTarget: forecast === 1 ? "Match it: finish first" : `${ordinal(forecast - 1)} or higher`,
        explanation: `${basis} The strength of your recruitment restrictions ${restrictionAdjustment > 0 ? `add a conservative allowance of ${restrictionAdjustment} ${restrictionAdjustment === 1 ? "position" : "positions"} to the forecast` : "are included without changing its rounded position"}. ${difficultyNames[selectedDifficulty]} sets your main target at ${ordinal(target)} or higher. ${recovery ? "A missed target gives you a little more rebuilding room this season. " : ""}This is a provisional estimate, not FM's media prediction or a match simulation.${forecast === 1 ? " First place is the highest possible league finish, so you can match this prediction." : ""}`
      }
    };
  }

  function updateSeasonResultFields() {
    const form = byId("season-results-form");
    const modern = isLeagueChallenge(getSeasonChallenge());
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
      const legacy = previous && !isLeagueChallenge(previous.challenge) && hasClubBriefing();
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
    if (isLeagueChallenge(challenge) && getSeasonProgress().season === 1) {
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
    if (squad && (!validGeneratedTactic(squad.tactic) || (squad.source && (
      (squad.source.kind !== undefined && !["saved-export", "starting-database"].includes(squad.source.kind)) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(squad.source.gameDate) ||
      typeof squad.source.leagueName !== "string" || !squad.source.leagueName.trim() ||
      !Number.isInteger(squad.source.sampleSize) || squad.source.sampleSize < 1 ||
      !Number.isInteger(squad.source.clubCount) || squad.source.clubCount < 1 ||
      squad.source.clubCount > squad.source.sampleSize
    )))) return false;

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
      ((Number.isFinite(player.rating) && player.rating >= 1 && player.rating <= 10) ||
        (squad.source && player.rating === null)) &&
      (
        player.age === null ||
        (
          Number.isInteger(player.age) &&
          player.age >= (squad.source ? 10 : 14) &&
          player.age <= (squad.source ? 80 : 60)
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
    const allowedCategories = ["arrivals", "age", "wages", "budget", "loans", "fees", "market"];

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
      (challenge.model !== 'league-variety-v2' || validVariedChallenge(challenge,career.progress?.leagueSize || 24)) &&
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
        careerClubIdentity(club),
        textElement(
          "p",
          "career-details",
          career.briefingStatus === "club-selected"
            ? `${difficultyNames[career.difficulty]} \u00b7 Club choice saved`
            : `${difficultyNames[career.difficulty]} \u00b7 Season ${career.progress?.season || 1} \u00b7 ` +
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
        : `${selectedClub.name} \u2014 ${difficultyNames[selectedDifficulty]}`;

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
      (!isLeagueChallenge(entry.challenge) || (
        Number.isInteger(entry.matches) && entry.matches >= 1 && entry.matches <= 200 &&
        Number.isInteger(entry.goalsConceded) && entry.goalsConceded >= 0 && entry.goalsConceded <= 1000
      )) &&
      (entry.challenge?.model !== 'league-variety-v2' || validVariedChallenge(entry.challenge,entry.leagueSize)) &&
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

    if (rebuilding || previous.outcome === 'promoted') {
      settings.loans=settings.loans.map(limit=>Math.min(5,limit+1));
      settings.feeShare=settings.feeShare.map(percent=>Math.min(50,percent+5));
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
          `Season ${entry.season} \u00b7 ${entry.league}`
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
          `${ordinal(entry.finish)} of ${entry.leagueSize} \u00b7 ` +
          `${entry.goals} league goals \u00b7 ${outcomes[entry.outcome]}`
        ),
        textElement(
          "p",
          "season-history-details",
          `Main objective: ${entry.objectiveTitle}`
        ),
        textElement(
          "p",
          "season-history-details",
          `${bonusCount} of ${entry.bonusResults.length} bonuses achieved \u00b7 ` +
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
        : `Season ${progress.season} \u00b7 Five-season milestone completed`;

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
    const modern = isLeagueChallenge(currentChallenge);
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
      bonusResults: currentChallenge.model==='league-variety-v2'
        ? challenge.bonuses.map(bonus=>({title:bonus.title,achieved:assessLeagueBonus(bonus,{goals,goalsConceded,matches})}))
        : [
        {title:challenge.bonuses[0].title,achieved:modern?goals-goalsConceded>=currentChallenge.goalDifferenceTarget:cupRound>=bonuses.cup},
        {title:challenge.bonuses[1].title,achieved:modern?goals+1e-9>=matches*currentChallenge.goalRate:goals>=bonuses.goals}
      ],
      policies: structuredClone(getPolicies()),
      challenge: structuredClone(challenge),
      squad: structuredClone(getSquad()),
      formation: hasTactics() ? (getSquad().tactic?.name || "4-2-3-1") : null,
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

    if (hasTactics()) renderTactics();
    renderPolicies();
    renderSeasonChallenge();
    refreshSeasonLabels();

    const milestone = seasonProgress.history.length === 5
      ? " Five seasons completed \u2014 you can keep the career going."
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

  initialiseClubPresentation();
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
      `${players.length} players \u00b7 ${clubs.join(", ")}`;

    players.forEach((player) => {
      const card = document.createElement("details");
      card.className = "squad-group";

      card.append(
        makeElement(
          "summary",
          `${player.name} \u00b7 Age ${player.age} \u00b7 ${player.positions}`,
          "squad-player-name"
        )
      );

      card.append(
        makeElement(
          "p",
          `${player.club} \u00b7 ` +
          `${player.preferredFoot || "Foot not supplied"} \u00b7 ` +
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
            `${record.leagueName} \u00b7 ${date} \u00b7 ` +
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
    if (["", "-", "\u2013", "\u2014"].includes(text)) return null;
    if (validAttribute(text)) {
      return { low: Number(text), high: Number(text) };
    }
    const match = text.match(/^(\d+)\s*[-\u2013\u2014]\s*(\d+)$/);
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
      card.append(makeElement("p", `${record.gameDate} \u00b7 ${record.players.length} players \u00b7 ${clubs} clubs`));
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
      leagueStatus.textContent = "Reading the league export\u2026";
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
            `${summary.dataset.baseLabel} \u00b7 Rating pending`;

          card.append(makeElement(
            "p",
            "Not enough comparable adult players with usable attributes. At least 8 players from 4 clubs are needed.",
            "signing-note imported-league-rating"
          ));

          return;
        }

        summary.textContent =
          `${summary.dataset.baseLabel} \u00b7 Estimated ${estimate.rating.toFixed(1)}/10`;

        card.append(makeElement(
          "p",
          `${estimate.label} comparison \u00b7 possible range ${estimate.low.toFixed(1)}\u2013${estimate.high.toFixed(1)}/10 \u00b7 ${estimate.peers} adult players from ${estimate.clubs} clubs.`,
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
    status.textContent = "Reading your squad export\u2026";

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
  function estimateSavedRangePlayer(player, pool) {
    const estimates = [];
    const ownAttributes = player.attributes;

    leaguePositionGroups(player.positions).forEach((group) => {
      const profile = leagueRatingProfiles[group];
      const own = weightedLeagueRange(ownAttributes, profile);
      if (own.coverage < 0.75) return;

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


  // Read validated browser data only. No squad data is sent to a server.
  const savedClubAliases = new Map([
    ["man ufc", "man utd"], ["manchester united", "man utd"],
    ["manchester city", "man city"], ["leicester city", "leicester"],
    ["ipswich town", "ipswich"], ["tottenham hotspur", "tottenham"],
    ["newcastle united", "newcastle"], ["west ham united", "west ham"],
    ["sheffield united", "sheff utd"], ["wolverhampton wanderers", "wolves"],
    ["norwich city", "norwich"], ["luton town", "luton"]
  ]);
  function savedClubKey(name) {
    const key = normalise(name);
    return savedClubAliases.get(key) || key;
  }
  globalThis.fmSavedClubSquad = club => {
    // This initial connection is scoped to the existing English league exports.
    if (club.country !== "England" || !leagueCacheReady) return null;
    const key = savedClubKey(club.name);
    const references = leagueReferences.filter(record =>
      ["premier league", "english premier division", "english premier league"].includes(normalise(record.leagueName))
    ).slice().sort((a, b) => b.gameDate.localeCompare(a.gameDate));
    for (const reference of references) {
      let pool = reference.players;
      const matching = savedSquadImports.filter(record =>
        leagueIdentity(record.leagueName, record.gameDate) ===
          leagueIdentity(reference.leagueName, reference.gameDate));
      matching.forEach(record => { pool = mergeLeagueAndSquad(pool, record.players); });
      const members = pool.filter(player => savedClubKey(player.club) === key);
      if (!members.length) continue;
      const players = members.map(player => {
        const estimate = estimateSavedRangePlayer(player, pool);
        const groups = leaguePositionGroups(player.positions);
        const group = groups.includes("goalkeeper") ? "goalkeepers"
          : /^(?:D|WB)\b/.test(player.positions) && !player.positions.startsWith("DM") ? "defenders"
          : /^(?:AM|ST)\b/.test(player.positions) ? "forwards" : "midfielders";
        return { name: player.name, uid: player.uid, age: player.age,
          positions: player.positions, group, attributes: player.attributes, rating: estimate?.rating ?? null,
          ratingRange: estimate ? { low: estimate.low, high: estimate.high } : null };
      });
      return { players, gameDate: reference.gameDate, leagueName: reference.leagueName,
        sampleSize: pool.length, clubCount: new Set(pool.map(player => savedClubKey(player.club))).size };
    }
    return null;
  };
})();


