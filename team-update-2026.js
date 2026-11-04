// File: team-update-2026.js

/*
 * CompassONE
 * 2026年10月・11月 中途入社メンバー追加
 *
 * 対象：
 * この会話で作成した既存の index.html
 *
 * 読み込み位置：
 * index.html の既存スクリプトより後、body終了タグの直前。
 * module指定はせず、通常の外部スクリプトとして読み込むこと。
 *
 * 更新内容：
 * ・2026年10月1日入社：白石紗季、藤崎彩乃
 * ・2026年11月1日入社：水野千晴、小宮莉子
 * ・社員紹介、所属フィルター、インタビュー一覧へ追加
 * ・個人インタビューと関連記事へ追加
 * ・各人専用のインタビュー写真2枚を登録
 * ・掲載人数16名、従業員92名、役職員97名へ更新
 * ・会社概要、人数表記、お知らせを更新
 * ・社長の掲載位置、既存ページ、既存メンバーは維持
 *
 * 追加画像：すべて assets フォルダに配置
 * 拡張子は大文字の .PNG
 *
 * プロフィール写真：縦4:5
 * assets/people-shiraishi.PNG
 * assets/people-fujisaki.PNG
 * assets/people-mizuno.PNG
 * assets/people-komiya.PNG
 *
 * インタビュー写真：横3:2
 * assets/interview-shiraishi-01.PNG
 * assets/interview-shiraishi-02.PNG
 * assets/interview-fujisaki-01.PNG
 * assets/interview-fujisaki-02.PNG
 * assets/interview-mizuno-01.PNG
 * assets/interview-mizuno-02.PNG
 * assets/interview-komiya-01.PNG
 * assets/interview-komiya-02.PNG
 *
 * 写真制作方針：
 * ・各人物のプロフィール写真と同じ顔、髪型を維持
 * ・既存のオフィス画像と家具、素材、照明を統一
 * ・01は、本人がインタビューに答える自然な場面
 * ・02は、本人が資料や画面を使って説明する場面
 * ・実際の顧客情報、認証情報、個人情報を写さない
 * ・本人以外の人物を入れる場合は、識別できない構図にする
 */

