// File: portal-lunch-events-update.js

/*
 * CompassOne 社内ポータル更新
 *
 * ・女子旅 温泉サークル：女性4名、準サークル
 * ・ランチサークル：全社員対象の特別補助制度
 * ・両サークルの初回活動報告
 * ・ブログカテゴリ「社内イベント」
 * ・少し早い忘年会の記事
 * ・イベント記事だけ写真を合計5枚、横3:2で表示
 *
 * 読み込み順：
 * 既存の全更新スクリプトの最後。
 *
 * 活動報告の日付は架空設定。
 * ランチの精算・承認・月間利用回数の自動管理は実装しない。
 */

(() => {
  "use strict";

  const UPDATE_KEY = "__compassLunchAndEventsUpdate";

  if (window[UPDATE_KEY]) {
    return;
  }

  if (
    typeof circles === "undefined" ||
    typeof blogs === "undefined" ||
    typeof circleReports !== "function" ||
    typeof photo !== "function" ||
    typeof renderRoute !== "function"
  ) {
    console.error(
      "既存ポータルと更新ファイルの後に読み込んでください。"
    );
    return;
  }

  function escapeText(value) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    };

    return String(value ?? "").replace(/[&<>"']/g, (character) => {
      return map[character];
    });
  }

  function parseMarkup(markup) {
    const template = document.createElement("template");
    template.innerHTML = markup;
    return template;
  }

  /*
   * サークル情報
   *
   * ランチのmembersは公開用の表記。
   * 通常サークルの人数区分には使用しない。
   */
  const additions = [
    {
      id: "onsen",
      name: "女子旅 温泉サークル",
      leader: "高瀬 美咲",
      members: [
        "高瀬 美咲",
        "杉浦 里奈",
        "桐谷 結香",
        "平野 真琴"
      ],
      description:
        "女性4名で、温泉地の散策や日帰り旅行を楽しむ準サークル。",
      activityNote:
        "行き先や予算は相談して決めます。" +
        "浴場・脱衣所では撮影せず、写真は撮影可能な共用部や街歩きの場面で記録します。"
    },
    {
      id: "lunch",
      name: "ランチサークル",
      leader: "参加グループごとの申請代表者",
      members: [
        "参加者全員"
      ],
      description:
        "勤務時間外の活動に参加しにくい人も、ランチで交流できる特別制度。",
      activityNote:
        "3名以上のランチを対象に、1人につき月2回まで、" +
        "1回最大3,000円を実費補助します。",
      specialProgram: true
    }
  ];

  additions.forEach((definition) => {
    const existing = circles.find((circle) => {
      return circle.id === definition.id;
    });

    if (existing) {
      Object.assign(existing, definition);
    } else {
      circles.push(definition);
    }
  });

  /*
   * 初回活動報告
   *
   * ランチは公開用の参加者名を「参加者全員」に統一。
   * 精算に必要な実名や領収書は、別の申請経路で扱う。
   */
  const reports = [
    {
      circleId: "onsen",
      date: "2026-11-29",
      title: "第1回｜湯けむりの街で、ゆっくり話す休日。",
      participantCount: 4,
      participantLabel:
        "高瀬 美咲・杉浦 里奈・桐谷 結香・平野 真琴",
      reporter: "高瀬 美咲",
      comment:
        "女性4人で、日帰りの温泉旅へ出かけました。" +
        "午前中は温泉街を散策し、気になったお店をのぞきながら、ゆっくり移動。" +
        "昼食の後は、それぞれのペースで温泉と休憩を楽しみました。" +
        "普段は仕事で話すことが多いメンバーとも、好きな場所や休日の過ごし方の話ができました。" +
        "桐谷さんと平野さんは正式転籍前ですが、11月の交流参加として一緒に。" +
        "次の行き先も、予算と移動時間を相談しながら決めたいと思います。",
      photos: [
        "circle-onsen-01",
        "circle-onsen-02"
      ],
      captions: [
        "高瀬・杉浦・桐谷・平野の4人で温泉街を散策。",
        "撮影可能な休憩スペースで一枚。浴場や脱衣所では撮影していません。"
      ]
    },
    {
      circleId: "lunch",
      date: "2026-11-30",
      title: "第1回｜昼休みに、いつもと違う顔ぶれで。",
      participantCount: 5,
      participantLabel: "参加者全員",
      reporter: "参加者全員",
      comment:
        "初回は5名で、オフィス近くのお店へランチに行きました。" +
        "勤務後の予定を合わせるのは難しくても、昼休みなら参加しやすいという声から始まった活動です。" +
        "食事をしながら、最近の仕事や好きなお店、普段は聞けなかった小さな話をしました。" +
        "参加や会話を無理に求めず、それぞれの休憩時間を尊重して実施。" +
        "午後の予定に間に合うよう、余裕を持ってオフィスへ戻りました。" +
        "参加者の内訳と領収書は申請時に確認し、こちらの公開報告は「参加者全員」としています。",
      photos: [
        "circle-lunch-01",
        "circle-lunch-02"
      ],
      captions: [
        "部署を越えて5名でランチ。参加者表記は「参加者全員」。",
        "食事を囲んで気軽に交流。掲載写真は参加者の確認を得ています。"
      ]
    }
  ];

  reports.forEach((report) => {
    const circle = circles.find((item) => {
      return item.id === report.circleId;
    });

    Object.assign(circle, {
      reportDate: report.date,
      reportTitle: report.title,
      comment: report.comment,
      photos: [...report.photos],
      captions: [...report.captions]
    });
  });

  function lunchSummary() {
    return `
      <section class="card report" data-lunch-program>
        <span class="eyebrow">LUNCH COMMUNITY</span>
        <h2>ランチサークル</h2>

        <div class="report-meta">
          <span class="tag">全社員対象・特別制度</span>
          <span class="tag">メンバー：参加者全員</span>
          <span class="tag">3名以上で開催</span>
        </div>

        <p>
          勤務時間外の活動に参加しにくい人も、
          ランチで気軽に交流できる仕組みです。
          固定メンバーではなく、その回に参加する人で開催できます。
        </p>

        <div class="notice">
          <strong>
            1人につき月2回まで、1回最大3,000円を実費補助。
          </strong>
          <br>
          食事代が上限未満の場合は実費分が対象です。
          参加者・開催日・領収書を添えて申請してください。
        </div>

        <p class="small">
          公開する活動報告では、参加者名を
          「参加者全員」とまとめて記載します。
          申請上の参加者確認は別途行います。
        </p>

        <p class="note">
          通常サークルの人数区分・月額補助とは別の制度です。
          自由参加とし、休憩時間や午後の予定を尊重してください。
        </p>
      </section>
    `;
  }

  function reportMarkup(report) {
    const circle = circles.find((item) => {
      return item.id === report.circleId;
    });

    return `
      <article
        class="card report"
        data-report-date="${report.date}"
      >
        <span class="eyebrow">
          ${escapeText(circle.name)} / ACTIVITY REPORT
        </span>

        <h2>${escapeText(report.title)}</h2>

        <div class="report-meta">
          <span class="tag">開催日：${report.date}</span>
          <span class="tag">
            当日の参加：${report.participantCount}名
          </span>
        </div>

        <p class="small">
          参加者：${escapeText(report.participantLabel)}
        </p>

        <div class="grid-2">
          ${report.photos.map((id, index) => `
            <div>
              ${photo(
                id,
                `${circle.name} ${report.title} 写真${index + 1}`
              )}
              <span class="caption">
                ${escapeText(report.captions[index])}
              </span>
            </div>
          `).join("")}
        </div>

        <div class="report-comment">
          <strong class="small">
            ${escapeText(report.reporter)}からのコメント
          </strong>
          <p>${escapeText(report.comment)}</p>
        </div>
      </article>
    `;
  }

  const previousReports = circleReports;

  circleReports = function renderLunchAndTravelReports(items) {
    const template = parseMarkup(previousReports(items));
    const selectedIds = new Set(items.map((item) => item.id));

    /*
     * 通常の人数判定で「発足準備」と表示されないよう、
     * ランチだけ専用の制度説明へ差し替える。
     */
    template.content.querySelectorAll(".card.report").forEach((card) => {
      const heading = card.querySelector("h2");

      if (heading?.textContent.trim() === "ランチサークル") {
        const replacement = parseMarkup(lunchSummary());
        card.replaceWith(replacement.content);
      }
    });

    let section = template.content.querySelector("section.section");

    if (!section) {
      section = document.createElement("section");
      section.className = "section";
      template.content.append(section);
    }

    const articles = [
      ...section.querySelectorAll("article.card.report")
    ];

    reports
      .filter((report) => selectedIds.has(report.circleId))
      .forEach((report) => {
        const item = parseMarkup(reportMarkup(report));
        articles.push(item.content.firstElementChild);
      });

    function dateOf(article) {
      const match = article.textContent.match(
        /開催日[：:\s]*(\d{4}-\d{2}-\d{2})/
      );

      return article.dataset.reportDate || match?.[1] || "";
    }

    articles.sort((a, b) => {
      return dateOf(b).localeCompare(dateOf(a));
    });

    section.innerHTML = `
      <div class="section-top">
        <h2>活動の記録</h2>
      </div>
    `;

    articles.forEach((article) => section.append(article));

    return template.innerHTML;
  };

  /*
   * 社内イベント記事
   *
   * image：既存ブログの冒頭写真
   * eventPhotos：冒頭を含む全5枚
   * 詳細画面では残り4枚を追加する。
   */
  const eventBlog = {
    id: "early-yearend-party-2026",
    date: "2026-11-30",
    category: "社内イベント",
    title: "少し早い忘年会。まずは、お疲れさまでした。",
    author: "小宮 莉子",
    image: "portal-event-yearend-01",
    excerpt:
      "12月の忙しさが始まる前に。部署を越えて、少し早めの忘年会を開きました。",
    eventPhotos: [
      {
        id: "portal-event-yearend-01",
        caption: "少し早い忘年会。参加を希望したメンバーが集まりました。"
      },
      {
        id: "portal-event-yearend-02",
        caption: "西村社長から短い挨拶。乾杯は好きな飲み物で。"
      },
      {
        id: "portal-event-yearend-03",
        caption: "部署を越えたテーブルで、食事と会話を楽しみました。"
      },
      {
        id: "portal-event-yearend-04",
        caption: "今年の印象に残った出来事を、少しずつ振り返る時間。"
      },
      {
        id: "portal-event-yearend-05",
        caption: "撮影を希望した参加者で記念写真。残りの年内もよろしくお願いします。"
      }
    ],
    paragraphs: [
      "11月30日、少し早めの忘年会を開きました。" +
      "12月は案件の進行や年末の予定で忙しくなるため、" +
      "ひと足先に「今年もお疲れさまです」と伝え合う時間です。" +
      "まだ一年は終わっていませんが、いったん立ち止まって話す機会になりました。",

      "今回は特定の部署やサークルだけの集まりではなく、社内イベントとして開催。" +
      "参加は希望制で、ミレアの皆さんも、正式転籍を翌日に控えた交流参加として加わりました。" +
      "前回の少人数の歓迎会とは、また違った顔ぶれで話せる場です。",

      "西村社長の挨拶は短めに。" +
      "今年の変化と、日々の仕事を支えている人たちへの感謝を伝えた後は、" +
      "それぞれ好きな飲み物で乾杯しました。" +
      "お酒を飲まない人にも選択肢を用意し、飲酒は勧めすぎないようにしています。",

      "テーブルでは、開発、営業、デザイン、コーポレートなど、部署の違うメンバーが同席。" +
      "最近の仕事の話から、サークル、ランチのお店、休日の過ごし方まで、" +
      "普段の打ち合わせでは出てこない話が聞こえてきました。" +
      "仕事の情報や顧客の機密を、会場で不用意に話さない配慮も忘れずに。",

      "今年の印象に残った出来事を話す場面では、" +
      "大きな成果だけでなく、誰かに助けてもらったことや、" +
      "小さく改善できたことも話題になりました。" +
      "派手ではない仕事にも「ありがとう」が届く時間だったと思います。",

      "途中で帰る人も、自分の予定に合わせて。" +
      "参加しない人や写真に写らない人も、もちろん同じ仲間です。" +
      "掲載する写真は確認を取り、希望しない人が写らないものを選びました。",

      "明日からは12月。新しい体制も始まります。" +
      "今日の会話が、仕事で声をかけるときの小さなきっかけになればうれしいです。" +
      "年内の残りも、無理を抱え込まず、相談しながら進めていきましょう。"
    ]
  };

  const existingBlogIndex = blogs.findIndex((blog) => {
    return blog.id === eventBlog.id;
  });

  if (existingBlogIndex === -1) {
    blogs.push(eventBlog);
  } else {
    blogs[existingBlogIndex] = eventBlog;
  }

  blogs.sort((a, b) => b.date.localeCompare(a.date));

  /*
   * カテゴリ配列がある構成では選択肢にも追加。
   */
  if (
    typeof blogCategories !== "undefined" &&
    Array.isArray(blogCategories) &&
    blogCategories.every((category) => typeof category === "string") &&
    !blogCategories.includes("社内イベント")
  ) {
    blogCategories.push("社内イベント");
  }

  /*
   * イベント写真のスタイル
   */
  const style = document.createElement("style");

  style.textContent = `
    .compass-event-gallery {
      margin-top: 32px;
    }

    .compass-event-gallery-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 24px;
    }

    .compass-event-photo-frame {
      aspect-ratio: 3 / 2;
      overflow: hidden;
      border-radius: 16px;
      background: #eee9e2;
    }

    .compass-event-photo-frame > * {
      width: 100%;
      height: 100%;
      margin: 0;
      aspect-ratio: 3 / 2;
    }

    .compass-event-photo-frame img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .compass-event-switch {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 16px 0 24px;
    }

    @media (max-width: 640px) {
      .compass-event-gallery-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  document.head.append(style);

  /*
   * 既存ブログ詳細の冒頭写真は残し、
   * イベント記事だけ本文側に4枚追加する。
   *
   * 詳細画面：
   * URLのハッシュに記事IDが含まれる既存ルーティングを想定。
   */
  function decorateEventDetail() {
    const event = blogs.find((blog) => {
      return blog.category === "社内イベント" &&
        Array.isArray(blog.eventPhotos) &&
        location.hash.includes(blog.id);
    });

    if (!event) {
      return;
    }

    const heading = [
      ...document.querySelectorAll("main h1, main h2, #app h1, #app h2")
    ].find((element) => {
      return element.textContent.trim() === event.title;
    });

    if (!heading) {
      return;
    }

    const root =
      heading.closest("article") ||
      heading.closest("main") ||
      document.getElementById("app");

    if (!root || root.querySelector("[data-event-gallery]")) {
      return;
    }

    const gallery = document.createElement("section");
    gallery.className = "compass-event-gallery";
    gallery.dataset.eventGallery = event.id;

    gallery.innerHTML = `
      <div class="section-top">
        <h2>イベントの写真</h2>
      </div>

      <p class="note">
        冒頭写真を含めて、全5枚で当日の様子を紹介します。
      </p>

      <div class="compass-event-gallery-grid">
        ${event.eventPhotos.slice(1, 5).map((image) => `
          <div>
            <div class="compass-event-photo-frame">
              ${photo(image.id, image.caption)}
            </div>
            <p class="caption">${escapeText(image.caption)}</p>
          </div>
        `).join("")}
      </div>
    `;

    const content = root.querySelector(
      ".blog-body, .blog-content, .article-body, .long-copy"
    );

    (content || root).append(gallery);

    /*
     * 冒頭画像も横3:2へ。
     * 名前の一致する画像だけを対象にする。
     */
    root.querySelectorAll("img").forEach((image) => {
      const source =
        image.getAttribute("src") ||
        image.dataset.src ||
        "";

      if (source.includes(event.image)) {
        image.style.aspectRatio = "3 / 2";
        image.style.objectFit = "cover";
        image.style.width = "100%";
      }
    });
  }

  /*
   * ブログ一覧に「社内イベント」の表示切替を追加。
   * 既存の記事カード・リンクをそのまま利用する。
   */
  let eventsOnly = false;

  function decorateBlogList() {
    const routeName = location.hash
      .replace(/^#\/?/, "")
      .split("/")[0];

    if (!["blogs", "blog"].includes(routeName)) {
      return;
    }

    if (blogs.some((blog) => location.hash.includes(blog.id))) {
      return;
    }

    const main =
      document.querySelector("main") ||
      document.getElementById("app");

    if (!main) {
      return;
    }

    const titles = new Map(
      blogs.map((blog) => [blog.title, blog])
    );

    const cards = [];

    main.querySelectorAll("h2, h3").forEach((heading) => {
      const blog = titles.get(heading.textContent.trim());
      const card = heading.closest(".blog-card, .card");

      if (blog && card) {
        cards.push({
          card,
          blog
        });
      }
    });

    if (!cards.length) {
      return;
    }

    let switcher = main.querySelector("[data-event-switch]");

    if (!switcher) {
      switcher = document.createElement("div");
      switcher.className = "compass-event-switch";
      switcher.dataset.eventSwitch = "true";

      switcher.innerHTML = `
        <button
          type="button"
          class="filter-button"
          data-event-view="all"
        >
          すべての記事
        </button>

        <button
          type="button"
          class="filter-button"
          data-event-view="events"
        >
          社内イベント
        </button>
      `;

      const firstCard = cards[0].card;
      const container = firstCard.parentElement;

      container.before(switcher);
    }

    switcher.querySelectorAll("[data-event-view]").forEach((button) => {
      const active =
        (button.dataset.eventView === "events") === eventsOnly;

      button.classList.toggle("active", active);

      const pressed = String(active);

      if (button.getAttribute("aria-pressed") !== pressed) {
        button.setAttribute("aria-pressed", pressed);
      }
    });

    cards.forEach(({ card, blog }) => {
      const hidden = eventsOnly && blog.category !== "社内イベント";

      if (card.hidden !== hidden) {
        card.hidden = hidden;
      }
    });
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-event-view]");

    if (!button) {
      return;
    }

    eventsOnly = button.dataset.eventView === "events";
    decorateBlogList();
  });

  /*
   * 再描画後にイベント記事へ写真を差し込む。
   * 既存ルーターの関数名・呼び出し方法は変更しない。
   */
  let scheduled = false;

  function scheduleDecorations() {
    if (scheduled) {
      return;
    }

    scheduled = true;

    requestAnimationFrame(() => {
      scheduled = false;

      if (typeof loggedIn !== "undefined" && !loggedIn) {
        return;
      }

      decorateEventDetail();
      decorateBlogList();
    });
  }

  const observer = new MutationObserver(scheduleDecorations);

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  window.addEventListener("hashchange", () => {
    eventsOnly = false;
    scheduleDecorations();
  });

  /*
   * 制度資料
   */
  if (
    typeof documents !== "undefined" &&
    Array.isArray(documents)
  ) {
    const lunchGuide = {
      id: "lunch-program-guide",
      category: "福利厚生",
      title: "ランチサークル・補助制度",
      owner: "コーポレート部",
      sections: [
        {
          title: "対象と開催条件",
          text:
            "勤務時間外の活動に参加しにくい人も交流できるよう、" +
            "3名以上でのランチを補助対象とします。" +
            "固定メンバー制ではなく、参加者全員をメンバーとして扱います。"
        },
        {
          title: "補助額と利用回数",
          text:
            "1人につき月2回まで、1回最大3,000円を実費補助します。" +
            "3,000円未満の場合は実際の食事代が対象です。" +
            "通常サークルの月額・回数補助は自動的に加算しません。"
        },
        {
          title: "申請と公開報告",
          text:
            "申請時には開催日、実際の参加者、領収書、各人の利用回数を確認します。" +
            "公開する活動報告では参加者名を「参加者全員」と記載し、写真2枚を掲載します。" +
            "実名や領収書を公開記事へ載せる必要はありません。"
        },
        {
          title: "自由参加と休憩",
          text:
            "参加は任意です。ランチへの参加や会話を強制せず、" +
            "各人の休憩時間、食事上の配慮、午後の予定を尊重します。"
        },
        {
          title: "転籍前の参加者",
          text:
            "11月のミレアメンバーの参加は、既存の交流参加の扱いに従います。" +
            "転籍前の補助対象・負担先はコーポレート部が確認し、" +
            "画面の掲載だけで支給を確定しません。"
        }
      ]
    };

    const index = documents.findIndex((item) => {
      return item.id === lunchGuide.id;
    });

    if (index === -1) {
      documents.push(lunchGuide);
    } else {
      documents[index] = lunchGuide;
    }
  }

  if (typeof news !== "undefined" && Array.isArray(news)) {
    const title =
      "女子旅 温泉・ランチサークルが発足。社内イベント記事も追加しました。";

    if (!news.some((item) => item.title === title)) {
      news.unshift({
        date: "2026-11-30",
        category: "福利厚生・社内イベント",
        title,
        body:
          "両サークルの初回活動報告と、少し早い忘年会を掲載。" +
          "ランチは3名以上、1人月2回まで、1回最大3,000円の実費補助です。"
      });
    }
  }

  if (typeof renderers !== "undefined") {
    renderers.home = renderHome;
    renderers.circles = renderCircles;
    renderers.suggestion = renderSuggestion;
  }

  window[UPDATE_KEY] = true;

  if (loggedIn) {
    renderRoute(false);
  }

  scheduleDecorations();
})();