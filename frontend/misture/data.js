const companiesData = [
    {
        id: 1,
        name: "基龍米克斯",
        category: "基因體與生物資訊",
        product: "次世代定序(NGS)、核酸合成、生物資訊分析",
        address: "新北市汐止區新台五路一段100號14樓",
        location: "New Taipei",
        contact: {
            phone: "02-2696-1658",
            email: "info@genomics.com.tw"
        },
        financials: {
            capital: "5.2B",
            grossProfit: "28%",
            netProfit: "12%",
            stockPrice: "45.2"
        },
        salary: {
            min: 45000,
            max: 85000,
            benchmark: "High"
        }
    },
    {
        id: 2,
        name: "行動基因",
        category: "基因體與生物資訊",
        product: "癌症基因檢測 (ACTOnco)、免疫治療評估",
        address: "台北市內湖區新湖二路345號3樓",
        location: "Taipei",
        contact: {
            phone: "02-2795-3660",
            email: "service@actgenomics.com"
        },
        financials: {
            capital: "3.8B",
            grossProfit: "35%",
            netProfit: "18%",
            stockPrice: "120.5"
        },
        salary: {
            min: 50000,
            max: 120000,
            benchmark: "Very High"
        }
    },
    {
        id: 3,
        name: "華聯生技",
        category: "基因體與生物資訊",
        product: "基因微陣列晶片、RNA定序、臨床分子檢測",
        address: "台北市南港區園區街3號12樓",
        location: "Taipei",
        contact: {
            phone: "02-6616-0001",
            email: "service@welgene.com.tw"
        },
        financials: {
            capital: "2.5B",
            grossProfit: "22%",
            netProfit: "8%",
            stockPrice: "32.8"
        },
        salary: {
            min: 42000,
            max: 75000,
            benchmark: "Medium"
        }
    },
    {
        id: 4,
        name: "麗寶生醫",
        category: "基因體與生物資訊",
        product: "癌症與罕見疾病基因檢測、分子診斷",
        address: "台北市中山區建國北路二段135號14樓",
        location: "Taipei",
        contact: {
            phone: "02-2509-0822",
            website: "libobio.com"
        },
        financials: {
            capital: "1.2B",
            grossProfit: "40%",
            netProfit: "15%",
            stockPrice: "N/A"
        },
        salary: {
            min: 48000,
            max: 95000,
            benchmark: "High"
        }
    },
    {
        id: 5,
        name: "創源生技",
        category: "基因體與生物資訊",
        product: "新生兒篩檢、非侵入性胎兒染色體檢測(NIPT)",
        address: "台北市內湖區新湖一路36巷28號",
        location: "Taipei",
        contact: {
            phone: "02-2795-1777",
            website: "healthgene.bionetcorp.com"
        },
        financials: {
            capital: "0.8B",
            grossProfit: "30%",
            netProfit: "10%",
            stockPrice: "28.5"
        },
        salary: {
            min: 40000,
            max: 70000,
            benchmark: "Medium"
        }
    },
    {
        id: 6,
        name: "即時基因",
        category: "基因體與生物資訊",
        product: "生物資訊大數據運算平台、雲端基因分析",
        address: "台北市中正區羅斯福路二段9號9樓",
        location: "Taipei",
        contact: {
            phone: "02-2396-0120",
            website: "atgenomix.com"
        },
        financials: {
            capital: "0.5B",
            grossProfit: "55%",
            netProfit: "25%",
            stockPrice: "N/A"
        },
        salary: {
            min: 55000,
            max: 150000,
            benchmark: "Top"
        }
    },
    {
        id: 7,
        name: "精拓生技",
        category: "基因體與生物資訊",
        product: "體外腫瘤細胞培養與藥物測試 (E.V.A. 平台)",
        address: "台北市內湖區瑞光路258巷56號3樓之2",
        location: "Taipei",
        contact: {
            phone: "02-2732-2701",
            website: "cancerfree.io"
        },
        financials: {
            capital: "0.3B",
            grossProfit: "45%",
            netProfit: "20%",
            stockPrice: "N/A"
        },
        salary: {
            min: 52000,
            max: 110000,
            benchmark: "High"
        }
    },
    {
        id: 8,
        name: "維致生醫",
        category: "基因體與生物資訊",
        product: "女性疾病體外診斷試劑 (子宮內膜異位症檢測)",
        address: "新竹縣竹北市生醫五路66號9樓之3",
        location: "Hsinchu",
        contact: {
            phone: "03-668-8058",
            website: "vcheckinc.com"
        },
        financials: {
            capital: "0.2B",
            grossProfit: "38%",
            netProfit: "14%",
            stockPrice: "N/A"
        },
        salary: {
            min: 46000,
            max: 88000,
            benchmark: "High"
        }
    },
    {
        id: 9,
        name: "藥華醫藥",
        category: "新藥研發與生物製藥",
        product: "血液腫瘤罕病新藥 (Besremi 百斯瑞明)",
        address: "台北市南港區園區街3號2樓之5",
        location: "Taipei",
        contact: {
            phone: "02-2655-7688",
            email: "info@pharmaessentia.com"
        },
        financials: {
            capital: "32.5B",
            grossProfit: "85%",
            netProfit: "42%",
            stockPrice: "480.0"
        },
        salary: {
            min: 65000,
            max: 200000,
            benchmark: "Top"
        }
    },
    {
        id: 10,
        name: "中裕新藥",
        category: "新藥研發與生物製藥",
        product: "愛滋病單株抗體靶向藥物 (Trogarzo)",
        address: "台北市內湖區瑞光路607號3樓",
        location: "Taipei",
        contact: {
            phone: "02-2658-0058",
            email: "IR@taimedbiologics.com"
        },
        financials: {
            capital: "2.8B",
            grossProfit: "70%",
            netProfit: "30%",
            stockPrice: "85.4"
        },
        salary: {
            min: 60000,
            max: 180000,
            benchmark: "Top"
        }
    },
    {
        id: 11,
        name: "保瑞藥業",
        category: "委託開發暨製造服務 (CDMO)",
        product: "大小分子全方位CDMO (口服、半固體、液體)",
        address: "台北市內湖區行愛路69號6樓",
        location: "Taipei",
        contact: {
            phone: "02-2790-0555",
            email: "info@bora-corp.com"
        },
        financials: {
            capital: "10.2B",
            grossProfit: "45%",
            netProfit: "28%",
            stockPrice: "720.5"
        },
        salary: {
            min: 55000,
            max: 160000,
            benchmark: "Top"
        }
    },
    {
        id: 12,
        name: "國光生技",
        category: "疫苗與檢測試劑",
        product: "流感疫苗、破傷風疫苗、無菌針劑充填CDMO",
        address: "台中市潭子區潭興路一段3號",
        location: "Taichung",
        contact: {
            phone: "04-2538-1220",
            email: "IR@adimmune.com.tw"
        },
        financials: {
            capital: "4.5B",
            grossProfit: "32%",
            netProfit: "18%",
            stockPrice: "38.2"
        },
        salary: {
            min: 42000,
            max: 90000,
            benchmark: "High"
        }
    },
    {
        id: 13,
        name: "台灣神隆",
        category: "委託開發暨製造服務 (CDMO)",
        product: "高致癌性高活性原料藥(API)、針劑CDMO",
        address: "台南市善化區南科八路1號 (南科)",
        location: "Tainan",
        contact: {
            phone: "06-505-2888",
            email: "info@scinopharm.com"
        },
        financials: {
            capital: "7.9B",
            grossProfit: "25%",
            netProfit: "15%",
            stockPrice: "26.5"
        },
        salary: {
            min: 45000,
            max: 95000,
            benchmark: "High"
        }
    },
    {
        id: 14,
        name: "亞果生醫",
        category: "細胞治療與再生醫學",
        product: "超臨界二氧化碳去細胞技術、膠原蛋白生醫材料",
        address: "高雄市路竹區路科二路57號3樓 (高科)",
        location: "Kaohsiung",
        contact: {
            phone: "07-695-5569",
            email: "info@acrobiomedical.com"
        },
        financials: {
            capital: "0.5B",
            grossProfit: "50%",
            netProfit: "22%",
            stockPrice: "42.0"
        },
        salary: {
            min: 48000,
            max: 100000,
            benchmark: "High"
        }
    }
];

export default companiesData;
