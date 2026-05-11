-- 404 Biotech Platform Database Schema (SQL Server / T-SQL Version)
-- Based on requirements from final.md

-- 1. Create Companies Table with Existence Check
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[companies]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[companies] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [name] NVARCHAR(255) NOT NULL,
        [category] NVARCHAR(100) NOT NULL, 
        [address] NVARCHAR(MAX) NOT NULL,
        [city] NVARCHAR(50), 
        [products] NVARCHAR(MAX),
        [phone] NVARCHAR(50),
        [email] NVARCHAR(255),
        [website] NVARCHAR(255),
        
        -- Financial Information
        [capital] DECIMAL(18, 2) DEFAULT 0, 
        [gross_margin] DECIMAL(5, 2) DEFAULT 0, 
        [profit] DECIMAL(18, 2) DEFAULT 0, 
        [stock_price] DECIMAL(10, 2) DEFAULT 0, 
        
        -- HR Information
        [salary_avg] INT DEFAULT 0, 
        
        [created_at] DATETIME DEFAULT GETDATE(),
        [updated_at] DATETIME DEFAULT GETDATE(),

        -- Category Constraint (Simulating ENUM)
        CONSTRAINT CHK_Category CHECK ([category] IN (
            N'基因體與生物資訊', 
            N'新藥研發與生物製藥', 
            N'委託開發暨製造服務 (CDMO)', 
            N'細胞治療與再生醫學', 
            N'疫苗與檢測試劑'
        ))
    );
END
GO

-- 2. Initial Data Insertion (Using NVARCHAR N prefix for Chinese characters)

-- 基因體與生物資訊 (Genomics)
INSERT INTO [dbo].[companies] ([name], [category], [address], [city], [products], [phone], [email], [website], [capital], [gross_margin], [stock_price], [salary_avg]) VALUES 
(N'基龍米克斯', N'基因體與生物資訊', N'新北市汐止區新台五路一段100號14樓', N'新北市', N'次世代定序(NGS)、核酸合成、生物資訊分析', '02-2696-1658', 'info@genomics.com.tw', 'genomics.com.tw', 310000000, 35.5, 25.4, 65000),
(N'行動基因', N'基因體與生物資訊', N'台北市內湖區新湖二路345號3樓', N'台北市', N'癌症基因檢測 (ACTOnco)、免疫治療評估', '02-2795-3660', 'service@actgenomics.com', 'actgenomics.com', 500000000, 55.0, 0, 72000),
(N'華聯生技', N'基因體與生物資訊', N'台北市南港區園區街3號12樓', N'台北市', N'基因微陣列晶片、RNA定序、臨床分子檢測', '02-6616-0001', 'service@welgene.com.tw', 'welgene.com.tw', 420000000, 40.2, 0, 68000),
(N'麗寶生醫', N'基因體與生物資訊', N'台北市中山區建國北路二段135號14樓', N'台北市', N'癌症與罕見疾病基因檢測、分子診斷', '02-2509-0822', NULL, 'libobio.com', 200000000, 30.5, 0, 60000),
(N'創源生技', N'基因體與生物資訊', N'台北市內湖區新湖一路36巷28號', N'台北市', N'新生兒篩檢、非侵入性胎兒染色體檢測(NIPT)', '02-2795-1777', NULL, 'healthgene.bionetcorp.com', 150000000, 38.0, 32.1, 62000),
(N'即時基因', N'基因體與生物資訊', N'台北市中正區羅斯福路二段9號9樓', N'台北市', N'生物資訊大數據運算平台、雲端基因分析', '02-2396-0120', NULL, 'atgenomix.com', 80000000, 45.5, 0, 85000),
(N'精拓生技', N'基因體與生物資訊', N'台北市內湖區瑞光路258巷56號3樓之2', N'台北市', N'體外腫瘤細胞培養與藥物測試 (E.V.A. 平台)', '02-2732-2701', NULL, 'cancerfree.io', 50000000, 60.0, 0, 75000),
(N'維致生醫', N'基因體與生物資訊', N'新竹縣竹北市生醫五路66號9樓之3', N'新竹縣', N'女性疾病體外診斷試劑 (子宮內膜異位症檢測)', '03-668-8058', NULL, 'vcheckinc.com', 30000000, 25.0, 0, 58000);

