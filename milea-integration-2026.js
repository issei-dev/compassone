// File: milea-integration-2026.js

/*
 * CompassONE / MILEA STUDIO 組織再編
 *
 * 企業サイト：
 * ・11名の社員紹介とインタビューを追加
 * ・ミレアスタジオ事業部の紹介セクションを追加
 * ・社員紹介の部署フィルターを追加
 * ・会社概要を108名へ更新
 * ・掲載人数の表記を更新
 *
 * 社内ポータル：
 * ・11名のプロフィールを追加
 * ・配属・相談窓口のニュースを追加
 * ・組織と部門横断案件の相談ルールを掲載
 *
 * 前提：
 * 各HTMLの既存スクリプト、および既存更新ファイルの後に読み込む。
 *
 * 配属：
 * ミレアスタジオ事業部：5名
 * プロダクト・デザイン部：4名
 * 営業・カスタマーサクセス部：1名
 * コーポレート部：1名
 *
 * 役職員：
 * 従業員104名、取締役4名、合計108名。
 * 黒川佳澄は従業員であり、取締役には加算しない。
 *
 * 転籍日は未設定のため公開ページに記載しない。
 *
 * 画像：
 * assets/people-{id}.PNG                縦4:5
 * assets/interview-{id}-01.PNG          横3:2
 * assets/interview-{id}-02.PNG          横3:2
 * assets/hobby-{id}-01.PNG              個別指定
 * assets/hobby-{id}-02.PNG              個別指定
 *
 * 社員ID：
 * kurokawa
 * seto-akane
 * kiritani
 * ikeda
 * aoyagi
 * kubota
 * miyamoto
 * kamiya-yuma
 * tsujimoto
 * hirano
 * oba
 *
 * 趣味は今回追加する架空プロフィール設定。
 * 元資料の性的指向など、業務紹介に不要な情報は掲載しない。
 */