(() => {
  "use strict";

  const UPDATE_KEY = "__compassOneTeamUpdate2026Applied";

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
      "CompassONE：更新対象のページ構成を確認できません。" +
      "既存のindex.htmlのスクリプトより後に読み込んでください。"
    );

    return;
  }

  const newMembers = [
    {
      id: "shiraishi",
      name: "白石 紗季",
      reading: "しらいし さき",
      ageAtNovember2026: 27,
      joinedAt: "2026-10-01",
      joinedLabel: "2026年10月1日",
      department: "システム開発部",
      role: "Compass Gear連携開発エンジニア",
      category: "development",
      color: "#d3dfcd",
      label: "MID-CAREER / ENGINEERING",
      title: "「つながった」を、安心して使えるまで。",
      intro:
        "2026年10月、Webサービスのバックエンド開発経験を持って入社。" +
        "Compass Gearの接続機能を担当する白石紗季は、" +
        "正常に動く瞬間よりも、動かなかったときの振る舞いを大切にしています。",
      background:
        "前職ではBtoB向けWebサービスのバックエンド開発と、" +
        "外部サービス連携を担当。認証やデータ同期の実装経験を持つ。",
      responsibility:
        "接続先の仕様調査、コネクター開発、自動テスト、" +
        "認証・再試行・重複実行防止の設計。",
      questions: [
        "CompassONEを選んだ理由は？",
        "連携開発で、特に大切にしたいことは？",
        "入社したばかりの今、どんな役割を担いたいですか？"
      ],
      answers: [
        "前職でも外部サービスとの連携を担当していました。" +
        "その中で難しかったのは、APIを呼び出すこと自体より、" +
        "双方の前提が違うところでした。" +
        "同じ「完了」でも意味が違ったり、更新のタイミングが違ったりする。" +
        "CompassONEの話を聞いて、そうした違いまで理解してつなぐ仕事に、" +
        "腰を据えて向き合いたいと思いました。",

        "一度成功しただけで、完成にしないことです。" +
        "途中で通信が切れたらどうなるか。" +
        "同じ操作を二度実行したら何が起きるか。" +
        "認証の期限が切れたとき、使う人にどう伝えるか。" +
        "AIから実行される操作でも、人が状況を追えて、" +
        "必要なら止められることが大切です。" +
        "便利さと一緒に、確認できる仕組みもつくりたいです。",

        "まずは既存の設計と、お客様がどのような場面で使うのかを理解したいです。" +
        "そのうえで、接続先ごとに毎回同じことで悩まないよう、" +
        "調査項目やテスト観点を整理していきたい。" +
        "自分しか分からない連携を増やすのではなく、" +
        "次に担当する人も判断しやすい形で残すことを目指しています。"
      ],
      interviewScenes: [
        {
          id: "interview-shiraishi-01",
          alt:
            "会議室で、サービス連携と仕事への姿勢について話す白石紗季",
          caption:
            "「APIが呼べる」と「仕事で安心して使える」のあいだにある課題に向き合う。"
        },
        {
          id: "interview-shiraishi-02",
          alt:
            "連携処理の構成図とノートを前に、エラー時の設計について説明する白石紗季",
          caption:
            "失敗したとき、どう気づき、どう戻せるか。正常系の先まで設計する。"
        }
      ]
    },
    {
      id: "fujisaki",
      name: "藤崎 彩乃",
      reading: "ふじさき あやの",
      ageAtNovember2026: 30,
      joinedAt: "2026-10-01",
      joinedLabel: "2026年10月1日",
      department: "クラウドソリューション部",
      role: "SRE・プロダクト運用エンジニア",
      category: "cloud",
      color: "#cbd9de",
      label: "MID-CAREER / RELIABILITY",
      title: "誰かの頑張りで、動かし続けない。",
      intro:
        "クラウド基盤の運用改善を経験し、2026年10月に入社した藤崎彩乃。" +
        "Compass Gearを支える運用について、" +
        "属人的な対応を減らし、チームで支えられる状態を目指します。",
      background:
        "前職ではクラウド基盤の構築・運用と監視改善を担当。" +
        "障害対応手順の整理やリリース作業の自動化を経験。",
      responsibility:
        "監視、通知設計、権限管理、リリース・復旧手順、" +
        "開発部門と連携した運用改善。",
      questions: [
        "なぜ、新しい製品の運用に関わろうと思ったのですか？",
        "安定運用のために、最初に整えたいことは？",
        "開発チームとは、どんな関係をつくりたいですか？"
      ],
      answers: [
        "運用を後から付け足すのではなく、" +
        "製品を育てる段階から一緒に考えたかったからです。" +
        "連携する相手が増えるほど、サービス全体は動いていても、" +
        "特定のお客様の操作だけ失敗している状況が起こり得ます。" +
        "何が正常で、どこからを異常とするか。" +
        "その定義から開発や顧客支援と話せることに、魅力を感じました。",

        "まずは、通知が来たときに誰が何を判断するのかを明確にしたいです。" +
        "アラートを増やすだけでは、安心にはつながりません。" +
        "確認するログ、影響の範囲、止める条件、相談する相手をそろえる。" +
        "詳しい誰かがずっと見ていないと成立しない運用ではなく、" +
        "担当が交代しても状況を理解できる状態をつくりたいです。",

        "運用の都合で止める人ではなく、" +
        "安心して変更できる方法を一緒に考える人でありたいです。" +
        "リリースの前に、問題が起きたときの検知と戻し方を相談する。" +
        "発生した障害も、個人の注意不足だけで終わらせず、" +
        "同じことが起きにくい仕組みへ変える。" +
        "開発の速さと信頼性を、対立させずに考えていきたいですね。"
      ],
      interviewScenes: [
        {
          id: "interview-fujisaki-01",
          alt:
            "会議室で、チームで支える運用について話す藤崎彩乃",
          caption:
            "特定の担当者の記憶や経験だけに依存しない、続けられる運用を考える。"
        },
        {
          id: "interview-fujisaki-02",
          alt:
            "ノートパソコンと運用フローの資料を前に、障害対応の考え方を説明する藤崎彩乃",
          caption:
            "検知すること、判断すること、戻すこと。その流れを開発と一緒に整える。"
        }
      ]
    },
    {
      id: "mizuno",
      name: "水野 千晴",
      reading: "みずの ちはる",
      ageAtNovember2026: 31,
      joinedAt: "2026-11-01",
      joinedLabel: "2026年11月1日",
      department: "プロダクト・デザイン部",
      role: "Compass Gearプロダクトマネージャー",
      category: "product",
      color: "#e0d3bd",
      label: "MID-CAREER / PRODUCT",
      title: "全部つくるより、何から解くか。",
      intro:
        "BtoBサービスの導入支援と製品企画を経験し、2026年11月に入社。" +
        "水野千晴が担うのは、顧客の要望を整理し、" +
        "Compass Gearが次に届ける価値を具体化する仕事です。",
      background:
        "前職ではBtoBサービスの導入支援を経て、製品企画を担当。" +
        "顧客要望の整理、仕様検討、開発・営業間の調整を経験。",
      responsibility:
        "Compass Gearの要望整理、開発優先順位、" +
        "標準機能と個別対応の区分、リリース条件の調整。",
      questions: [
        "CompassONEで、どんな仕事に取り組みたいですか？",
        "顧客要望の優先順位は、どう考えますか？",
        "入社直後の今、大切にしたいことは？"
      ],
      answers: [
        "「このソフトとつなぎたい」という依頼を、" +
        "そのまま機能名に変えて終わらせない仕事です。" +
        "実際には、入力の手間を減らしたいのか、" +
        "判断に必要な情報を集めたいのかで、必要な形が変わります。" +
        "導入支援で経験した現場の事情と、" +
        "製品として継続して届ける視点をつなげたいと思っています。",

        "要望の件数だけでは決められないと思っています。" +
        "どのくらい困っているか、どんな効果があるか、" +
        "ほかのお客様にも役立つか、作った後にどれだけ支える必要があるか。" +
        "その材料を営業、顧客支援、開発から集めて考えます。" +
        "見送るときも、単に「今はできません」ではなく、" +
        "理由や再検討する条件を共有できるようにしたいです。",

        "すぐに自分のやり方へ変えるのではなく、" +
        "まずは今の判断がどう生まれたのかを知りたいです。" +
        "資料だけでは分からない経緯や、お客様との約束もあるはずなので。" +
        "そのうえで、担当者によって説明が変わらないよう、" +
        "何を決めたか、なぜ決めたかを残していきたいです。" +
        "迷いを一人で抱えず、チームで判断できる状態が目標です。"
      ],
      interviewScenes: [
        {
          id: "interview-mizuno-01",
          alt:
            "共同作業スペースで、製品の優先順位について語る水野千晴",
          caption:
            "依頼された機能の先にある、顧客が変えたい仕事を理解する。"
        },
        {
          id: "interview-mizuno-02",
          alt:
            "要望整理の資料を指しながら、判断基準について説明する水野千晴",
          caption:
            "選ぶ理由も、見送る理由も。次の判断につながる形で共有したい。"
        }
      ]
    },
    {
      id: "komiya",
      name: "小宮 莉子",
      reading: "こみや りこ",
      ageAtNovember2026: 25,
      joinedAt: "2026-11-01",
      joinedLabel: "2026年11月1日",
      department: "コーポレート部",
      role: "SNS・採用広報担当",
      category: "corporate",
      color: "#e7cbbd",
      label: "MID-CAREER / COMMUNICATION",
      title: "いい会社っぽい、で終わらせたくない。",
      intro:
        "2026年11月、SNS・採用広報担当として入社した小宮莉子。" +
        "取材とコンテンツ制作の経験を生かし、" +
        "働く人の考え方や会社の日常を、具体的な言葉で届けます。",
      background:
        "前職では企業向けコンテンツの企画・編集とSNS運用に従事。" +
        "社員取材、短尺動画、採用向け記事の制作を経験。",
      responsibility:
        "社内取材、社長のX発信支援、通常投稿の企画・制作、" +
        "社員インタビュー、採用サイトの更新。",
      questions: [
        "CompassONEの広報で、伝えたいことは？",
        "SNS広告担当の上原さんとは、どう連携しますか？",
        "これから、どんな発信をつくりたいですか？"
      ],
      answers: [
        "「風通しがいいです」と書くだけでは、" +
        "どんな会社なのか、なかなか伝わらないと思います。" +
        "誰がどんな相談をして、どう決めたのか。" +
        "社長の案が変わったなら、なぜ変わったのか。" +
        "そういう具体的な場面を取材したいです。" +
        "もちろん、面白さのために話を盛ったり、" +
        "本人が困る切り取り方をしたりはしません。",

        "私は主に、取材して素材を集め、記事や投稿をつくる担当です。" +
        "上原さんは広告の配信や検証を担うので、" +
        "どんな人に、何を理解してもらいたいかを一緒にそろえたいです。" +
        "採用なら西川さんにも応募者との認識の違いを聞く。" +
        "反応がよかった投稿を増やすだけでなく、" +
        "働くイメージが正しく伝わったかまで見ていきたいと思っています。",

        "入社したばかりなので、まずは自分が分からないことを" +
        "遠慮せずに聞くところから始めたいです。" +
        "社内では当たり前になっている工夫も、" +
        "外から見ると、その会社らしさだったりします。" +
        "かっこよく整えた言葉だけではなく、" +
        "考え直したことや、まだ改善していることも伝えたい。" +
        "読んだ人が「ここなら自分はどう働くだろう」と" +
        "想像できる発信を目指しています。"
      ],
      interviewScenes: [
        {
          id: "interview-komiya-01",
          alt:
            "オフィスの打ち合わせスペースで、採用広報への思いを話す小宮莉子",
          caption:
            "抽象的な魅力より、その会社ならではの判断や会話を伝えたい。"
        },
        {
          id: "interview-komiya-02",
          alt:
            "取材ノートと投稿企画の資料を前に、発信の方針を説明する小宮莉子",
          caption:
            "取材と制作は小宮、広告運用は上原。役割を分けながら、届けたい理解をそろえる。"
        }
      ]
    }
  ];

  /*
   * 既存メンバーの順序は維持。
   * 西村社長は先頭のまま、新メンバー4名を末尾へ追加する。
   */

  newMembers.forEach((member) => {
    const alreadyExists = members.some((existing) => {
      return existing.id === member.id;
    });

    if (!alreadyExists) {
      members.push(member);
    }

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

  const memberCount = members.length;

  const organization = {
    employees: 92,
    directors: 5,
    total: 97,
    newHires: 4,
    asOf: "2026年11月1日"
  };

  /*
   * 元のレンダラーを保持し、必要箇所だけ更新。
   * 採用情報、インターン、画像表示、モーダル等は既存処理を利用する。
   */

  const originalRenderHome = renderHome;
  const originalRenderInterviews = renderInterviews;
  const originalRenderInterview = renderInterview;
  const originalRenderOffice = renderOffice;

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

    const textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((node) => {
      node.nodeValue = node.nodeValue
        .replace(/12人/g, `${memberCount}人`)
        .replace(/全12名/g, `全${memberCount}名`);
    });
  }

  function updateHomeStatistics(root) {
    const stats = root.querySelectorAll("#about .stats .stat");

    if (stats.length < 3) {
      return;
    }

    const totalValue = stats[1].querySelector("strong");
    const totalLabel = stats[1].querySelector("span");

    totalValue.innerHTML = `
      ${organization.total}<small>名</small>
    `;

    totalLabel.textContent =
      `従業員${organization.employees}名・役員${organization.directors}名`;

    const hireValue = stats[2].querySelector("strong");
    const hireLabel = stats[2].querySelector("span");

    hireValue.innerHTML = `
      ＋${organization.newHires}<small>名</small>
    `;

    hireLabel.textContent = "2026年10〜11月の中途入社";
  }

  function updateCompanyProfile(root) {
    const rows = root.querySelectorAll("#company .table-row");

    rows.forEach((row) => {
      const label = row.querySelector("dt");
      const value = row.querySelector("dd");

      if (!label || !value) {
        return;
      }

      if (label.textContent.trim() === "役職員数") {
        value.replaceChildren();

        const count = document.createTextNode(
          `${organization.total}名` +
          `（従業員${organization.employees}名・` +
          `役員${organization.directors}名）`
        );

        const lineBreak = document.createElement("br");
        const note = document.createElement("span");

        note.className = "note";
        note.textContent = `${organization.asOf}付`;

        value.append(count, lineBreak, note);
      }
    });
  }

  function createNewsItem(date, displayDate, title, description, href) {
    const article = document.createElement("article");
    article.className = "news-item";

    const time = document.createElement("time");
    time.dateTime = date;
    time.textContent = displayDate;

    const tag = document.createElement("span");
    tag.className = "news-tag";
    tag.textContent = "PEOPLE";

    const copy = document.createElement("div");
    copy.className = "news-copy";

    const heading = document.createElement("h3");
    const link = document.createElement("a");

    link.href = href;
    link.textContent = title;
    heading.append(link);

    const paragraph = document.createElement("p");
    paragraph.textContent = description;

    copy.append(heading, paragraph);
    article.append(time, tag, copy);

    return article;
  }

  function addHiringNews(root) {
    const newsList = root.querySelector(".news-list");

    if (!newsList) {
      return;
    }

    const novemberNews = createNewsItem(
      "2026-11-01",
      "2026.11.01",
      "プロダクトと採用広報に、新しい仲間が加わりました。",
      "水野千晴と小宮莉子が入社。" +
      "10月入社の2名と合わせ、4名のインタビューを公開しました。",
      "#interview/mizuno"
    );

    newsList.prepend(novemberNews);

    const octoberNews = createNewsItem(
      "2026-10-01",
      "2026.10.01",
      "連携開発と安定運用を支える、2名のエンジニアが入社。",
      "白石紗季と藤崎彩乃を迎え、" +
      "Compass Gearの開発・運用体制を強化しました。",
      "#interview/shiraishi"
    );

    newsList.append(octoberNews);
  }

  renderHome = function renderHomeWithNewMembers() {
    const template = parseMarkup(originalRenderHome());
    const root = template.content;

    updatePeopleCopy(root);
    updateHomeStatistics(root);
    updateCompanyProfile(root);
    addHiringNews(root);

    return template.innerHTML;
  };

  renderInterviews = function renderInterviewsWithNewMembers() {
    const template = parseMarkup(originalRenderInterviews());

    updatePeopleCopy(template.content);

    return template.innerHTML;
  };

  renderOffice = function renderOfficeWithUpdatedPeopleCount() {
    const template = parseMarkup(originalRenderOffice());

    updatePeopleCopy(template.content);

    return template.innerHTML;
  };

  renderInterview = function renderInterviewWithJoiningInformation(id) {
    const template = parseMarkup(originalRenderInterview(id));
    const member = newMemberMap.get(id);

    updatePeopleCopy(template.content);

    if (!member) {
      return template.innerHTML;
    }

    const profile = template.content.querySelector(".story-profile");

    if (profile) {
      const joiningInfo = document.createElement("p");

      joiningInfo.className = "note space-top";
      joiningInfo.textContent = `${member.joinedLabel} 中途入社`;

      profile.append(joiningInfo);
    }

    const intro = template.content.querySelector(".story-intro");

    if (intro) {
      const profileBox = document.createElement("section");
      profileBox.className = "card space-top";
      profileBox.setAttribute(
        "aria-label",
        `${member.name}の経歴と担当業務`
      );

      const label = document.createElement("span");
      label.className = "eyebrow";
      label.textContent = "BACKGROUND & ROLE";

      const backgroundHeading = document.createElement("h3");
      backgroundHeading.textContent = "これまでの経験";

      const background = document.createElement("p");
      background.textContent = member.background;

      const roleHeading = document.createElement("h3");
      roleHeading.className = "space-top";
      roleHeading.textContent = "CompassONEで担うこと";

      const responsibility = document.createElement("p");
      responsibility.textContent = member.responsibility;

      profileBox.append(
        label,
        backgroundHeading,
        background,
        roleHeading,
        responsibility
      );

      intro.insertAdjacentElement("afterend", profileBox);
    }

    return template.innerHTML;
  };

  /*
   * メタ説明も更新。
   * 掲載人数と会社全体の人数は混同しない。
   */

  if (typeof pageDescriptions !== "undefined") {
    pageDescriptions.interviews =
      `代表の西村直樹をはじめとする${memberCount}人のインタビュー。` +
      "2026年10月・11月入社の4名を含め、" +
      "開発、運用、製品企画、顧客支援、広報など、" +
      "それぞれの仕事への姿勢をご紹介します。";
  }

  window[UPDATE_KEY] = true;

  /*
   * 読み込み時のURLを維持して再描画。
   * 個人インタビューへの直接アクセスにも対応する。
   */

  route(true);
})();