-- 新藥研發與生物製藥 (Drug Dev)
INSERT INTO [dbo].[companies] ([name], [category], [address], [city], [products], [phone], [email], [website], [capital], [gross_margin], [stock_price], [salary_avg]) VALUES 
(N'藥華醫藥', N'新藥研發與生物製藥', N'台北市南港區園區街3號2樓之5', N'台北市', N'血液腫瘤罕病新藥 (Besremi 百斯瑞明)', '02-2655-7688', 'info@pharmaessentia.com', 'pharmaessentia.com', 33200000000, 88.5, 345.5, 95000),
(N'中裕新藥', N'新藥研發與生物製藥', N'台北市內湖區瑞光路607號3樓', N'台北市', N'愛滋病單株抗體靶向藥物 (Trogarzo)', '02-2658-0058', 'IR@taimedbiologics.com', 'taimedbiologics.com', 2500000000, 75.2, 85.4, 88000),
(N'東洋藥品', N'新藥研發與生物製藥', N'台北市南港區園區街3-1號3樓', N'台北市', N'癌症、重症抗感染藥物、微脂體技術平台', '02-2652-5999', 'info@tty.com.tw', 'tty.com.tw', 2480000000, 62.1, 78.2, 82000),
(N'浩鼎生技', N'新藥研發與生物製藥', N'台北市南港區園區街3號7樓', N'台北市', N'抗乳癌等主動免疫抗癌新藥 (OBI-822)', '02-2655-8799', 'info@obipharma.com', 'obipharma.com', 2200000000, 15.5, 65.0, 85000),
(N'中天生技', N'新藥研發與生物製藥', N'台北市大安區敦化南路二段76號16樓', N'台北市', N'糖尿病足部傷口潰瘍新藥 (Fespixon 速必一)', '02-2703-1098', NULL, 'onenessbio.com.tw', 4500000000, 48.2, 52.3, 78000),
(N'逸達生技', N'新藥研發與生物製藥', N'台北市南港區園區街3號', N'台北市', N'前列腺癌緩釋針劑 (Camcevi)、新劑型新藥', '02-2655-2658', 'info@foreseepharma.com', 'foreseepharma.com', 1800000000, 42.1, 92.5, 80000),
(N'美時化學', N'新藥研發與生物製藥', N'台北市信義區松仁路277號11樓', N'台北市', N'困難學名藥、抗癌及中樞神經系統口服藥', '02-2700-5908', 'info@lotuspharm.com', 'lotuspharm.com', 2600000000, 52.5, 285.0, 85000),
(N'太景生技', N'新藥研發與生物製藥', N'台北市南港區復興街109號7樓', N'台北市', N'抗感染新藥 (太捷信)、幹細胞驅動劑', '02-8177-7072', 'info@taigenbiotech.com', 'taigenbiotech.com', 7100000000, 35.0, 15.2, 75000),
(N'亞諾法', N'新藥研發與生物製藥', N'台北市內湖區洲子街108號9樓', N'台北市', N'抗體、重組蛋白質、醫療檢測儀器與試劑', '02-8751-1888', 'ir@abnova.com.tw', 'abnova.com.tw', 600000000, 45.2, 28.5, 68000),
(N'漢康生醫', N'新藥研發與生物製藥', N'台北市內湖區堤頂大道一段1號5樓', N'台北市', N'臨床階段腫瘤免疫新藥 (FBDB™ 平台)', '02-2792-1366', NULL, 'hanchorbio.com', 300000000, 0, 0, 85000),
(N'全福生技', N'新藥研發與生物製藥', N'台北市內湖區瑞光路358巷30弄1號8樓', N'台北市', N'眼科與退化性關節炎新藥 (BRM421 乾眼症)', '02-2659-8586', NULL, 'brimbiotech.com', 500000000, 0, 55.2, 82000),
(N'醣基生醫', N'新藥研發與生物製藥', N'台北市南港區研究院路一段130巷99號7樓', N'台北市', N'醣分子工程技術平台、抗體新藥與疫苗', '02-2655-8059', NULL, 'chopharma.com', 1200000000, 0, 68.4, 88000),
(N'旭富製藥', N'新藥研發與生物製藥', N'桃園市蘆竹區海湖北路309巷61號', N'桃園市', N'人用原料藥 (API)、醫藥中間體', '03-354-3133', NULL, 'sci-pharmtech.com.tw', 1100000000, 32.5, 88.0, 72000);

