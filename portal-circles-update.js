// File: portal-circles-update.js

/*
 * CompassONE 社内ポータル更新
 *
 * ・3〜4名：準サークル
 * ・5名以上：サークル
 * ・準サークル：1名3,000円／月
 * ・サークル：1名3,000円／回＋実費経費、要申請
 * ・月1回以上の参加
 * ・活動ごとに写真2枚を掲載
 *
 * ・ベリーダンスを5名へ更新
 * ・第1回2名、第2回3名、第3回5名を掲載
 * ・テニス5名、ホットヨガ3名を追加
 * ・西村社長による秘書紹介ブログを追加
 *
 * 読み込み位置：
 * portal-admin-update.js と
 * milea-integration-2026.js の後。
 *
 * 追加画像：
 * assets/circle-belly-05.PNG
 * assets/circle-belly-06.PNG
 * assets/portal-blog-secretary.PNG
 *
 * すべて横3:2、大文字の .PNG。
 *
 * この更新は表示・掲載情報の追加です。
 * 出席認定、補助金計算、承認、送金を自動実行しません。
 */

(() => {
  "use strict";

  const UPDATE_KEY = "__compassPortalCircleRulesApplied";

  if (window[UPDATE_KEY]) {
    return;
  }

  if (
    typeof circles === "undefined" ||
    !Array.isArray(circles) ||
    typeof blogs === "undefined" ||
    typeof renderCircles !== "function" ||
    typeof circleReports !== "function" ||
    typeof photo !== "function" ||
    typeof renderRoute !== "function" ||
    typeof loggedIn === "undefined"
  ) {
    console.error(
      "サークル更新の対象が見つかりません。" +
      "portal.htmlの既存スクリプトと更新ファイルの後に読み込んでください。"
    );

    return;
  }

  const THIRD_REPORT_DATE = "2026-11-14";
  const BLOG_DATE = "2026-11-14";

  const circleDefinitions = [
    {
      id: "belly",
      name: "ベリーダンスサークル",
      leader: "小宮 莉子",
      members: [
        "小宮 莉子",
        "橘 沙耶",
        "西川 真帆",
        "宮崎 香織",
        "池田 琴葉"
      ],
      description:
        "経験者も初心者も、音楽に合わせて無理なく体を動かすサークル。",
      activityNote:
        "新たに宮崎香織・池田琴葉が加わり、5名体制になりました。"
    },
    {
      id: "boardgame",
      name: "ボードゲームサークル",
      leader: "森田 美緒",
      members: [
        "森田 美緒",
        "松岡 健介",
        "相馬 健太",
        "吉田 拓海"
      ],
      description:
        "ルールを知らなくても参加できる、会話と発見を楽しむ準サークル。",
      activityNote:
        "短時間のゲームや協力型ゲームを中心に活動します。"
    },
    {
      id: "badminton",
      name: "バドミントンサークル",
      leader: "上原 絵里",
      members: [
        "上原 絵里",
        "岡田 航平",
        "杉浦 里奈",
        "藤崎 彩乃"
      ],
      description:
        "勝敗よりもラリーと交流を楽しむ、初心者歓迎の準サークル。",
      activityNote:
        "運動経験に合わせて強度を調整し、無理なく活動します。"
    },
    {
      id: "tennis",
      name: "テニスサークル",
      leader: "瀬戸 朱音",
      members: [
        "瀬戸 朱音",
        "水野 千晴",
        "安藤 菜月",
        "長谷川 祐介",
        "神谷 悠真"
      ],
      description:
        "女性3名・男性2名で発足。基礎練習とラリーから楽しむサークル。",
      activityNote:
        "初回の日程とコートを調整中です。経験に合わせて練習します。"
    },
    {
      id: "hotyoga",
      name: "ホットヨガサークル",
      leader: "青柳 詩織",
      members: [
        "青柳 詩織",
        "久保田 瑞希",
        "大庭 優衣"
      ],
      description:
        "女性3名で発足。外部スタジオのレッスンに参加する準サークル。",
      activityNote:
        "初回の日程を調整中です。体調を優先し、水分補給と休憩を取りながら参加します。"
    }
  ];

  /*
   * 活動履歴は、現在の登録メンバーとは別に保持。
   * 過去の参加人数を、現在の人数で上書きしない。
   */

  const reports = [];

  ["boardgame", "badminton"].forEach((id) => {
    const existing = circles.find((circle) => circle.id === id);

    if (existing && existing.reportDate) {
      reports.push({
        circleId: id,
        reportDate: existing.reportDate,
        reportTitle: existing.reportTitle,
        participants: [...existing.members],
        comment: existing.comment,
        photos: [...existing.photos],
        captions: [...existing.captions]
      });
    }
  });

  reports.push(
    {
      circleId: "belly",
      reportDate: "2026-11-04",
      reportTitle: "第1回｜まずは経験者2人で、ゆっくり再開。",
      participants: [
        "小宮 莉子",
        "橘 沙耶"
      ],
      comment:
        "初回は小宮と橘さんの2名で参加しました。" +
        "大学時代のサークルの話をしながら、" +
        "ストレッチと姿勢、重心移動を確認。" +
        "久しぶりの動きも無理をせず、音楽に合わせて少しずつ練習しました。" +
        "初心者が加わったときの進め方も相談しました。",
      photos: [
        "circle-belly-01",
        "circle-belly-02"
      ],
      captions: [
        "小宮莉子と橘沙耶の2人で、基礎動作を確認。",
        "次回の進め方を相談しながら、無理なく練習。"
      ]
    },
    {
      circleId: "belly",
      reportDate: "2026-11-06",
      reportTitle: "第2回｜西川さんが加わって、3人で。",
      participants: [
        "小宮 莉子",
        "橘 沙耶",
        "西川 真帆"
      ],
      comment:
        "西川さんが初参加し、3人で活動しました。" +
        "ストレッチの後は、姿勢と基本の動きをゆっくり確認。" +
        "後半は短い動きを音楽に合わせてつなぎました。" +
        "覚える速さよりも、それぞれが楽しめることを大切にしています。",
      photos: [
        "circle-belly-03",
        "circle-belly-04"
      ],
      captions: [
        "小宮・橘・西川の3人で、基礎から練習。",
        "動きを一つずつ確かめながら、短い振り付けへ。"
      ]
    },
    {
      circleId: "belly",
      reportDate: THIRD_REPORT_DATE,
      reportTitle: "第3回｜5人になって、広がる楽しさ。",
      participants: [
        "小宮 莉子",
        "橘 沙耶",
        "西川 真帆",
        "宮崎 香織",
        "池田 琴葉"
      ],
      comment:
        "今回から宮崎さんと池田さんが加わり、5人で活動しました。" +
        "初参加の2人に合わせ、ストレッチと姿勢の確認からスタート。" +
        "小宮と橘さんで基礎動作を紹介し、" +
        "西川さんも前回の練習を思い出しながら一緒に取り組みました。" +
        "後半は5人で短い振り付けに挑戦。" +
        "うまくそろえることよりも、笑いながら体を動かせる時間になりました。" +
        "ミレアから加わった池田さんとも、仕事以外の話ができたのがうれしかったです。",
      photos: [
        "circle-belly-05",
        "circle-belly-06"
      ],
      captions: [
        "小宮・橘・西川・宮崎・池田の5人で基礎練習。",
        "新しい仲間を迎え、短い振り付けを楽しみました。"
      ]
    }
  );

  circleDefinitions.forEach((definition) => {
    const existing = circles.find((circle) => {
      return circle.id === definition.id;
    });

    if (existing) {
      Object.assign(existing, definition);
    } else {
      circles.push({
        ...definition
      });
    }
  });

  /*
   * サークル本体には、最新回の代表情報も保持する。
   * 新設サークルは未開催のため、架空の活動実績を追加しない。
   */

  circles.forEach((circle) => {
    const ownReports = reports
      .filter((report) => report.circleId === circle.id)
      .sort((a, b) => b.reportDate.localeCompare(a.reportDate));

    if (ownReports.length) {
      const latest = ownReports[0];

      circle.reportDate = latest.reportDate;
      circle.reportTitle = latest.reportTitle;
      circle.comment = latest.comment;
      circle.photos = [...latest.photos];
      circle.captions = [...latest.captions];
    }
  });

  function classifyCircle(circle) {
    if (circle.members.length >= 5) {
      return "サークル";
    }

    if (circle.members.length >= 3) {
      return "準サークル";
    }

    return "発足準備";
  }

  function benefitDescription(circle) {
    if (circle.members.length >= 5) {
      return "1名につき3,000円／回＋実費経費。要申請。";
    }

    if (circle.members.length >= 3) {
      return "1名につき3,000円／月。";
    }

    return "認可人数に達した後、制度の対象になります。";
  }

  function escapeText(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      };

      return map[character];
    });
  }

  function renderCircleSummary(circle) {
    return `
      <section class="card report">
        <span class="eyebrow">CIRCLE INFORMATION</span>

        <h2>${escapeText(circle.name)}</h2>

        <div class="report-meta">
          <span class="tag">${classifyCircle(circle)}</span>
          <span class="tag">登録メンバー：${circle.members.length}名</span>
          <span class="tag">サークル長：${escapeText(circle.leader)}</span>
        </div>

        <p>${escapeText(circle.description)}</p>

        <p class="small">
          メンバー：${circle.members.map(escapeText).join("・")}
        </p>

        <div class="notice">
          ${benefitDescription(circle)}
        </div>

        <p class="note">
          ${escapeText(circle.activityNote || "")}
        </p>
      </section>
    `;
  }

  function renderReport(report) {
    const circle = circles.find((item) => {
      return item.id === report.circleId;
    });

    if (!circle) {
      return "";
    }

    return `
      <article class="card report">
        <span class="eyebrow">
          ${escapeText(circle.name)} / ACTIVITY REPORT
        </span>

        <h2>${escapeText(report.reportTitle)}</h2>

        <div class="report-meta">
          <span class="tag">
            開催日：${escapeText(report.reportDate)}
          </span>
          <span class="tag">
            サークル長：${escapeText(circle.leader)}
          </span>
          <span class="tag">
            当日の参加：${report.participants.length}名
          </span>
        </div>

        <p class="small">
          参加メンバー：
          ${report.participants.map(escapeText).join("・")}
        </p>

        <div class="grid-2">
          ${report.photos.slice(0, 2).map((id, index) => `
            <div>
              ${photo(
                id,
                `${circle.name} ${report.reportTitle} 写真${index + 1}`
              )}
              <span class="caption">
                ${escapeText(report.captions[index] || "")}
              </span>
            </div>
          `).join("")}
        </div>

        <div class="report-comment">
          <strong class="small">サークル長からのコメント</strong>
          <p>${escapeText(report.comment)}</p>
        </div>
      </article>
    `;
  }

  /*
   * 過去のベリーダンス用ラッパーは呼び出さず、
   * この更新の参加履歴を使って描画する。
   */

  circleReports = function renderCurrentCircleReports(items) {
    const ids = new Set(items.map((circle) => circle.id));

    const selectedReports = reports
      .filter((report) => ids.has(report.circleId))
      .sort((a, b) => b.reportDate.localeCompare(a.reportDate));

    const summaries = items.map(renderCircleSummary).join("");

    const reportMarkup = selectedReports.length
      ? selectedReports.map(renderReport).join("")
      : `
        <section class="card report">
          <span class="eyebrow">COMING SOON</span>
          <h2>初回の活動を準備しています。</h2>
          <p>
            開催後に、日付・参加メンバー・コメント・写真2枚を掲載します。
          </p>
        </section>
      `;

    return `
      ${summaries}
      <section class="section">
        <div class="section-top">
          <h2>活動の記録</h2>
        </div>
        ${reportMarkup}
      </section>
    `;
  };

  const previousRenderCircles = renderCircles;

  renderCircles = function renderCirclesWithConfirmedRules() {
    const template = document.createElement("template");
    template.innerHTML = previousRenderCircles();

    const notice = template.content.querySelector(".notice");

    if (notice) {
      notice.innerHTML = `
        <strong>サークル制度が確定しました。</strong><br>
        3〜4名は準サークル、5名以上はサークルです。<br>
        準サークル：1名3,000円／月。<br>
        サークル：1名3,000円／回＋実費経費（要申請）。<br>
        月1回以上の参加と、活動ごとの写真2枚の掲載が必要です。
        顔出しは必須ではありません。
      `;
    }

    return template.innerHTML;
  };

  /*
   * 社長ブログ
   */

  const secretaryBlog = {
    id: "ceo-secretary-work",
    date: BLOG_DATE,
    category: "社長のつぶやき",
    title: "予定を埋める人ではなく、会社を動かす人。",
    author: "西村 直樹",
    image: "portal-blog-secretary",
    excerpt:
      "高瀬さんの仕事は、予定表には収まりません。" +
      "普段は見えにくい調整と判断について、社長から。",
    paragraphs: [
      "今日は、高瀬さんの仕事について書きます。" +
      "秘書の仕事は、そばで見ていないと分かりにくいものです。" +
      "予定を入れる、来客を案内する、会議の準備をする。" +
      "外から見えるのは、その一部分かもしれません。",

      "先日、私が「この打ち合わせ、先に入れられないかな」と相談したときのこと。" +
      "高瀬さんは空き時間だけを見るのではなく、" +
      "その会議に必要な資料がそろう時期と、" +
      "先に確認すべき人を整理して返してくれました。" +
      "結果として、時間を早めるのではなく、" +
      "判断できる状態を先につくることになりました。",

      "私の予定を一つ動かせば、役員、社員、お客様、取引先の予定にも影響します。" +
      "誰に何を伝えるか。何を先に確認するか。" +
      "共有してよい情報はどこまでか。" +
      "高瀬さんは、そのつながりを見て調整しています。" +
      "会議が普通に始まり、必要な話ができることの裏側には、こうした仕事があります。",

      "社長の希望を、そのまま通す人でもありません。" +
      "「その順番だと現場が準備できません」" +
      "「先にこちらを決めないと、相手が判断できません」と、" +
      "必要なことを落ち着いて伝えてくれます。" +
      "私が思いつきで動きそうになったときに、" +
      "周囲への影響まで見て止めてくれるのは、とても大きな支えです。",

      "また、高瀬さんはコーポレート部の課長でもあります。" +
      "自分が全部を抱えるのではなく、担当者につなぎ、" +
      "誰が判断し、どこまで進んでいるかを整理する。" +
      "経営と現場の間で、情報が止まらないようにしています。",

      "もちろん、忙しそうに見えることが仕事の価値ではありません。" +
      "トラブルが起きなかったこと、待ち時間が減ったこと、" +
      "必要な判断ができたこと。" +
      "そういう成果は、問題が起きたときほど目立ちません。" +
      "だからこそ、見える作業だけで人の仕事を判断しない会社でありたいと思います。",

      "私自身、高瀬さんに頼れば何とかなると思って、" +
      "直前の変更を増やしてはいけません。" +
      "相談は早めに、目的と期限を添えて。" +
      "支えてもらう側の仕事も、きちんとやります。" +
      "高瀬さん、いつもありがとうございます。"
    ]
  };

  const existingBlogIndex = blogs.findIndex((blog) => {
    return blog.id === secretaryBlog.id;
  });

  if (existingBlogIndex === -1) {
    blogs.unshift(secretaryBlog);
  } else {
    blogs[existingBlogIndex] = secretaryBlog;
  }

  /*
   * 社内ニュース
   */

  if (typeof news !== "undefined" && Array.isArray(news)) {
    const title = "サークル制度を確定。テニス・ホットヨガも発足しました。";

    if (!news.some((item) => item.title === title)) {
      news.unshift({
        date: THIRD_REPORT_DATE,
        category: "福利厚生",
        title,
        body:
          "3〜4名は準サークル、5名以上はサークルとして認可。" +
          "月1回以上の参加と活動写真2枚の掲載を共通ルールとします。" +
          "ベリーダンスは5名となり、第3回の報告を掲載しました。"
      });
    }
  }

  /*
   * 社員プロフィール内の参加コメントを更新。
   * 趣味写真のファイル名や比率は変更しない。
   */

  if (typeof employees !== "undefined" && Array.isArray(employees)) {
    const messages = {
      komiya:
        "ベリーダンスサークルのサークル長です。" +
        "初心者も経験者も、自分のペースで楽しめる場にしたいです。",
      "tachibana-saya":
        "ベリーダンスサークルに参加しています。" +
        "仕事の相談も、趣味の話も、気軽に声をかけてください。",
      nishikawa:
        "ベリーダンスサークルに参加しています。" +
        "新しいことに挑戦する時間も楽しんでいます。",
      miyazaki:
        "ベリーダンスサークルに加わりました。" +
        "初心者として、基礎から少しずつ楽しんでいます。",
      ikeda:
        "ベリーダンスサークルに参加しました。" +
        "部署を越えて話せる時間も楽しみにしています。",
      "seto-akane":
        "テニスサークルのサークル長です。" +
        "経験にかかわらず、ラリーを楽しめる活動にしたいです。",
      mizuno:
        "テニスサークルに参加しています。" +
        "仕事以外でも、仲間との会話を増やせたらうれしいです。",
      ando:
        "テニスサークルに参加しています。" +
        "まずは無理なく、体を動かすところから楽しみます。",
      hasegawa:
        "テニスサークルに参加しています。" +
        "コートでは役職を離れて、一緒に楽しみたいです。",
      "kamiya-yuma":
        "テニスサークルに参加しています。" +
        "撮影や編集とは違う時間も楽しみにしています。",
      aoyagi:
        "ホットヨガサークルのサークル長です。" +
        "体調を優先しながら、無理のない活動にしたいです。",
      kubota:
        "ホットヨガサークルに参加しています。" +
        "仕事から少し離れて、体を動かす時間も大切にしたいです。",
      oba:
        "ホットヨガサークルに参加しています。" +
        "日程を合わせながら、続けられるペースで楽しみます。"
    };

    employees.forEach((employee) => {
      if (messages[employee.id]) {
        employee.message = messages[employee.id];
      }
    });
  }

  /*
   * 福利厚生ルールを確定版へ差し替える。
   * 未確定の兼任・欠席例外・申請細目は勝手に決めない。
   */

  if (
    typeof documents !== "undefined" &&
    Array.isArray(documents)
  ) {
    const guide = {
      id: "circle-guide",
      category: "福利厚生",
      title: "サークル制度・支給基準・活動報告",
      owner: "コーポレート部",
      sections: [
        {
          title: "認可区分",
          text:
            "登録メンバー3〜4名を準サークル、5名以上をサークルとします。" +
            "2名以下は、この制度の認可人数を満たしません。" +
            "今回の区分は現在の登録人数に基づくもので、過去の活動へ遡及して適用しません。"
        },
        {
          title: "準サークルへの支給",
          text:
            "メンバー1名につき月額3,000円を支給します。" +
            "複数回活動しても、この区分は月額基準です。"
        },
        {
          title: "サークルへの支給・経費",
          text:
            "メンバー1名につき1回3,000円に加え、実際にかかった経費を会社が負担します。" +
            "申請が必要です。サークル長は開催日、参加者、申請額、" +
            "経費の内容と根拠資料を整理してください。" +
            "同じ経費を重複して申請しないことを基本とします。"
        },
        {
          title: "月1回以上の参加",
          text:
            "名義だけの登録は認めず、月1回以上の参加を求めます。" +
            "サークル長は各回の実参加者を記録します。" +
            "写真に写ることと出席確認は分け、顔出しを参加条件にしません。"
        },
        {
          title: "活動写真の掲載",
          text:
            "活動ごとに写真2枚を社内ポータルへ掲載します。" +
            "開催日、実参加者、サークル長のコメントも合わせて記録します。" +
            "手元、用具、後ろ姿などでも構いません。" +
            "社外公開やSNS掲載には、別途本人の同意を確認します。"
        },
        {
          title: "参加・不参加の尊重",
          text:
            "加入は任意です。参加状況を仕事の人事評価に結び付けません。" +
            "活動中も役職にかかわらず互いを尊重し、体調や安全を優先してください。"
        },
        {
          title: "別途確認する事項",
          text:
            "複数サークルへの兼任と重複支給、月途中の人数変更、" +
            "病気・出張などによる欠席の例外、申請期限や経費の承認範囲は別途確認します。" +
            "この掲載だけで未確定事項を自動承認するものではありません。"
        }
      ]
    };

    const guideIndex = documents.findIndex((item) => {
      return item.id === guide.id;
    });

    if (guideIndex === -1) {
      documents.unshift(guide);
    } else {
      documents[guideIndex] = guide;
    }
  }

  window[UPDATE_KEY] = true;

  if (loggedIn) {
    renderRoute(false);
  }
})();