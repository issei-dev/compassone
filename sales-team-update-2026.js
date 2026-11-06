// File: sales-team-update-2026.js

/*
 * CompassONE
 * 営業・カスタマーサクセス部の紹介追加
 *
 * 更新：
 * ・長谷川、岡田、安藤、相馬、杉浦、小野寺、吉田の7名を追加
 * ・上原、宮崎の役職とインタビュー内容を更新
 * ・企業サイトと社内ポータルで同じポートレートを使用
 * ・社員紹介、所属フィルター、個人インタビューへ反映
 * ・会社概要を従業員93名、取締役4名、合計97名へ統一
 *
 * 読み込み順：
 * 1. index.html内の既存スクリプト
 * 2. team-update-2026.js
 * 3. security-team-update-2026.js
 * 4. sales-team-update-2026.js
 *
 * この更新は掲載追加・役職更新です。
 * 新規入社や従業員の増員ではありません。
 *
 * 画像：
 * assetsフォルダ内に配置。
 * 拡張子は大文字の .PNG。
 *
 * ポートレート：縦4:5
 * people-hasegawa.PNG
 * people-okada.PNG
 * people-ando.PNG
 * people-soma.PNG
 * people-sugiura.PNG
 * people-onodera.PNG
 * people-yoshida.PNG
 *
 * インタビュー写真：各2枚・横3:2
 * interview-hasegawa-01.PNG
 * interview-hasegawa-02.PNG
 * interview-okada-01.PNG
 * interview-okada-02.PNG
 * interview-ando-01.PNG
 * interview-ando-02.PNG
 * interview-soma-01.PNG
 * interview-soma-02.PNG
 * interview-sugiura-01.PNG
 * interview-sugiura-02.PNG
 * interview-onodera-01.PNG
 * interview-onodera-02.PNG
 * interview-yoshida-01.PNG
 * interview-yoshida-02.PNG
 *
 * 上原・宮崎：
 * 既存のポートレートとインタビュー写真を継続使用。
 */