-- CDMO
INSERT INTO [dbo].[companies] ([name], [category], [address], [city], [products], [phone], [email], [website], [capital], [gross_margin], [stock_price], [salary_avg]) VALUES 
(N'台康生技', N'委託開發暨製造服務 (CDMO)', N'新北市汐止區康寧街169巷101號', N'新北市', N'大分子蛋白質藥物、生物相似藥CDMO', '02-7708-0123', 'IR@eirgenix.com', 'eirgenix.com', 3100000000, 25.5, 102.5, 75000),
(N'保瑞藥業', N'委託開發暨製造服務 (CDMO)', N'台北市內湖區行愛路69號6樓', N'台北市', N'大小分子全方位CDMO (口服、半固體、液體)', '02-2790-0555', 'info@bora-corp.com', 'bora-corp.com', 10100000000, 45.2, 750.0, 85000),
(N'永昕生物', N'委託開發暨製造服務 (CDMO)', N'苗栗縣竹南鎮科研路8號', N'苗栗縣', N'細胞株開發、哺乳類/微生物製程CDMO', '037-586-988', 'info@mycenax.com.tw', 'mycenax.com.tw', 1500000000, 22.1, 42.5, 68000),
(N'台灣神隆', N'委託開發暨製造服務 (CDMO)', N'台南市善化區南科八路1號 (南科)', N'台南市', N'高致癌性高活性原料藥(API)、針劑CDMO', '06-505-2888', 'info@scinopharm.com', 'scinopharm.com', 7900000000, 38.5, 28.2, 72000),
(N'台灣生物醫藥製造', N'委託開發暨製造服務 (CDMO)', N'台北市南港區生技園區 (籌備中/新竹建廠)', N'台北市', N'核酸藥物(mRNA)、基因與細胞治療CDMO', NULL, NULL, 'tbmc.com.tw', 2000000000, 0, 0, 90000),
(N'喜康生技', N'委託開發暨製造服務 (CDMO)', N'新北市汐止區新台五路一段99號19樓之1', N'新北市', N'蛋白質新藥研發、生物藥品 CDMO 服務', '03-658-3899', NULL, 'edenbiologics.com', 500000000, 18.2, 0, 70000),
(N'安美得', N'委託開發暨製造服務 (CDMO)', N'新北市五股區五權七路14號之1', N'新北市', N'專業創傷敷材 (赫麗敷系列)、醫療級水膠', '02-2298-1755', NULL, 'amed.com.tw', 300000000, 42.5, 58.2, 65000);