(() => {
  "use strict";

  const UPDATE_KEY = "__compassMileaIntegration2026Applied";

  if (window[UPDATE_KEY]) {
    return;
  }

  const isCorporateSite =
    typeof members !== "undefined" &&
    Array.isArray(members) &&
    typeof photos !== "undefined" &&
    typeof renderHome === "function" &&
    typeof renderInterview === "function" &&
    typeof route === "function";

  const isPortal =
    typeof employees !== "undefined" &&
    Array.isArray(employees) &&
    typeof renderRoute === "function" &&
    typeof loggedIn !== "undefined";

  if (!isCorporateSite && !isPortal) {
    console.error(
      "ミレア統合更新の対象が見つかりません。" +
      "既存スクリプトより後に読み込んでください。"
    );

    return;
  }

  const people = [
    {
      id: "kurokawa",
      name: "黒川 佳澄",
      department: "ミレアスタジオ事業部",
      role: "事業部長兼ブランド戦略責任者",
      category: "milea",
      color: "#e5d4c5",
      title: "らしさを守って、できることを広げる。",
      intro:
        "ミレアスタジオを創業し、ブランド戦略と主要顧客への支援を担ってきた黒川佳澄。" +
        "CompassONEでは事業部長として、ミレアの強みを守りながら、" +
        "技術とクリエイティブが協働する事業づくりに取り組みます。",
      work:
        "ミレア事業の方針、ブランド戦略、重要顧客、予算・人員計画を担当。",
      message:
        "企画や表現の相談も、事業としてどう届けるかという相談も歓迎します。",
      hobbies: ["香りを楽しむこと", "街歩き"],
      hobbyRatios: ["portrait", "landscape"],
      answers: [
        "ミレアの名前だけを残したいわけではありません。" +
        "顧客を理解して、何をつくり、何をつくらないかを考える姿勢を残したいです。" +
        "そのうえで、技術の力を借りて、提案できる範囲を広げたいと考えています。",

        "事業部の中だけで仕事を完結させないことです。" +
        "企画の早い段階からデザインや開発に相談し、実現方法を一緒に考える。" +
        "一方で、既存のお客様との約束やブランドの判断は、私が責任を持ってつなぎます。",

        "違うやり方に出会ったとき、すぐに合わせるか反対するかを決めず、理由を聞きたいです。" +
        "私たちのやり方にも改善できることはあります。" +
        "専門性を持ち寄って、以前よりよい仕事ができる組織にしたいですね。"
      ],
      scenes: [
        "会議室で、ミレアのブランドと事業づくりについて話す黒川佳澄",
        "ブランド戦略の資料を前に、部門を越えた協働を説明する黒川佳澄"
      ]
    },
    {
      id: "seto-akane",
      name: "瀬戸 朱音",
      department: "ミレアスタジオ事業部",
      role: "アカウントディレクター",
      category: "milea",
      color: "#d7dfcf",
      title: "顧客の期待を、つくる人へつなぐ。",
      intro:
        "顧客の課題整理、提案、月次レビューを担う瀬戸朱音。" +
        "これまで積み重ねた関係を大切にしながら、" +
        "制作と技術をつなぐ案件統括へ役割を広げます。",
      work:
        "ミレア既存顧客の窓口、提案、月次レビュー、案件の全体進行を担当。",
      message:
        "お客様が何を期待しているか、一緒に整理するところから始めましょう。",
      hobbies: ["喫茶店巡り", "旅行"],
      hobbyRatios: ["landscape", "portrait"],
      answers: [
        "お客様の要望だけでなく、その要望が出た背景を引き継ぐことです。" +
        "過去に何を試し、何を避けてきたか。" +
        "案件一覧には書き切れない情報も、制作や開発へ届けたいと思っています。",

        "誰が何を判断するかを、早めに決めることです。" +
        "担当者が増えても、お客様から見ると一つのチームです。" +
        "進捗を集めるだけでなく、判断待ちになっていることを見つけて動かします。",

        "技術的に難しいという理由で、提案をすぐに小さくしなくてよいところです。" +
        "できると約束する前に、実現方法と条件を相談できる。" +
        "その対話を、お客様へのよりよい提案につなげたいです。"
      ],
      scenes: [
        "顧客とのコミュニケーションについて話す瀬戸朱音",
        "案件進行の資料を開き、期待と役割の整理を説明する瀬戸朱音"
      ]
    },
    {
      id: "kiritani",
      name: "桐谷 結香",
      department: "ミレアスタジオ事業部",
      role: "ブランドプランナー／コピーライター",
      category: "milea",
      color: "#e6d7bb",
      title: "言葉だけで、終わらない企画を。",
      intro:
        "商品理解と顧客インサイトから、広告の切り口やコピーを考える桐谷結香。" +
        "技術者と早い段階から話すことで、" +
        "表現だけではない体験まで企画を広げます。",
      work:
        "ブランド企画、広告の訴求、コピー、動画構成を担当。",
      message:
        "何を言うかの前に、誰に何を感じてほしいかを聞かせてください。",
      hobbies: ["読書", "映画"],
      hobbyRatios: ["portrait", "landscape"],
      answers: [
        "商品の魅力を全部並べるより、誰に何を伝えるかを決めることです。" +
        "つくり手にとって大切な特徴と、使う人が気にすることは違う場合があります。" +
        "生活の中の言葉を探すところから始めます。",

        "実装の話を企画の最後にしないことです。" +
        "どんな体験にしたいのかを共有すれば、別の方法が見つかるかもしれない。" +
        "技術の制約を知るだけでなく、技術から発想をもらえる関係をつくりたいです。",

        "ミレアの顧客向け企画に加え、Compass Gearのような製品の伝え方にも関わりたいです。" +
        "機能の説明を、使う人の仕事がどう変わるかへ翻訳する。" +
        "その部分で、自分の経験を生かせると思っています。"
      ],
      scenes: [
        "企画と言葉づくりについて語る桐谷結香",
        "コピー案と企画ノートを前に、訴求の考え方を説明する桐谷結香"
      ]
    },
    {
      id: "ikeda",
      name: "池田 琴葉",
      department: "ミレアスタジオ事業部",
      role: "ブランドデザイナー",
      category: "milea",
      color: "#dcd0e7",
      title: "らしさと、伝わりやすさを一緒に。",
      intro:
        "広告バナー、SNS投稿、商品説明画像を担当する池田琴葉。" +
        "ブランドの雰囲気を守りながら、" +
        "必要な情報が無理なく伝わるデザインを考えます。",
      work:
        "ミレア顧客の広告、SNS、商品説明などのブランドデザインを担当。",
      message:
        "情報が多くて整理しづらいときも、一緒に優先順位を考えます。",
      hobbies: ["紙もの集め", "美術館巡り"],
      hobbyRatios: ["portrait", "landscape"],
      answers: [
        "見た目を整えるだけでなく、どの順番で読まれるかを考えます。" +
        "伝えたいことが多いほど、全部を同じ強さで置かない。" +
        "お客様が最初に知りたいことを見つけるのが出発点です。",

        "制作本数だけでは見えない工夫も共有したいです。" +
        "前回の反応を踏まえて、なぜ配置や言葉を変えたのか。" +
        "そうした判断が、次の制作に生きるように残していきたいです。",

        "ミレアのお客様への理解を深めながら、会社の中の別の専門性にも触れたいです。" +
        "実装や分析の話を聞くことで、デザインで考える範囲も広がると思っています。"
      ],
      scenes: [
        "広告デザインの考え方を話す池田琴葉",
        "制作案を見ながら情報の優先順位を説明する池田琴葉"
      ]
    },
    {
      id: "aoyagi",
      name: "青柳 詩織",
      department: "ミレアスタジオ事業部",
      role: "フォトグラファー／撮影ディレクター",
      category: "milea",
      color: "#d0dad4",
      title: "安心できる現場から、いい写真を。",
      intro:
        "商品や使用シーンの撮影を担当する青柳詩織。" +
        "質感や色を伝える技術と同じくらい、" +
        "出演者が安心して参加できる現場づくりを大切にしています。",
      work:
        "商品・使用シーンの撮影、撮影設計、現場での出演者への配慮を担当。",
      message:
        "何を撮るかだけでなく、どこでどう使う写真かも教えてください。",
      hobbies: ["フィルム写真", "散歩"],
      hobbyRatios: ["landscape", "portrait"],
      answers: [
        "撮影前に、目的と使い方をそろえることです。" +
        "きれいに写っていても、必要な情報が伝わらなければ十分ではありません。" +
        "商品の質感や色と、使う場面のイメージを両方考えます。",

        "出演する方が、不安や疑問を言える状態をつくることです。" +
        "立ち入り、待機場所、撮る範囲、公開先を曖昧にしない。" +
        "安心して参加できることも、制作の品質の一部だと考えています。",

        "素材の保存やアクセス管理を、技術の力でより確実にできることです。" +
        "ただし、管理できることと自由に使えることは違います。" +
        "撮影時の合意を守ったまま、使いやすい仕組みにしたいです。"
      ],
      scenes: [
        "撮影現場への配慮について話す青柳詩織",
        "商品撮影の参考資料を前に、写真の目的を説明する青柳詩織"
      ]
    },
    {
      id: "kubota",
      name: "久保田 瑞希",
      department: "プロダクト・デザイン部",
      role: "クリエイティブディレクター",
      category: "product",
      color: "#ddd0c1",
      title: "品質を守る判断を、チームの力に。",
      intro:
        "ブランドのビジュアル設計と品質管理を担ってきた久保田瑞希。" +
        "CompassONEでは全社のクリエイティブに関わりながら、" +
        "ミレアブランドの制作レビューも引き続き担当します。",
      work:
        "全社案件のクリエイティブ方針・品質レビューと、ミレアの表現監修を担当。",
      message:
        "完成してからではなく、方向性に迷っている段階で相談してください。",
      hobbies: ["建築巡り", "デザイン書の収集"],
      hobbyRatios: ["portrait", "landscape"],
      answers: [
        "品質は、見た目の好みだけで決めるものではありません。" +
        "誰に何を伝えるか、ブランドとして何を守るか。" +
        "その前提をそろえて、なぜその表現なのかを説明できる状態を目指します。",

        "所属が変わっても、専門的な判断がなくならないことを大切にしています。" +
        "納期や予算と衝突したときも、ただ押し切るのではなく、" +
        "何を変えれば成立するかを、責任者同士で話せる関係が必要です。",

        "ミレアで蓄積した知見を、ほかの案件にも生かしたいです。" +
        "同時に、製品の使いやすさや実装の考え方から学ぶこともある。" +
        "違う専門性を混ぜることで、表現の質を広げていきたいです。"
      ],
      scenes: [
        "クリエイティブの品質判断について語る久保田瑞希",
        "制作物の比較資料を前に、レビューの観点を説明する久保田瑞希"
      ]
    },
    {
      id: "miyamoto",
      name: "宮本 日和",
      department: "プロダクト・デザイン部",
      role: "デジタルデザイナー",
      category: "product",
      color: "#cededc",
      title: "デザインした先まで、つなげたい。",
      intro:
        "EC画像やLP、キャンペーンページを担当してきた宮本日和。" +
        "企画、デザイン、実装、改善を分断せず、" +
        "使う人の行動につながる体験をつくります。",
      work:
        "Web・LP・キャンペーンページの設計と、開発との実装連携を担当。",
      message:
        "見た目だけでなく、情報の順番や操作の流れも一緒に考えたいです。",
      hobbies: ["カフェ巡り", "スケッチ"],
      hobbyRatios: ["landscape", "portrait"],
      answers: [
        "広告を見た後、どの情報を知り、どう行動するかを考えます。" +
        "スマートフォンで見たときに、必要なことが無理なく理解できるか。" +
        "画面単体ではなく、前後の流れを意識しています。",

        "早い段階で開発の方と話すことです。" +
        "完成したデザインを渡すだけでは、後から大きく変わることもある。" +
        "実現方法を一緒に考えながら、意図を保って形にしたいです。",

        "公開した後の反応まで見て改善したいです。" +
        "見た目ができたことと、目的を達成できたことは別なので。" +
        "分析と実装の力が近くにある環境を、仕事に生かしたいと思っています。"
      ],
      scenes: [
        "Webデザインと実装の協働について話す宮本日和",
        "ワイヤーフレームを前に情報設計を説明する宮本日和"
      ]
    },
    {
      id: "kamiya-yuma",
      name: "神谷 悠真",
      department: "プロダクト・デザイン部",
      role: "動画ディレクター／エディター",
      category: "product",
      color: "#d6d9c4",
      title: "短い動画にも、理解の流れを。",
      intro:
        "縦型動画の構成、演出、編集を担当する神谷悠真。" +
        "広告だけでなく、製品やサービスを理解するための映像へも、" +
        "制作の領域を広げます。",
      work:
        "広告・製品紹介動画の企画、構成、演出、編集と改善を担当。",
      message:
        "動画にしたい内容が整理できていなくても、目的から相談できます。",
      hobbies: ["映画", "音楽"],
      hobbyRatios: ["landscape", "portrait"],
      answers: [
        "目を止めてもらうことと、内容が伝わることを分けて考えます。" +
        "勢いのある冒頭だけで終わらず、見た人が何を理解して帰るか。" +
        "短い動画でも、その流れをつくりたいです。",

        "撮影前の確認を大切にしています。" +
        "誰に向けて、どこで使い、何を伝えるのか。" +
        "編集で何とかする前提にせず、必要な素材と時間を計画します。",

        "制作と分析をつなげたいです。" +
        "どこで見られなくなったかだけでなく、理解や行動につながったかも確認する。" +
        "平野さんや製品担当と、次に変える理由を考えていきたいです。"
      ],
      scenes: [
        "映像の構成と伝え方について話す神谷悠真",
        "絵コンテと編集方針の資料を前に説明する神谷悠真"
      ]
    },
    {
      id: "tsujimoto",
      name: "辻本 蒼介",
      department: "プロダクト・デザイン部",
      role: "クリエイティブプロデューサー",
      category: "product",
      color: "#d3dce5",
      title: "つくる人が、安心して集中できるように。",
      intro:
        "撮影進行、外部クリエイターの手配、素材と利用権の管理を担う辻本蒼介。" +
        "全社案件でも、段取りと条件を整え、" +
        "制作の現場を支えます。",
      work:
        "制作進行、体制調整、キャスティング、素材ライブラリと利用権管理を担当。",
      message:
        "必要な素材や制作体制が分からないときは、早めに相談してください。",
      hobbies: ["写真展巡り", "料理"],
      hobbyRatios: ["portrait", "landscape"],
      answers: [
        "担当者が頑張れば何とかなる、という進め方を減らすことです。" +
        "必要な人、素材、確認、時間を先に整理する。" +
        "制作に集中できる状態をつくるのが、自分の役割だと思っています。",

        "素材が見つかることと、使ってよいことは別です。" +
        "利用媒体や期間、出演者との合意を確認できる状態にしておく。" +
        "会社が同じになったから自由に転用できる、とは考えません。",

        "相談を受けた時点で、制作の見通しを立てられる仕組みをつくりたいです。" +
        "大庭さんと情報を整理し、各部門の責任者と体制を決める。" +
        "急な依頼を、誰か一人が抱え込む状態を避けたいです。"
      ],
      scenes: [
        "制作進行と素材管理について話す辻本蒼介",
        "制作工程の資料を前に、体制づくりを説明する辻本蒼介"
      ]
    },
    {
      id: "hirano",
      name: "平野 真琴",
      department: "営業・カスタマーサクセス部",
      role: "マーケティングアナリスト",
      category: "sales",
      color: "#ded3e6",
      title: "数字を、次に試すことへ。",
      intro:
        "マーケティング分析と改善提案を担当する平野真琴。" +
        "部長直属の横断担当として、直接営業、代理店営業、" +
        "顧客支援や製品チームの検証を支えます。",
      work:
        "広告・導線・施策の分析、計測要件の整理、改善仮説の設計を担当。",
      message:
        "数字を集める前に、何を判断したいかから一緒に考えましょう。",
      hobbies: ["パズル", "喫茶店巡り"],
      hobbyRatios: ["landscape", "portrait"],
      answers: [
        "良かった、悪かっただけで終わらせないことです。" +
        "どんな人に、何を届けようとした結果なのかを確認する。" +
        "数字の変化を、次に試す仮説へ変えることを大切にしています。",

        "計測の前提を技術担当と確認できることです。" +
        "取得できていない情報や、集計上のずれがあれば、判断も変わります。" +
        "分析だけでなく、信頼して使えるデータづくりから関わりたいです。",

        "ミレアの案件に限らず、営業や製品の検証にも役立ちたいです。" +
        "ただし、すべてを同じ指標で評価することはしません。" +
        "目的ごとに何を見るべきかを、担当者と決めていきたいです。"
      ],
      scenes: [
        "マーケティング分析と改善について語る平野真琴",
        "分析の概念図を前に、検証の進め方を説明する平野真琴"
      ]
    },
    {
      id: "oba",
      name: "大庭 優衣",
      department: "コーポレート部",
      role: "事業運営・プロジェクト支援／広報",
      category: "corporate",
      color: "#e6d9c5",
      title: "相談が、止まらず進む仕組みを。",
      intro:
        "経理・労務・契約事務・広報を経験してきた大庭優衣。" +
        "CompassONEでは事業運営とプロジェクト支援を担当し、" +
        "部門を越えた相談を、必要な人へつなぎます。",
      work:
        "横断相談の受付、案件情報・工数・収支資料の整理、事業広報を担当。",
      message:
        "誰に相談するか迷った案件も、目的と希望時期から聞かせてください。",
      hobbies: ["パン作り", "文房具"],
      hobbyRatios: ["landscape", "portrait"],
      answers: [
        "相談した人が、次に何をすればよいか分かる状態をつくることです。" +
        "窓口を案内して終わりではなく、必要な情報を整理してつなぐ。" +
        "小さな確認のために、何人も聞き回る状況を減らしたいです。",

        "自分だけで優先順位や担当を決めないことです。" +
        "目的、納期、予算、制約を整理し、判断する責任者へ渡す。" +
        "事務処理と事業判断の境界を明確にして、進行を支えます。",

        "ミレアで経験した、制作現場に近い運営を全社でも生かしたいです。" +
        "社内広報の小宮さんや、制作進行の辻本さんとも連携し、" +
        "部署が違っても相談が途切れない状態を目指します。"
      ],
      scenes: [
        "部門を越えた相談対応について話す大庭優衣",
        "案件受付の資料を前に、情報整理の方法を説明する大庭優衣"
      ]
    }
  ];

  const organization = [
    ["システム開発部", 51],
    ["クラウドソリューション部", 14],
    ["プロダクト・デザイン部", 14],
    ["営業・カスタマーサクセス部", 10],
    ["コーポレート部", 8],
    ["セキュリティ・社内IT室", 2],
    ["ミレアスタジオ事業部", 5]
  ];

  function parseMarkup(markup) {
    const template = document.createElement("template");
    template.innerHTML = markup;

    return template;
  }

  /*
   * 企業サイトへの反映
   */

  if (isCorporateSite) {
    people.forEach((person) => {
      const scenes = person.scenes.map((description, index) => {
        const number = String(index + 1).padStart(2, "0");

        return {
          id: `interview-${person.id}-${number}`,
          alt: description,
          caption: description
        };
      });

      const member = {
        id: person.id,
        name: person.name,
        department: person.department,
        role: person.role,
        category: person.category,
        color: person.color,
        label: person.category === "milea"
          ? "MILEA STUDIO"
          : "PEOPLE & COLLABORATION",
        title: person.title,
        intro: person.intro,
        questions: [
          "仕事で大切にしていることは？",
          "チームで働くうえで、意識していることは？",
          "CompassONEで、これから取り組みたいことは？"
        ],
        answers: person.answers,
        interviewScenes: scenes
      };

      const existing = members.find((item) => item.id === person.id);

      if (existing) {
        Object.assign(existing, member);
      } else {
        members.push(member);
      }

      photos.set(`people-${person.id}`, {
        id: `people-${person.id}`,
        title: person.name,
        alt: `${person.department} ${person.role} ${person.name}`,
        color: person.color,
        kind: "employee"
      });

      scenes.forEach((scene) => {
        photos.set(scene.id, {
          id: scene.id,
          title: `${person.name} インタビュー`,
          alt: scene.alt,
          description: scene.caption,
          color: person.color,
          kind: "interview-scene"
        });
      });
    });

    const previousRenderHome = renderHome;
    const previousRenderInterviews = renderInterviews;
    const previousRenderInterview = renderInterview;
    const previousRenderOffice = renderOffice;

    function updatePeopleCount(root) {
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT
      );

      const nodes = [];

      while (walker.nextNode()) {
        nodes.push(walker.currentNode);
      }

      nodes.forEach((node) => {
        node.nodeValue = node.nodeValue
          .replace(/(?:12|16|18|25)人/g, `${members.length}人`)
          .replace(/全(?:12|16|18|25)名/g, `全${members.length}名`);
      });
    }

    function addMileaFilter(root) {
      root.querySelectorAll(".filters").forEach((group) => {
        if (!group.querySelector("[data-person-filter]")) {
          return;
        }

        if (group.querySelector('[data-person-filter="milea"]')) {
          return;
        }

        const button = document.createElement("button");
        button.type = "button";
        button.className = "filter-button";
        button.dataset.personFilter = "milea";
        button.setAttribute("aria-pressed", "false");
        button.textContent = "ミレアスタジオ";

        group.append(button);
      });
    }

    function updateCorporateCounts(root) {
      const stats = root.querySelectorAll("#about .stats .stat");

      if (stats.length >= 3) {
        const total = stats[1].querySelector("strong");
        const totalLabel = stats[1].querySelector("span");
        const departments = stats[2].querySelector("strong");
        const departmentsLabel = stats[2].querySelector("span");

        if (total) {
          total.innerHTML = `
            108<small>名</small>
          `;
        }

        if (totalLabel) {
          totalLabel.textContent = "従業員104名・取締役4名";
        }

        if (departments) {
          departments.innerHTML = `
            7<small>部門</small>
          `;
        }

        if (departmentsLabel) {
          departmentsLabel.textContent = "専門性をつなぐ組織";
        }
      }

      root.querySelectorAll("#company .table-row").forEach((row) => {
        const label = row.querySelector("dt");
        const value = row.querySelector("dd");

        if (!label || !value) {
          return;
        }

        if (label.textContent.trim() === "役職員数") {
          value.textContent = "108名（従業員104名・取締役4名）";
        }

        if (label.textContent.trim() === "事業内容") {
          value.innerHTML = `
            業務システム・Webサービス開発<br>
            クラウド構築・運用<br>
            自社ソフトウェア・SaaS開発<br>
            ブランド戦略・マーケティング支援<br>
            デザイン・写真・動画制作
          `;
        }
      });
    }

    function addMileaBusiness(root) {
      if (root.querySelector("#milea")) {
        return;
      }

      const peopleSection = root.querySelector("#people");

      if (!peopleSection) {
        return;
      }

      const section = document.createElement("section");
      section.id = "milea";
      section.className = "section shell";

      section.innerHTML = `
        <div class="section-heading">
          <div>
            <span class="eyebrow">MILEA STUDIO / CREATIVE & MARKETING</span>
            <h2>伝える力に、<br>実現する力を。</h2>
          </div>
          <p class="summary">
            ミレアスタジオのブランド戦略・企画・制作と、
            CompassONEの技術をつなぎます。
          </p>
        </div>

        <div class="two-columns">
          <div class="long-copy">
            <p>
              美容・コスメ・女性向け商材を中心に、
              ブランドの魅力を届けてきたミレアスタジオ。
              その専門性と、お客様との関係を引き継ぎます。
            </p>
            <p>
              企画や広告だけで終わらず、
              Webの体験、データ連携、改善まで。
              異なる専門家が、早い段階から一緒に考えます。
            </p>
            <a class="text-link" href="#interview/kurokawa">
              黒川佳澄のインタビュー
              <span class="arrow" aria-hidden="true">↗</span>
            </a>
          </div>

          <article class="card">
            <span class="eyebrow">MILEA CREATIVE PARTNER</span>
            <h3>ブランドを理解し、<br>継続して育てる。</h3>
            <p>
              ブランド戦略、広告企画、コピー、
              デザイン、写真・動画、効果検証。
              月次の制作と改善に伴走します。
            </p>
            <p>
              ミレアスタジオ事業部を窓口に、
              全社のデザイン・分析・開発部門が連携。
              課題に合ったチームを組み立てます。
            </p>
          </article>
        </div>
      `;

      peopleSection.before(section);
    }

    function addIntegrationNews(root) {
      const list = root.querySelector(".news-list");

      if (!list) {
        return;
      }

      const article = document.createElement("article");
      article.className = "news-item";

      article.innerHTML = `
        <time datetime="2026-11">2026.11</time>
        <span class="news-tag">COMPANY</span>
        <div class="news-copy">
          <h3>
            <a href="#home/milea">
              ミレアスタジオ事業部を新設。企画・制作と技術の連携を強化。
            </a>
          </h3>
          <p>
            11名の専門家が加わり、ブランド支援から
            デザイン・動画・分析まで、全社で協働する体制へ。
          </p>
        </div>
      `;

      list.prepend(article);
    }

    renderHome = function renderHomeWithMilea() {
      const template = parseMarkup(previousRenderHome());
      const root = template.content;

      updatePeopleCount(root);
      addMileaFilter(root);
      updateCorporateCounts(root);
      addMileaBusiness(root);
      addIntegrationNews(root);

      return template.innerHTML;
    };

    renderInterviews = function renderInterviewsWithMilea() {
      const template = parseMarkup(previousRenderInterviews());

      updatePeopleCount(template.content);
      addMileaFilter(template.content);

      return template.innerHTML;
    };

    renderInterview = function renderInterviewWithMilea(id) {
      const template = parseMarkup(previousRenderInterview(id));

      updatePeopleCount(template.content);

      return template.innerHTML;
    };

    renderOffice = function renderOfficeWithMileaCount() {
      const template = parseMarkup(previousRenderOffice());

      updatePeopleCount(template.content);

      return template.innerHTML;
    };

    if (typeof pageDescriptions !== "undefined") {
      pageDescriptions.home =
        "CompassONEは、システム開発・クラウド・自社製品に加え、" +
        "ミレアスタジオのブランド戦略と制作力をつなぐIT企業です。";

      pageDescriptions.interviews =
        `${members.length}人の社員・代表インタビュー。` +
        "技術、ブランド戦略、デザイン、動画、分析など、" +
        "それぞれの専門性と仕事への姿勢を紹介します。";
    }
  }

  /*
   * 社内ポータルへの反映
   */

  if (isPortal) {
    people.forEach((person) => {
      const profile = {
        id: person.id,
        name: person.name,
        department: person.department,
        role: person.role,
        work: person.work,
        message: person.message,
        hobbies: person.hobbies,
        hobbyRatios: person.hobbyRatios
      };

      const existing = employees.find((employee) => {
        return employee.id === person.id;
      });

      if (existing) {
        Object.assign(existing, profile);
      } else {
        employees.push(profile);
      }
    });

    if (typeof news !== "undefined" && Array.isArray(news)) {
      const title =
        "ミレアスタジオ事業部を新設し、11名の配属を決定しました。";

      const alreadyExists = news.some((item) => {
        return item.title === title;
      });

      if (!alreadyExists) {
        news.unshift({
          date: "2026-11",
          category: "組織",
          title,
          body:
            "ミレアスタジオ事業部は黒川事業部長を含む5名。" +
            "6名はプロダクト・デザイン部、営業・カスタマーサクセス部、" +
            "コーポレート部へ配属します。" +
            "クリエイティブ・マーケティングの相談は大庭優衣へ。"
        });
      }
    }

    if (
      typeof documents !== "undefined" &&
      Array.isArray(documents)
    ) {
      const documentId = "milea-cross-team-guide";

      const guide = {
        id: documentId,
        category: "組織・相談窓口",
        title: "ミレア統合後の配置と、全社案件の相談方法",
        owner: "コーポレート部／各事業部門",
        sections: [
          {
            title: "ミレアスタジオ事業部",
            text:
              "黒川佳澄を事業部長とし、瀬戸朱音、桐谷結香、" +
              "池田琴葉、青柳詩織の5名を配置します。" +
              "既存顧客のブランド戦略、窓口、企画、デザイン、撮影を維持します。"
          },
          {
            title: "全社へ配置する専門家",
            text:
              "久保田瑞希、宮本日和、神谷悠真、辻本蒼介はプロダクト・デザイン部。" +
              "平野真琴は営業・カスタマーサクセス部の部長直属。" +
              "大庭優衣はコーポレート部へ配属します。" +
              "ミレア専任ではなく、会社全体の案件を担当します。"
          },
          {
            title: "相談の入口",
            text:
              "クリエイティブ・マーケティングの相談は、大庭優衣が受付と情報整理を担当。" +
              "依頼者は目的、対象者、希望納期、予算、必要な成果物、制約を共有します。" +
              "未確定の項目がある段階でも相談できます。"
          },
          {
            title: "体制と優先順位の判断",
            text:
              "辻本蒼介が制作体制・進行・素材条件を整理します。" +
              "制作は早川玲奈、分析は長谷川祐介、" +
              "ミレアの顧客対応は黒川佳澄が配分を判断。" +
              "技術実装は佐伯拓真・藤堂美晴と調整します。" +
              "受付担当だけで予算や優先順位を確定しません。"
          },
          {
            title: "既存顧客との約束",
            text:
              "既存契約で約束した制作枠・納期・顧客窓口を確保します。" +
              "社内製品案件も、工数・予算・責任者を決めて依頼します。" +
              "各専門家への個別依頼で稼働を積み上げないようにします。"
          },
          {
            title: "品質と権限",
            text:
              "久保田瑞希は横断クリエイティブ品質を担当し、" +
              "ミレアのブランド表現レビューも維持します。" +
              "成瀬梓のプロダクトUI・UX領域とは、案件ごとにレビュー範囲を決めます。" +
              "納期・予算・品質が衝突した場合は責任者間で協議します。"
          },
          {
            title: "素材の利用条件",
            text:
              "素材の所在と利用許諾は別に管理します。" +
              "同じ会社になっても、顧客専用素材や出演同意の範囲が自動的に広がることはありません。" +
              "辻本蒼介と担当者が確認し、必要に応じて追加の同意・許諾を取得します。"
          },
          {
            title: "改善提案",
            text:
              "CompassONEの共通ルールを基本としつつ、改善提案を歓迎します。" +
              "背景や課題を共有し、顧客価値・品質・安全・働きやすさを基準に検討します。" +
              "完成した代替案がない段階の問題提起も受け付けます。"
          },
          {
            title: "組織人数",
            text:
              organization.map(([name, count]) => {
                return `${name}${count}名`;
              }).join("、") +
              "。従業員104名、取締役4名、役職員合計108名です。"
          }
        ]
      };

      const index = documents.findIndex((item) => {
        return item.id === documentId;
      });

      if (index === -1) {
        documents.unshift(guide);
      } else {
        documents[index] = guide;
      }
    }
  }

  window[UPDATE_KEY] = true;

  if (isCorporateSite) {
    route(true);
  }

  if (isPortal && loggedIn) {
    renderRoute(false);
  }
})();