(() => {
  "use strict";

  const UPDATE_KEY = "__compassOneSalesTeam2026Applied";

  if (window[UPDATE_KEY]) {
    return;
  }

  if (
    typeof members === "undefined" ||
    !Array.isArray(members) ||
    typeof photos === "undefined" ||
    typeof renderHome !== "function" ||
    typeof renderInterviews !== "function" ||
    typeof renderInterview !== "function" ||
    typeof renderOffice !== "function" ||
    typeof route !== "function"
  ) {
    console.error(
      "営業部門の更新を開始できません。" +
      "index.html内の既存スクリプトより後に読み込んでください。"
    );

    return;
  }

  const departmentName = "営業・カスタマーサクセス部";

  const newMembers = [
    {
      id: "hasegawa",
      name: "長谷川 祐介",
      reading: "はせがわ ゆうすけ",
      ageAtNovember2026: 38,
      department: departmentName,
      section: "部門統括",
      role: "部長",
      category: "sales",
      color: "#d7d9c7",
      label: "SALES & CUSTOMER SUCCESS",
      title: "売れた、その先の約束まで。",
      intro:
        "直接営業、代理店営業、そして導入後の顧客支援。" +
        "3つのセクションを統括する長谷川祐介は、" +
        "契約の瞬間だけでなく、その後に何を届けられるかを重視します。",
      background:
        "業務ソフトウェア販売会社で法人営業とチーム管理を経験。" +
        "2020年に中途入社し、重要顧客への提案と、" +
        "開発・クラウド案件の営業調整を担当してきました。",
      responsibility:
        "部門全体の戦略、売上・粗利・顧客継続に関する目標、" +
        "重要商談、価格・契約条件、他部門との調整を担当。",
      questions: [
        "部長として、どんな営業組織をつくりたいですか？",
        "営業と開発の間で、意識していることは？",
        "3つのセクションに期待することは？"
      ],
      answers: [
        "売上はもちろん大切ですが、契約した時点で仕事が終わる組織にはしたくありません。" +
        "お客様が期待したことと、実際に提供できることが合っているか。" +
        "導入後に無理が出ないか。その約束まで責任を持つ営業部門にしたいです。",

        "受注してから相談するのではなく、約束する前に確認することです。" +
        "難しい条件があるなら、目的に立ち返って別の方法を探す。" +
        "開発側の事情をお客様に押し付けるのでも、" +
        "現場に無理を押し込むのでもない調整を大切にしています。",

        "担当領域は分けますが、お客様との関係まで分断したくありません。" +
        "直接営業で聞いた課題、代理店から届く声、導入後のつまずき。" +
        "それぞれが持っている情報を、次の提案や改善へつなげてほしいです。" +
        "そのための判断と調整は、私が引き受けます。"
      ],
      interviewScenes: [
        {
          id: "interview-hasegawa-01",
          alt: "会議室で営業組織の考え方を話す長谷川祐介",
          caption:
            "契約の数だけでなく、約束を届けられる体制まで見渡す。"
        },
        {
          id: "interview-hasegawa-02",
          alt: "資料を前に営業と顧客支援の連携を説明する長谷川祐介",
          caption:
            "3つのセクションが持つ顧客の声を、一つの改善につなげたい。"
        }
      ]
    },
    {
      id: "okada",
      name: "岡田 航平",
      reading: "おかだ こうへい",
      ageAtNovember2026: 29,
      department: departmentName,
      section: "ソリューション営業セクション",
      role: "ソリューション営業",
      category: "sales",
      color: "#cedbd7",
      label: "SOLUTION SALES",
      title: "提案の前に、仕事を知りたい。",
      intro:
        "新規開拓と、業務システム・クラウド案件の提案を担当する岡田航平。" +
        "最初の商談では、製品の説明よりも、" +
        "相手の仕事を理解するための質問を大切にしています。",
      background:
        "社内で法人営業の経験を重ね、" +
        "顧客の業務を聞き取る力と、技術担当へ相談をつなぐ力を培ってきました。",
      responsibility:
        "新規顧客の開拓、業務課題のヒアリング、" +
        "システム・クラウドの提案、商談進行を担当。",
      questions: [
        "最初の商談で大切にしていることは？",
        "技術的な相談には、どう対応していますか？",
        "この仕事の面白さを感じるのは？"
      ],
      answers: [
        "すぐに解決策を決めないことです。" +
        "同じ「入力が大変」という話でも、量が多いのか、確認が複雑なのかで答えが変わります。" +
        "誰が、どの場面で困っているのかを聞いて、提案の前提をそろえます。",

        "その場で分かったふりをしないようにしています。" +
        "持ち帰るときは、お客様の目的と制約を整理して技術担当へ相談する。" +
        "確認の結果を伝えるときも、できることだけでなく条件を含めて説明します。",

        "最初はぼんやりしていた困りごとが、" +
        "お客様や開発メンバーとの対話で具体的になっていくところです。" +
        "自分一人で答えを出す仕事ではないからこそ、" +
        "違う専門性をつなげられたときに手応えがあります。"
      ],
      interviewScenes: [
        {
          id: "interview-okada-01",
          alt: "会議室で顧客へのヒアリングについて話す岡田航平",
          caption:
            "製品の説明より先に、相手の仕事の流れを理解する。"
        },
        {
          id: "interview-okada-02",
          alt: "商談メモを開き提案の準備について説明する岡田航平",
          caption:
            "持ち帰る質問にも、顧客の目的と判断に必要な背景を添える。"
        }
      ]
    },
    {
      id: "ando",
      name: "安藤 菜月",
      reading: "あんどう なつき",
      ageAtNovember2026: 27,
      department: departmentName,
      section: "ソリューション営業セクション",
      role: "ソリューション営業",
      category: "sales",
      color: "#e8d3c5",
      label: "SOLUTION SALES",
      title: "説明した、より。伝わった、を。",
      intro:
        "問い合わせ対応、製品デモ、提案資料と案件進行を担当する安藤菜月。" +
        "機能を順番に紹介するのではなく、" +
        "お客様が自分の仕事に置き換えて理解できる説明を考えます。",
      background:
        "営業部門で問い合わせ対応と提案準備を担当。" +
        "顧客への説明や社内調整を通じて、案件を前へ進める経験を重ねています。",
      responsibility:
        "問い合わせの整理、製品デモ、提案資料作成、" +
        "商談後の確認事項と案件進行の管理を担当。",
      questions: [
        "製品デモで意識していることは？",
        "商談の後に大切にしていることは？",
        "これから伸ばしていきたい力は？"
      ],
      answers: [
        "全部の機能を見せることを目標にしないことです。" +
        "何を確かめたいのかを先に聞き、その方の仕事の流れに沿って説明します。" +
        "質問が少ないときも、理解されたと決めつけず、確認の時間をつくります。",

        "次に誰が何を確認するのかを、曖昧にしないことです。" +
        "お客様の宿題だけでなく、こちらが持ち帰ったことも整理して共有する。" +
        "小さな確認漏れで案件が止まらないように気を配っています。",

        "聞いた要望を整理するだけでなく、その背景から提案を考える力です。" +
        "上原さんや開発メンバーの質問の仕方を見て、" +
        "自分なら何を聞けたかを振り返っています。"
      ],
      interviewScenes: [
        {
          id: "interview-ando-01",
          alt: "打ち合わせスペースで製品説明の工夫を話す安藤菜月",
          caption:
            "説明する量より、相手の仕事に置き換えて理解できることを重視する。"
        },
        {
          id: "interview-ando-02",
          alt: "デモ用の資料を手に商談準備について説明する安藤菜月",
          caption:
            "商談後に何を確認するかまで、双方の認識をそろえておく。"
        }
      ]
    },
    {
      id: "soma",
      name: "相馬 健太",
      reading: "そうま けんた",
      ageAtNovember2026: 34,
      department: departmentName,
      section: "パートナー営業セクション",
      role: "パートナー営業セクションリーダー",
      category: "sales",
      color: "#d6dcc4",
      label: "PARTNER SALES",
      title: "自分が売る、その先の営業へ。",
      intro:
        "代理店の開拓と販売支援を率いる相馬健太。" +
        "一人で商談をまとめる力だけでなく、" +
        "パートナーが自分たちの言葉で提案できる状態をつくります。",
      background:
        "IT商社で販売店向け営業を経験し、2021年に中途入社。" +
        "協業先の開拓、紹介案件の調整、共同提案を担当してきました。",
      responsibility:
        "代理店の開拓・契約、重要案件、販売施策、" +
        "直接営業との商流調整とメンバー育成を担当。",
      questions: [
        "パートナー営業ならではの役割は？",
        "良い関係を続けるために必要なことは？",
        "チームとして目指す状態は？"
      ],
      answers: [
        "私が説明すれば売れる、で終わらないことです。" +
        "代理店の担当者が、どんなお客様に何を提案するかを理解し、" +
        "自信を持って話せるようにする。" +
        "そのために、製品の特徴だけでなく、向いていない使い方も共有します。",

        "話しやすさと、条件の明確さの両方です。" +
        "紹介の扱い、案件の担当範囲、支援する内容を、関係がよいからと省略しない。" +
        "後から認識が違ったとならないことが、長く協力するための土台だと思います。",

        "困ったときだけ連絡する関係ではなく、" +
        "お互いの得意なことを理解して、一緒に機会を見つけられる関係です。" +
        "杉浦さんと、研修や情報共有も含めて継続的に支える体制をつくりたいです。"
      ],
      interviewScenes: [
        {
          id: "interview-soma-01",
          alt: "会議室で代理店との協力関係について話す相馬健太",
          caption:
            "代理店が自分たちの言葉で提案できるところまで支える。"
        },
        {
          id: "interview-soma-02",
          alt: "販売支援の資料を前にパートナー営業の進め方を説明する相馬健太",
          caption:
            "関係がよいときこそ、役割と条件を曖昧にしない。"
        }
      ]
    },
    {
      id: "sugiura",
      name: "杉浦 里奈",
      reading: "すぎうら りな",
      ageAtNovember2026: 28,
      department: departmentName,
      section: "パートナー営業セクション",
      role: "パートナー営業",
      category: "sales",
      color: "#d8cee7",
      label: "PARTNER SALES",
      title: "資料を渡すだけでは、支援にならない。",
      intro:
        "代理店向け研修、案件登録、販売資料を担当する杉浦里奈。" +
        "使われる資料と、相談しやすい窓口を通じて、" +
        "パートナーの営業活動を支えています。",
      background:
        "営業部門で協業先への情報提供と案件管理を経験。" +
        "製品の説明を、代理店が使いやすい形へ整理する役割を担っています。",
      responsibility:
        "代理店向け研修、案件登録、資料更新、" +
        "問い合わせ整理と販売施策の運営を担当。",
      questions: [
        "販売資料をつくるときの基準は？",
        "代理店からの相談にはどう向き合っていますか？",
        "仕事でうれしいと感じる瞬間は？"
      ],
      answers: [
        "内容が正しいことに加えて、商談の場で使えるかを考えます。" +
        "誰に、どの場面で説明する資料なのかを決める。" +
        "できることを並べるだけではなく、確認が必要な条件も分かる形にしています。",

        "質問をそのまま転送する前に、背景を確認します。" +
        "提案前の確認なのか、導入後に困っているのかで、必要な返答は変わるので。" +
        "技術担当の回答も、代理店の方が説明しやすい形で返したいです。",

        "前回一緒に確認したことを、代理店の方が次の商談で生かしてくれたときです。" +
        "一度の対応が、その後の仕事を少し楽にできる。" +
        "そういう支援を積み重ねていきたいです。"
      ],
      interviewScenes: [
        {
          id: "interview-sugiura-01",
          alt: "打ち合わせスペースで代理店支援について語る杉浦里奈",
          caption:
            "資料を渡した後、実際の商談で使われるところまで想像する。"
        },
        {
          id: "interview-sugiura-02",
          alt: "研修資料を開き説明内容の工夫を話す杉浦里奈",
          caption:
            "質問の背景を整理し、相手が次の行動へ進める回答を届ける。"
        }
      ]
    },
    {
      id: "onodera",
      name: "小野寺 美月",
      reading: "おのでら みづき",
      ageAtNovember2026: 30,
      department: departmentName,
      section: "カスタマーサクセスセクション",
      role: "カスタマーサクセス",
      category: "sales",
      color: "#e3d8c6",
      label: "CUSTOMER SUCCESS",
      title: "使い始めの不安を、一つずつ。",
      intro:
        "導入支援、操作説明、活用状況の確認を担当する小野寺美月。" +
        "新しい仕組みに慣れるまでの不安を受け止め、" +
        "お客様が自分たちで使える状態を支えます。",
      background:
        "顧客支援の現場で操作説明と利用開始時のフォローを担当。" +
        "相手の理解度に合わせて説明を組み立てる経験を重ねています。",
      responsibility:
        "導入時のオンボーディング、利用手順の説明、" +
        "活用状況の確認と、定着に向けたフォローを担当。",
      questions: [
        "導入支援で大切にしていることは？",
        "操作を説明するときの工夫は？",
        "どんな支援を目指していますか？"
      ],
      answers: [
        "最初から全部を覚えてもらおうとしないことです。" +
        "まず何の業務で使うのか、誰が担当するのかを確認して、" +
        "最初の一歩を具体的にする。" +
        "できることが一つ増えると、次の質問もしやすくなると思います。",

        "こちらの画面を見てもらうだけでなく、実際に操作する時間をつくります。" +
        "分かりましたと言われても、どの場面で使うかを一緒に確認する。" +
        "質問しづらい雰囲気にならないよう、こちらから聞くことも大切にしています。",

        "毎回私に聞かなくても、安心して進められる状態です。" +
        "そのために、手順だけでなく、迷ったときの確認先も残したい。" +
        "支援することと、自分たちで使えるようになることを両立したいです。"
      ],
      interviewScenes: [
        {
          id: "interview-onodera-01",
          alt: "会議室で導入支援の考え方を話す小野寺美月",
          caption:
            "最初に使う業務を決めて、小さく確かな一歩を支える。"
        },
        {
          id: "interview-onodera-02",
          alt: "操作説明の資料を見ながら支援の工夫を説明する小野寺美月",
          caption:
            "説明を聞く時間だけでなく、自分で操作して確かめる時間をつくる。"
        }
      ]
    },
    {
      id: "yoshida",
      name: "吉田 拓海",
      reading: "よしだ たくみ",
      ageAtNovember2026: 26,
      department: departmentName,
      section: "カスタマーサクセスセクション",
      role: "カスタマーサクセス",
      category: "sales",
      color: "#cbd8e0",
      label: "CUSTOMER SUCCESS",
      title: "一件の問い合わせを、次の改善へ。",
      intro:
        "問い合わせの一次対応、FAQ、利用状況の集計を担当する吉田拓海。" +
        "目の前の質問に答えるだけでなく、" +
        "同じ困りごとを減らすために情報を整理しています。",
      background:
        "カスタマーサクセス業務の中で、問い合わせの整理と回答、" +
        "ナレッジの更新、利用状況の集計を経験しています。",
      responsibility:
        "問い合わせ一次対応、技術部門への連携、" +
        "FAQ整備、利用データの集計を担当。",
      questions: [
        "問い合わせ対応で気を付けていることは？",
        "FAQは、どのようにつくっていますか？",
        "これから挑戦したいことは？"
      ],
      answers: [
        "早く返すことと、推測で答えないことの両方です。" +
        "まだ分からない場合も、何を確認しているかを伝える。" +
        "お客様が回答を待っている間も、状況が見えないままにならないようにしています。",

        "社内の言葉ではなく、お客様が使った言葉を手がかりにします。" +
        "どんな質問で探すのか、どの手順で止まるのかを考える。" +
        "作って終わりにせず、同じ問い合わせが続くなら内容を見直します。",

        "問い合わせと利用状況を合わせて、困りごとの兆しを見つけたいです。" +
        "数字だけで状況を決めつけず、宮崎さんや小野寺さんの話も聞く。" +
        "お客様から連絡をいただく前に、役立つ案内ができるようになりたいです。"
      ],
      interviewScenes: [
        {
          id: "interview-yoshida-01",
          alt: "打ち合わせスペースで問い合わせ対応について話す吉田拓海",
          caption:
            "確認中のことも伝え、待っている人の不安を減らしたい。"
        },
        {
          id: "interview-yoshida-02",
          alt: "FAQの構成資料を前に改善の考え方を説明する吉田拓海",
          caption:
            "一度の回答を、次に同じことで迷う人への案内につなげる。"
        }
      ]
    }
  ];

  /*
   * 既存2名の役職・本文を更新。
   * 既存の画像IDは変更しない。
   */

  const uehara = members.find((member) => {
    return member.id === "uehara";
  });

  if (uehara) {
    Object.assign(uehara, {
      section: "ソリューション営業セクション",
      role: "ソリューション営業セクションリーダー",
      label: "SOLUTION SALES",
      title: "届く提案を、チームでつくる。",
      intro:
        "法人営業とSNS広告運用の経験を生かし、" +
        "直接営業チームを率いる上原絵里。" +
        "顧客の声を起点に、広告、商談、導入後の期待をつなぎます。",
      questions: [
        "リーダーとして、どんな営業チームをつくりたいですか？",
        "SNS広告の経験は、営業にどう生きていますか？",
        "メンバーとの関わりで大切にしたいことは？"
      ],
      answers: [
        "提案が上手な人だけに頼らないチームにしたいです。" +
        "何を聞き、どこを確認し、どう提案したのかを共有する。" +
        "お客様が違えば答えも変わりますが、" +
        "考えるための材料はチームで積み重ねられると思っています。",

        "広告でも商談でも、こちらが言いたいことと、相手が知りたいことは違います。" +
        "営業で聞いた言葉を広告へ、広告の反応を商談での確認へつなげる。" +
        "ただし、反応を得るために約束を大きくしないことは共通して大切です。",

        "結果の確認だけでなく、途中の相談に時間を使いたいです。" +
        "難しい案件を一人で抱えさせないこと。" +
        "私自身も広告や商談を全部持ち続けるのではなく、" +
        "役割を分けて、チームとして成果を出せるようにしたいです。"
      ]
    });
  }

  const miyazaki = members.find((member) => {
    return member.id === "miyazaki";
  });

  if (miyazaki) {
    Object.assign(miyazaki, {
      section: "カスタマーサクセスセクション",
      role: "カスタマーサクセスセクションリーダー",
      label: "CUSTOMER SUCCESS",
      intro:
        "カスタマーサクセスセクションを率いる宮崎香織。" +
        "小野寺美月、吉田拓海とともに、" +
        "導入から日々の活用まで、お客様の仕事に仕組みが根付くことを支えます。",
      questions: [
        "チームで支援するとき、大切にしていることは？",
        "営業や開発とは、どう連携していますか？",
        "これから目指す顧客支援は？"
      ],
      answers: [
        "誰が対応しても、お客様が最初から説明し直さなくてよい状態です。" +
        "導入の目的、確認したこと、残っている課題をチームで共有する。" +
        "担当者の丁寧さだけに頼らず、継続して支援できる仕組みをつくりたいです。",

        "営業からは、契約内容だけでなく期待されている成果も引き継ぎます。" +
        "開発へ要望を伝えるときは、どの仕事で、どのくらい困っているかを添える。" +
        "お客様の言葉を、そのまま転送するだけの役割にはしたくありません。",

        "問い合わせに答えるだけでなく、使い続けるうえでの迷いを減らす支援です。" +
        "小野寺さんの導入時の気づきと、吉田さんが整理する問い合わせを合わせて考える。" +
        "お客様も私たちも、同じことに繰り返し困らないようにしていきたいです。"
      ]
    });
  }

  /*
   * 新規掲載7名を登録。
   * 同じIDがすでにある場合は、既存位置で内容を更新。
   */

  newMembers.forEach((member) => {
    const index = members.findIndex((existing) => {
      return existing.id === member.id;
    });

    if (index === -1) {
      members.push(member);
    } else {
      Object.assign(members[index], member);
    }
  });

  /*
   * 営業部の9名を一つのまとまりで掲載。
   * 社長、セキュリティ室、その他の部門の相対順は維持。
   */

  const salesOrder = [
    "hasegawa",
    "uehara",
    "okada",
    "ando",
    "soma",
    "sugiura",
    "miyazaki",
    "onodera",
    "yoshida"
  ];

  const salesIds = new Set(salesOrder);

  const firstSalesIndex = members.findIndex((member) => {
    return salesIds.has(member.id);
  });

  const salesMembers = salesOrder
    .map((id) => {
      return members.find((member) => member.id === id);
    })
    .filter(Boolean);

  const otherMembers = members.filter((member) => {
    return !salesIds.has(member.id);
  });

  const insertAt = firstSalesIndex === -1
    ? otherMembers.length
    : members.slice(0, firstSalesIndex).filter((member) => {
        return !salesIds.has(member.id);
      }).length;

  otherMembers.splice(insertAt, 0, ...salesMembers);
  members.splice(0, members.length, ...otherMembers);

  /*
   * ポートレート・インタビュー画像を登録。
   * 上原・宮崎のポートレート説明も新しい役職へ更新。
   */

  salesMembers.forEach((member) => {
    photos.set(`people-${member.id}`, {
      id: `people-${member.id}`,
      title: member.name,
      alt: `${member.department} ${member.role} ${member.name}`,
      color: member.color,
      kind: "employee"
    });

    member.interviewScenes.forEach((scene) => {
      photos.set(scene.id, {
        id: scene.id,
        title: `${member.name} インタビュー`,
        alt: scene.alt,
        description: scene.caption,
        color: member.color,
        kind: "interview-scene"
      });
    });
  });

  const newMemberMap = new Map(
    newMembers.map((member) => {
      return [member.id, member];
    })
  );

  const previousRenderHome = renderHome;
  const previousRenderInterviews = renderInterviews;
  const previousRenderInterview = renderInterview;
  const previousRenderOffice = renderOffice;

  function parseMarkup(markup) {
    const template = document.createElement("template");
    template.innerHTML = markup;

    return template;
  }

  function updatePeopleCopy(root) {
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
        .replace(/(?:12|16|18)人/g, `${members.length}人`)
        .replace(/全(?:12|16|18)名/g, `全${members.length}名`);
    });
  }

  function updateOrganizationCounts(root) {
    const stats = root.querySelectorAll("#about .stats .stat");

    if (stats.length >= 2) {
      const value = stats[1].querySelector("strong");
      const label = stats[1].querySelector("span");

      if (value) {
        value.innerHTML = `
          97<small>名</small>
        `;
      }

      if (label) {
        label.textContent = "従業員93名・取締役4名";
      }
    }

    root.querySelectorAll("#company .table-row").forEach((row) => {
      const heading = row.querySelector("dt");
      const content = row.querySelector("dd");

      if (
        !heading ||
        !content ||
        heading.textContent.trim() !== "役職員数"
      ) {
        return;
      }

      content.replaceChildren();

      const count = document.createTextNode(
        "97名（従業員93名・取締役4名）"
      );

      const lineBreak = document.createElement("br");
      const note = document.createElement("span");

      note.className = "note";
      note.textContent = "2026年11月1日付の組織設定";

      content.append(count, lineBreak, note);
    });
  }

  function addSalesNews(root) {
    const list = root.querySelector(".news-list");

    if (!list) {
      return;
    }

    const article = document.createElement("article");
    article.className = "news-item";

    const time = document.createElement("time");
    time.dateTime = "2026-11";
    time.textContent = "2026.11";

    const tag = document.createElement("span");
    tag.className = "news-tag";
    tag.textContent = "PEOPLE";

    const content = document.createElement("div");
    content.className = "news-copy";

    const heading = document.createElement("h3");
    const link = document.createElement("a");

    link.href = "#interview/hasegawa";
    link.textContent =
      "営業・カスタマーサクセス部、9名の仕事をご紹介します。";

    heading.append(link);

    const description = document.createElement("p");
    description.textContent =
      "直接営業、代理店営業、導入後の顧客支援。" +
      "3つのセクションをつなぐメンバーのインタビューを掲載しました。";

    content.append(heading, description);
    article.append(time, tag, content);

    list.prepend(article);
  }

  renderHome = function renderHomeWithSalesTeam() {
    const template = parseMarkup(previousRenderHome());

    updatePeopleCopy(template.content);
    updateOrganizationCounts(template.content);
    addSalesNews(template.content);

    return template.innerHTML;
  };

  renderInterviews = function renderInterviewsWithSalesTeam() {
    const template = parseMarkup(previousRenderInterviews());

    updatePeopleCopy(template.content);

    return template.innerHTML;
  };

  renderOffice = function renderOfficeWithSalesCount() {
    const template = parseMarkup(previousRenderOffice());

    updatePeopleCopy(template.content);

    return template.innerHTML;
  };

  renderInterview = function renderSalesInterview(id) {
    const template = parseMarkup(previousRenderInterview(id));
    const member = members.find((item) => item.id === id);

    updatePeopleCopy(template.content);

    if (!member || !salesIds.has(id)) {
      return template.innerHTML;
    }

    const profile = template.content.querySelector(".story-profile");

    if (profile && member.section) {
      const section = document.createElement("p");

      section.className = "note space-top";
      section.textContent = member.section;

      profile.append(section);
    }

    const detail = newMemberMap.get(id);
    const intro = template.content.querySelector(".story-intro");

    if (detail && intro) {
      const section = document.createElement("section");
      section.className = "card space-top";
      section.setAttribute(
        "aria-label",
        `${detail.name}の経歴と担当業務`
      );

      const label = document.createElement("span");
      label.className = "eyebrow";
      label.textContent = "BACKGROUND & ROLE";

      const backgroundHeading = document.createElement("h3");
      backgroundHeading.textContent = "これまでの経験";

      const background = document.createElement("p");
      background.textContent = detail.background;

      const roleHeading = document.createElement("h3");
      roleHeading.className = "space-top";
      roleHeading.textContent = "CompassONEで担うこと";

      const responsibility = document.createElement("p");
      responsibility.textContent = detail.responsibility;

      section.append(
        label,
        backgroundHeading,
        background,
        roleHeading,
        responsibility
      );

      intro.insertAdjacentElement("afterend", section);
    }

    return template.innerHTML;
  };

  if (typeof pageDescriptions !== "undefined") {
    pageDescriptions.interviews =
      `代表の西村直樹をはじめとする${members.length}人のインタビュー。` +
      "営業・カスタマーサクセス部の9名も加わり、" +
      "直接営業、代理店営業、導入後の顧客支援への姿勢を紹介します。";
  }

  window[UPDATE_KEY] = true;

  route(true);
})();