-- 細胞治療 (Cell Therapy)
INSERT INTO [dbo].[companies] ([name], [category], [address], [city], [products], [phone], [email], [website], [capital], [gross_margin], [stock_price], [salary_avg]) VALUES 
(N'訊聯生技', N'細胞治療與再生醫學', N'台北市內湖區新湖一路36巷28號', N'台北市', N'臍帶血/臍帶儲存、間質幹細胞治療、外泌體', '02-2795-1777', 'service@bionetcorp.com', 'bionetcorp.com', 600000000, 48.5, 45.2, 62000),
(N'亞果生醫', N'細胞治療與再生醫學', N'高雄市路竹區路科二路57號3樓 (高科)', N'高雄市', N'超臨界二氧化碳去細胞技術、膠原蛋白生醫材料', '07-695-5569', 'info@acrobiomedical.com', 'acrobiomedical.com', 400000000, 35.0, 32.5, 60000),
(N'基亞生技', N'細胞治療與再生醫學', N'台北市南港區園區街3號14樓', N'台北市', N'自然殺手細胞(NK)、PIK3細胞治療、肝癌新藥', '02-2653-5200', 'info@medigen.com.tw', 'medigen.com.tw', 1300000000, 42.1, 38.5, 75000),
(N'和訊生技', N'細胞治療與再生醫學', N'桃園市桃園區大業路一段18號6樓', N'桃園市', N'幹細胞新藥開發、心血管疾病再生醫學', '03-358-1155', NULL, 'hexunbio.com', 200000000, 0, 0, 70000),
(N'台安生技', N'細胞治療與再生醫學', N'台北市信義區信義路五段7號28樓A室', N'台北市', N'生技產業投資顧問與創投管理', '02-8758-0000', NULL, 'taiantech.com', 100000000, 0, 0, 85000);

-- 疫苗與檢測 (Vaccine/Diagnostic)
INSERT INTO [dbo].[companies] ([name], [category], [address], [city], [products], [phone], [email], [website], [capital], [gross_margin], [stock_price], [salary_avg]) VALUES 
(N'國光生技', N'疫苗與檢測試劑', N'台中市潭子區潭興路一段3號', N'台中市', N'流感疫苗、破傷風疫苗、無菌針劑充填CDMO', '04-2538-1220', 'IR@adimmune.com.tw', 'adimmune.com.tw', 4200000000, 28.5, 32.4, 70000),
(N'高端疫苗', N'疫苗與檢測試劑', N'台北市內湖區基湖路10巷57號7樓', N'台北市', N'腸病毒71型疫苗、新冠疫苗、四價流感疫苗', '02-7745-0830', 'info@medigenvac.com', 'medigenvac.com', 3200000000, 35.2, 58.0, 78000),
(N'普生', N'疫苗與檢測試劑', N'新竹縣寶山鄉創新一路6號 (竹科)', N'新竹縣', N'B肝/C肝體外診斷試劑、自動化核酸檢測設備', '03-577-9221', 'info@gbc.com.tw', 'gbc.com.tw', 400000000, 42.1, 25.5, 65000),
(N'光鼎生技', N'疫苗與檢測試劑', N'新北市新店區中正路238號4樓', N'新北市', N'毛細管電泳儀 (Qsep系列)、核酸檢測平台', '02-2218-8726', 'info@bioptic.com.tw', 'bioptic.com.tw', 350000000, 55.5, 42.0, 68000),
(N'立景生技', N'疫苗與檢測試劑', N'台南市新市區南科二路12號4樓 (南科)', N'台南市', N'抗原/抗體開發、免疫診斷試劑原料', '06-505-8822', 'leadgene.com.tw', 'leadgene.com.tw', 150000000, 48.2, 0, 62000),
(N'國鼎生技', N'疫苗與檢測試劑', N'新北市淡水區中正東路二段27-6號15樓', N'新北市', N'新藥研發 (Antroquinonol)、牛樟芝保健食品', '02-2808-6006', NULL, 'goldenbiotech.com', 1200000000, 65.0, 22.5, 68000),
(N'創益生技', N'疫苗與檢測試劑', N'台北市南港區園區街3之1號3樓之1', N'台北市', N'自費醫療服務、醫藥保健品供應', '02-2655-7339', NULL, 'cybiotech.com.tw', 250000000, 40.5, 0, 60000);
