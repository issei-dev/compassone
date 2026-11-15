// File: portal-community-expansion.js

/*
 * CompassOne 社内コミュニティ拡張
 *
 * ・社内ブログ3件
 * ・橘沙耶がテニス、ホットヨガに参加
 * ・全6サークルの活動報告を追加
 * ・意見箱の匿名共有、賛成、補足コメント
 * ・新規要望3件、架空の初期コメントを追加
 *
 * 正式転籍は2026年12月1日。
 * この記事・活動は11月中の設定。
 *
 * 最後の更新スクリプトとして読み込む。
 *
 * 注意：
 * localStorageを使うブラウザー内デモ。
 * 端末間同期、実際の本人認証、匿名性の保証はない。
 * 本番運用には認証付きAPIとサーバー保存が必要。
 */

(() => {
  "use strict";

  const UPDATE_KEY = "__compassCommunityExpansion";

  if (window[UPDATE_KEY]) {
    return;
  }

  if (
    typeof circles === "undefined" ||
    typeof blogs === "undefined" ||
    typeof employees === "undefined" ||
    typeof circleReports !== "function" ||
    typeof renderSuggestion !== "function" ||
    typeof renderRoute !== "function"
  ) {
    console.error(
      "先に既存のポータル更新ファイルを読み込んでください。"
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

  function uniqueId() {
    if (globalThis.crypto?.randomUUID) {
      return globalThis.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  /*
   * サークル所属
   */
  ["tennis", "hotyoga"].forEach((id) => {
    const circle = circles.find((item) => item.id === id);

    if (
      circle &&
      !circle.members.some((name) => {
        return name.replace(/\s/g, "") === "橘沙耶";
      })
    ) {
      circle.members.push("橘 沙耶");
    }
  });

  const tennis = circles.find((circle) => circle.id === "tennis");

  if (tennis) {
    tennis.description =
      "橘沙耶が加わり6名に。経験に合わせてラリーとダブルスを楽しむサークル。";
    tennis.activityNote =
      "新しい参加者にも合わせ、基礎練習から進めます。";
  }

  const hotyoga = circles.find((circle) => circle.id === "hotyoga");

  if (hotyoga) {
    hotyoga.description =
      "橘沙耶が加わり4名に。体調を優先して外部スタジオへ通う準サークル。";
    hotyoga.activityNote =
      "現在は4名のため準サークルです。水分補給と休憩を優先します。";
  }

  const tachibana = employees.find((person) => {
    return person.id === "tachibana-saya";
  });

  if (tachibana) {
    tachibana.message =
      "ベリーダンスに加え、テニスとホットヨガにも参加しています。" +
      "仕事では安全を守り、仕事の外では一緒に笑える仲間でいたいです。";
  }

  ["kurokawa", "nishimura"].forEach((id) => {
    const person = employees.find((employee) => employee.id === id);

    if (person) {
      person.hobbies = [
        ...new Set([
          ...(person.hobbies || []),
          "バイオリン"
        ])
      ];
    }
  });

  /*
   * 新しい活動報告
   */
  const newReports = [
    {
      circleId: "tennis",
      date: "2026-11-25",
      title: "第2回｜橘さんが参加。6人でコートへ。",
      participants: [
        "瀬戸 朱音",
        "水野 千晴",
        "安藤 菜月",
        "長谷川 祐介",
        "神谷 悠真",
        "橘 沙耶"
      ],
      comment:
        "今回から橘さんが参加し、6人になりました。" +
        "短いラリーの後、ペアを替えながらダブルスの動きを練習。" +
        "待っている人も声をかけ合い、休憩を挟みながら進めました。" +
        "橘さんは「仕事以外で名前を呼び合えるのがうれしい」と笑顔。" +
        "上手さよりも、一緒に楽しめることを大切にしています。",
      photos: [
        "circle-tennis-03",
        "circle-tennis-04"
      ],
      captions: [
        "橘沙耶を迎え、6人でウォーミングアップ。",
        "組み合わせを替えながらダブルスを練習。"
      ]
    },
    {
      circleId: "hotyoga",
      date: "2026-11-26",
      title: "第2回｜4人で、無理をしない時間。",
      participants: [
        "青柳 詩織",
        "久保田 瑞希",
        "大庭 優衣",
        "橘 沙耶"
      ],
      comment:
        "橘さんが加わり、4人で初心者向けレッスンに参加しました。" +
        "体調や暑さの感じ方はそれぞれ違うので、途中の休憩も遠慮せず。" +
        "終了後は水分を取りながら、最近の仕事やオフィスの話をしました。" +
        "写真は施設の許可を得た場所で、ほかの利用者が写らないよう撮影。" +
        "参加人数が4名となったため、引き続き準サークルとして活動します。",
      photos: [
        "circle-hotyoga-03",
        "circle-hotyoga-04"
      ],
      captions: [
        "4人で準備。体調を確認してから参加しました。",
        "終了後の一枚。休憩と水分補給も大切に。"
      ]
    },
    {
      circleId: "boardgame",
      date: "2026-11-25",
      title: "第3回｜説明する人も、毎回交代。",
      participants: [
        "森田 美緒",
        "松岡 健介",
        "相馬 健太",
        "吉田 拓海"
      ],
      comment:
        "今回は短いゲームをいくつか持ち寄り、説明役を交代しました。" +
        "最初の一回は練習として進め、分からないところはその場で確認。" +
        "普段は落ち着いている人が思い切った手を選んだり、" +
        "意外な場面で慎重になったりと、違う一面も見えました。" +
        "初めての人が入りやすい進め方も、少しずつ整えています。",
      photos: [
        "circle-boardgame-05",
        "circle-boardgame-06"
      ],
      captions: [
        "持ち寄ったゲームのルールを共有。",
        "説明役を交代しながら、4人で楽しみました。"
      ]
    },
    {
      circleId: "badminton",
      date: "2026-11-26",
      title: "第3回｜点数より、声をかけ合うこと。",
      participants: [
        "上原 絵里",
        "岡田 航平",
        "杉浦 里奈",
        "藤崎 彩乃"
      ],
      comment:
        "基礎練習の後、短いダブルスを行いました。" +
        "今回はペアで声をかけることを意識し、" +
        "無理に取りに行かず、相手の動きを見ながらプレー。" +
        "前回よりもラリーが続く場面が増えました。" +
        "疲れたら休憩し、仕事の翌日に響かない強度で楽しみました。",
      photos: [
        "circle-badminton-05",
        "circle-badminton-06"
      ],
      captions: [
        "4人で基礎練習からスタート。",
        "声をかけ合いながら、短いダブルス。"
      ]
    },
    {
      circleId: "belly",
      date: "2026-11-27",
      title: "第5回｜できたところを、見つけ合う。",
      participants: [
        "小宮 莉子",
        "橘 沙耶",
        "西川 真帆",
        "宮崎 香織",
        "池田 琴葉"
      ],
      comment:
        "5人でこれまでの動きを復習しました。" +
        "鏡を見てそろえるだけでなく、少人数で交代しながら、" +
        "よくなったところを伝え合う時間も取りました。" +
        "池田さんは腕の動き、宮崎さんは重心移動を丁寧に確認。" +
        "橘さんはほかのサークルの話もしてくれて、休憩中の会話もにぎやかでした。",
      photos: [
        "circle-belly-09",
        "circle-belly-10"
      ],
      captions: [
        "5人で腕の動きと重心移動を復習。",
        "交代で動きを見ながら、よかったところを共有。"
      ]
    },
    {
      circleId: "cosplay",
      date: "2026-11-27",
      title: "第2回｜小物ひとつで、印象が変わる。",
      participants: [
        "成瀬 梓",
        "須藤 花音",
        "宮本 日和"
      ],
      comment:
        "今回は衣装に合わせる小物と、撮影時の色の見え方を研究しました。" +
        "布やリボンを組み合わせ、簡単なアクセサリーを制作。" +
        "宮本さんが画面上の色と実物の違いを話してくれて、" +
        "仕事の専門性が趣味にもつながる時間になりました。" +
        "着替え場所と撮影範囲を確認し、写真の公開も本人が了承したものだけにしています。",
      photos: [
        "circle-cosplay-03",
        "circle-cosplay-04"
      ],
      captions: [
        "3人で衣装に合わせた小物を制作。",
        "色と光を確認しながら、短い撮影を楽しみました。"
      ]
    }
  ];

  newReports.forEach((report) => {
    const circle = circles.find((item) => {
      return item.id === report.circleId;
    });

    if (circle) {
      Object.assign(circle, {
        reportDate: report.date,
        reportTitle: report.title,
        comment: report.comment,
        photos: [...report.photos],
        captions: [...report.captions]
      });
    }
  });

  const previousReports = circleReports;

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
          <strong class="small">サークル長からのコメント</strong>
          <p>${escapeText(report.comment)}</p>
        </div>
      </article>
    `;
  }

  circleReports = function renderExpandedReports(items) {
    const template = parseMarkup(previousReports(items));
    const ids = new Set(items.map((circle) => circle.id));

    let section = template.content.querySelector("section.section");

    if (!section) {
      section = document.createElement("section");
      section.className = "section";
      template.content.append(section);
    }

    const articles = [
      ...section.querySelectorAll("article.card.report")
    ];

    newReports
      .filter((report) => ids.has(report.circleId))
      .forEach((report) => {
        articles.push(
          parseMarkup(reportMarkup(report)).content.firstElementChild
        );
      });

    function dateOf(article) {
      const match = article.textContent.match(
        /開催日[：:\s]*(\d{4}-\d{2}-\d{2})/
      );

      return article.dataset.reportDate || match?.[1] || "";
    }

    articles.sort((a, b) => dateOf(b).localeCompare(dateOf(a)));

    section.innerHTML = `
      <div class="section-top">
        <h2>活動の記録</h2>
      </div>
    `;

    articles.forEach((article) => section.append(article));

    return template.innerHTML;
  };

  /*
   * 社内ブログ
   */
  const blogPosts = [
    {
      id: "kurokawa-finally-sc2",
      date: "2026-11-29",
      category: "仕事のつながり",
      title: "ついに！",
      author: "黒川 佳澄",
      image: "portal-blog-sc2-award",
      excerpt:
        "P&PのSC-2案件を受注しました。ずっとやりたかった仕事が、ようやく動き出します。",
      paragraphs: [
        "ついに！ 今日は、この言葉から書かせてください。" +
        "大手P&Pの化粧品ブランド「SC-2」のプロダクトページとECサイト構築、" +
        "そしてセキュリティ強化の案件を、CompassOneとして受注しました。",

        "写真は、先方との交流の場に、指定のドレスコードで出席したときの一枚です。" +
        "西村社長はタキシード、私はネイビーのロングドレス。" +
        "普段のオフィスとは違う服装で並ぶと、少し照れますね。" +
        "でも、この日はどうしても記録を残しておきたかったんです。",

        "きっかけは、私と西村社長に共通する趣味のバイオリンでした。" +
        "音楽のつながりでP&Pの専務とお話しする機会があり、" +
        "そこからブランドのデジタル体験について相談をいただきました。" +
        "ご縁が入口になり、その後は担当部門との正式な提案と確認を重ねて、今回の受注につながりました。",

        "ミレアだけで仕事をしていた頃も、やりたいことはありました。" +
        "商品の魅力を伝えるページをつくり、その先の購入体験まで整えたい。" +
        "公開した後も数字を見て改善したい。" +
        "でも、開発力や保守の体制、必要なリソースを考えると、" +
        "自分たちだけでは責任を持って約束できないことがありました。",

        "今回は、企画とブランド表現だけでなく、" +
        "実装、クラウド運用、セキュリティまで、社内の専門家と一緒に考えられます。" +
        "「やりたい」で止まっていたものを、" +
        "「どうすれば実現できるか」という話に変えられる。" +
        "その違いを、いま強く感じています。",

        "もちろん、受注はゴールではありません。" +
        "製品の魅力が正確に伝わること、迷わず購入できること、" +
        "適切に情報を扱い、安心して運用できること。" +
        "それぞれの要件を確認し、工数と責任を決めながら進めます。" +
        "セキュリティも、言葉だけで「安全です」と約束するのではなく、" +
        "具体的な対策と検証を積み重ねる仕事です。",

        "私たちの正式転籍は12月1日です。" +
        "今回の契約主体はCompassOneで、ミレア側の協力範囲や情報共有は" +
        "移行時の取り決めに沿って進めています。" +
        "勢いがついたからこそ、契約や責任の境界も丁寧に扱いたいと思っています。",

        "西村社長と写真を撮った後、思わず「本当に、ここまで来ましたね」と話しました。" +
        "うれしいです。ものすごく。" +
        "でも、それ以上に、ここから良い仕事をしたい。" +
        "ずっと実現したかったことに、ようやくチームで挑めるのですから。"
      ]
    },
    {
      id: "tachibana-why-compass",
      date: "2026-11-28",
      category: "社員のこと",
      title: "ちゃんと働いて、ちゃんと笑える場所へ。",
      author: "橘 沙耶",
      image: "portal-blog-tachibana-community",
      excerpt:
        "セキュリティの話ではなく、今日は私がこの会社に来た理由を。",
      paragraphs: [
        "今日は少し、私自身の話をします。" +
        "以前はアメリカの大手企業で働いていました。" +
        "学ぶことも多く、優秀な人たちと仕事ができる環境でしたが、" +
        "私にとっては、ずっと力を入れ続けているような毎日でもありました。",

        "予定、成果、判断、次の課題。" +
        "仕事が終わっても頭の切り替えがうまくできず、" +
        "人と話すときまで、何かを正しく返さなくてはいけない気がしていました。" +
        "会社や周囲の人が悪かったというより、私が望む働き方との違いが大きくなったのだと思います。",

        "CompassOneに惹かれたのは、仕事を真剣にしながら、" +
        "社員同士で笑ったり、役職を離れて話したりしているところでした。" +
        "こういう場所で、安全を守る仕事をしたい。" +
        "ここに来た理由の一つは、それです。",

        "ベリーダンスに続いて、テニスとホットヨガにも参加しました。" +
        "サークルの掛け持ちは、予定と体調を見ながら。" +
        "どれも上手にできるわけではありませんが、" +
        "仕事の相談ではない会話で名前を呼んでもらえるのが、思っていた以上にうれしいです。",

        "もちろん、サークルに参加しないと仲間になれない、とは思っていません。" +
        "お昼に少し話す、チャットで聞く、仕事の相談をする。" +
        "それぞれの距離感でつながれる会社であってほしいです。",

        "セキュリティの仕事では、止めなくてはいけない場面もあります。" +
        "でも、怖い人だから聞きにくい、とは思われたくありません。" +
        "安心して働ける仕組みと、安心して話せる関係。" +
        "どちらも大事にしていきたいです。"
      ]
    },
    {
      id: "milea-welcome-party",
      date: "2026-11-29",
      category: "オフィスの日常",
      title: "歓迎会。12月を待たずに、もう顔なじみ。",
      author: "小宮 莉子",
      image: "portal-blog-milea-welcome",
      excerpt:
        "ミレア11名とCompassOneの4名、計15名で歓迎会を開きました。",
      paragraphs: [
        "11月28日、ミレアスタジオの皆さんの歓迎会を開きました。" +
        "参加したのは、黒川さん、瀬戸さん、桐谷さん、池田さん、青柳さん、" +
        "久保田さん、宮本さん、神谷悠真さん、辻本さん、平野さん、大庭さん。" +
        "CompassOne側は、西村社長、高瀬さん、橘さん、私の4名。合計15名です。",

        "正式転籍は12月1日ですが、11月から同じオフィスで過ごしているので、" +
        "自己紹介を最初からする会というより、" +
        "「仕事ではまだゆっくり話せていなかった人と話す会」になりました。",

        "黒川さんと社長のバイオリンの話をきっかけに、" +
        "好きな音楽、休日の過ごし方、最近始めたサークルの話へ。" +
        "池田さんとはベリーダンスの続き、宮本さんとはコスプレの小物の話をしました。" +
        "仕事の肩書きだけでは分からない一面が、あちこちで見えました。",

        "高瀬さんには、今日は仕事の段取り役ではなく、" +
        "参加者として楽しんでもらいたいと思っていました。" +
        "お店への連絡などは事前に分担。" +
        "普段支えてくれる人に、歓迎会まで全部任せないようにしました。",

        "お酒を飲む人も、ソフトドリンクの人も、それぞれ。" +
        "参加や飲酒、写真への写り込みは強制せず、" +
        "翌日の予定に合わせて帰れるようにしています。" +
        "掲載する写真も、参加者が確認したものです。",

        "12月からは、同じ事業部に残る人も、別の部署へ配属される人もいます。" +
        "でも、相談するときに「あのとき話した人だ」と思えるだけで、" +
        "少し声をかけやすくなるはず。" +
        "そんな関係を、これからも増やしていきたいです。"
      ]
    }
  ];

  blogPosts.forEach((blog) => {
    const index = blogs.findIndex((item) => item.id === blog.id);

    if (index === -1) {
      blogs.push(blog);
    } else {
      blogs[index] = blog;
    }
  });

  blogs.sort((a, b) => b.date.localeCompare(a.date));

  /*
   * 意見箱ストレージ
   *
   * 投稿本体と、公開・賛成・コメント情報を分離。
   */
  const opinionKey = typeof STORAGE !== "undefined"
    ? STORAGE.suggestions
    : "compass.portal.suggestions.v1";

  const discussionKey = `${opinionKey}.discussions.v1`;
  const deviceKey = `${opinionKey}.device.v1`;

  function loadJSON(key, fallback) {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  }

  function loadOpinions() {
    const value = loadJSON(opinionKey, []);

    if (!Array.isArray(value)) {
      throw new Error("意見箱データの形式が正しくありません。");
    }

    return value;
  }

  function loadDiscussions() {
    const value = loadJSON(discussionKey, {});

    if (
      !value ||
      typeof value !== "object" ||
      Array.isArray(value)
    ) {
      throw new Error("コメントデータの形式が正しくありません。");
    }

    return value;
  }

  function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  let deviceToken = "";
  let storageReady = false;
  let storageError = "";

  const extraOpinions = [
    {
      id: "opinion-nov2026-focus",
      category: "働き方・職場環境",
      title: "集中作業中と分かる表示がほしい",
      body:
        "相談しやすい雰囲気は良いのですが、実装やデザインの途中で声がかかると、" +
        "戻るまでに時間がかかることがあります。" +
        "集中中の表示と、急ぎでない相談を受ける時間帯を試してほしいです。" +
        "話しかけること自体を禁止するのではなく、お互いに判断しやすくしたいです。",
      createdAt: "2026/11/28 10:20",
      status: "受付"
    },
    {
      id: "opinion-nov2026-security-key",
      category: "社内IT・セキュリティ",
      title: "セキュリティキーを忘れた場合の手順を一枚にまとめてほしい",
      body:
        "セキュリティキーの運用には賛成です。" +
        "忘れた場合、紛失した場合、故障した場合で、" +
        "連絡先と本人確認、再発行の流れが分かる案内がほしいです。" +
        "安易に認証を回避する方法ではなく、正式な復旧手順を確認したいです。",
      createdAt: "2026/11/28 13:10",
      status: "受付"
    },
    {
      id: "opinion-nov2026-request-status",
      category: "業務改善",
      title: "部門横断の相談が、どこまで進んだか見えるようにしたい",
      body:
        "クリエイティブやマーケティングの相談窓口ができるのは助かります。" +
        "受付後に、確認中・担当調整中・着手予定などの状態が分かると、" +
        "何度も個別に問い合わせずに済みそうです。" +
        "顧客名や機密情報は必要な人だけが見られる形で、状況を確認したいです。",
      createdAt: "2026/11/28 16:30",
      status: "受付"
    }
  ];

  const sharedSeeds = [
    {
      id: "opinion-nov2026-benefits",
      comments: [
        "賛成です。平日の夜に参加できないので、昼休みの短時間企画もあるとうれしいです。",
        "支給額を同じにするだけでなく、参加できる選択肢を増やす方向がよいと思います。"
      ]
    },
    {
      id: "opinion-nov2026-office",
      comments: [
        "会議室の予約だけでなく、利用開始されなかった予約を確認する運用もあると助かります。",
        "集中席と会話できる席の区別も、予約画面で分かると使いやすいです。"
      ]
    },
    {
      id: "opinion-nov2026-storage",
      comments: [
        "個人の衣装や小物は、共用備品と分けて保管できると安心です。",
        "撮影可能な場所を決め、業務用モニターが背景に写らない配慮も必要だと思います。"
      ]
    },
    ...extraOpinions.map((opinion) => ({
      id: opinion.id,
      comments: []
    }))
  ];

  try {
    deviceToken = localStorage.getItem(deviceKey) || uniqueId();
    localStorage.setItem(deviceKey, deviceToken);

    const opinions = loadOpinions();
    const discussions = loadDiscussions();

    extraOpinions.forEach((opinion) => {
      if (!opinions.some((item) => item.id === opinion.id)) {
        opinions.push(opinion);
      }
    });

    sharedSeeds.forEach((seed) => {
      if (!opinions.some((item) => item.id === seed.id)) {
        return;
      }

      if (!discussions[seed.id]) {
        discussions[seed.id] = {
          public: true,
          supporters: [],
          comments: []
        };
      }

      const discussion = discussions[seed.id];

      seed.comments.forEach((body, index) => {
        const id = `${seed.id}-seed-comment-${index + 1}`;

        if (!discussion.comments.some((comment) => comment.id === id)) {
          discussion.comments.push({
            id,
            body,
            createdAt: "2026/11/29",
            seed: true
          });
        }
      });
    });

    saveJSON(opinionKey, opinions);
    saveJSON(discussionKey, discussions);
    storageReady = true;
  } catch (error) {
    storageError =
      "保存データを読み書きできないため、賛成・コメント機能を停止しています。";
    console.warn(storageError, error);
  }

  function notify(message) {
    if (typeof toast === "function") {
      toast(message);
    } else {
      window.alert(message);
    }
  }

  function redraw() {
    if (loggedIn) {
      renderRoute(false);
    }
  }

  const previousSuggestion = renderSuggestion;

  renderSuggestion = function renderSuggestionWithDiscussions() {
    const template = parseMarkup(previousSuggestion());
    const form = template.content.querySelector("#suggestion-form");

    if (form && storageReady) {
      const choice = document.createElement("div");
      choice.className = "notice space-top";

      choice.innerHTML = `
        <label>
          <input type="checkbox" name="shareInPortal">
          この意見を、投稿者名なしで社内共有する
        </label>
        <p class="note">
          チェックしない投稿は、共有一覧へ掲載しません。
          共有すると、他の利用者が賛成や補足コメントを付けられます。
          個人情報や顧客の機密情報は記入しないでください。
        </p>
      `;

      const submitButton = form.querySelector('[type="submit"]');

      if (submitButton) {
        submitButton.before(choice);
      } else {
        form.append(choice);
      }
    }

    if (!storageReady) {
      return `
        ${template.innerHTML}
        <p class="notice">${escapeText(storageError)}</p>
      `;
    }

    let opinions;
    let discussions;

    try {
      opinions = loadOpinions();
      discussions = loadDiscussions();
    } catch {
      return `
        ${template.innerHTML}
        <p class="notice">
          共有意見を読み込めませんでした。保存データは変更していません。
        </p>
      `;
    }

    const shared = opinions.filter((opinion) => {
      return discussions[opinion.id]?.public === true;
    });

    return `
      ${template.innerHTML}

      <section class="section" id="shared-opinions">
        <div class="section-top">
          <h2>みんなの意見・補足</h2>
          <span class="tag">${shared.length}件</span>
        </div>

        <p class="note">
          賛成は同じブラウザーから1件につき1票。
          もう一度押すと取り消せます。
          コメントに投稿者名は表示しません。
        </p>

        <p class="note">
          このデモでは同じブラウザー内だけで保存されます。
          初期掲載の要望・コメントは架空の設定です。
        </p>

        ${shared.map((opinion) => {
          const discussion = discussions[opinion.id];
          const agreed = discussion.supporters.includes(deviceToken);

          return `
            <article
              class="card space-top"
              id="shared-${escapeText(opinion.id)}"
            >
              <span class="tag">
                ${escapeText(opinion.category || "その他")}
              </span>

              <span class="tag">
                ${escapeText(opinion.status || "受付")}
              </span>

              <h3>${escapeText(opinion.title)}</h3>

              <p style="white-space: pre-wrap;">${escapeText(
                opinion.body
              )}</p>

              <button
                type="button"
                class="button button-outline"
                data-opinion-support="${escapeText(opinion.id)}"
                aria-pressed="${agreed}"
              >
                ${agreed ? "賛成済み" : "この意見に賛成"}
                ${discussion.supporters.length}
              </button>

              <h4 class="space-top">匿名の補足</h4>

              ${
                discussion.comments.length
                  ? discussion.comments.map((comment) => `
                    <div class="notice space-top">
                      <strong class="small">匿名</strong>
                      <p style="white-space: pre-wrap;">${escapeText(
                        comment.body
                      )}</p>
                      <span class="note">
                        ${escapeText(comment.createdAt)}
                      </span>
                    </div>
                  `).join("")
                  : `
                    <p class="note">
                      補足や別の観点を追加できます。
                    </p>
                  `
              }

              <form
                class="space-top"
                data-opinion-comment="${escapeText(opinion.id)}"
              >
                <label>
                  この意見への補足
                  <textarea
                    name="comment"
                    rows="3"
                    maxlength="1000"
                    required
                    placeholder="具体例や、気になる点を入力してください。"
                  ></textarea>
                </label>

                <p class="note">
                  個人への非難ではなく、課題と改善案を。
                  個人情報・機密情報は記入しないでください。
                </p>

                <button type="submit" class="button">
                  匿名で補足する
                </button>
              </form>
            </article>
          `;
        }).join("")}
      </section>
    `;
  };

  /*
   * 賛成ボタン：
   * 保存するのはブラウザー識別子のみ。
   * 社員IDや氏名とは結び付けない。
   */
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-opinion-support]");

    if (!button || !loggedIn || !storageReady) {
      return;
    }

    const id = button.dataset.opinionSupport;

    try {
      const discussions = loadDiscussions();
      const discussion = discussions[id];

      if (!discussion?.public) {
        return;
      }

      const index = discussion.supporters.indexOf(deviceToken);

      if (index === -1) {
        discussion.supporters.push(deviceToken);
      } else {
        discussion.supporters.splice(index, 1);
      }

      saveJSON(discussionKey, discussions);
      redraw();

      document.getElementById(`shared-${id}`)?.scrollIntoView({
        block: "nearest"
      });
    } catch {
      notify("保存できませんでした。ブラウザーの保存設定を確認してください。");
    }
  });

  /*
   * コメント投稿と、新規意見の公開選択。
   * 既存の意見投稿ハンドラーはそのまま利用する。
   */
  document.addEventListener("submit", (event) => {
    const form = event.target;

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    if (!loggedIn || !storageReady) {
      return;
    }

    if (form.matches("[data-opinion-comment]")) {
      event.preventDefault();

      const id = form.dataset.opinionComment;
      const body = String(
        new FormData(form).get("comment") || ""
      ).trim();

      if (!body || body.length > 1000) {
        notify("補足は1〜1,000文字で入力してください。");
        return;
      }

      try {
        const discussions = loadDiscussions();
        const discussion = discussions[id];

        if (!discussion?.public) {
          return;
        }

        discussion.comments.push({
          id: uniqueId(),
          body,
          createdAt: new Date().toLocaleString("ja-JP"),
          seed: false
        });

        saveJSON(discussionKey, discussions);
        redraw();

        document.getElementById(`shared-${id}`)?.scrollIntoView({
          block: "nearest"
        });

        notify("匿名の補足を追加しました。");
      } catch {
        notify("コメントを保存できませんでした。");
      }

      return;
    }

    if (form.id !== "suggestion-form") {
      return;
    }

    const share = form.querySelector(
      '[name="shareInPortal"]'
    )?.checked === true;

    let before;

    try {
      before = new Set(loadOpinions().map((item) => item.id));
    } catch {
      return;
    }

    /*
     * 既存の同期保存処理が終わった後、
     * 今回追加された投稿だけに公開設定を付ける。
     */
    queueMicrotask(() => {
      try {
        const opinions = loadOpinions();
        const discussions = loadDiscussions();

        const newItems = opinions.filter((item) => {
          return !before.has(item.id);
        });

        newItems.forEach((item) => {
          discussions[item.id] = {
            public: share,
            supporters: [],
            comments: []
          };
        });

        if (newItems.length) {
          saveJSON(discussionKey, discussions);
          redraw();
        }
      } catch {
        notify(
          "公開設定を保存できませんでした。投稿は共有一覧へ追加していません。"
        );
      }
    });
  }, true);

  /*
   * サークル制度：
   * 複数参加と、補助の重複支給は分けて扱う。
   */
  if (
    typeof documents !== "undefined" &&
    Array.isArray(documents)
  ) {
    const guide = documents.find((item) => {
      return item.id === "circle-guide";
    });

    if (guide) {
      guide.sections.push({
        title: "複数の活動への参加",
        text:
          "橘沙耶はベリーダンス、テニス、ホットヨガに参加しています。" +
          "複数参加と、補助を重複して受けられるかは別の事項として管理します。" +
          "活動日程、体調、各団体の参加記録を確認し、" +
          "未確定の支給条件を画面だけで自動承認しません。"
      });
    }
  }

  if (typeof news !== "undefined" && Array.isArray(news)) {
    const title =
      "SC-2案件の受注ブログ、歓迎会、サークル続報を掲載しました。";

    if (!news.some((item) => item.title === title)) {
      news.unshift({
        date: "2026-11-29",
        category: "社内ブログ",
        title,
        body:
          "黒川さんの「ついに！」、橘さんの入社への思い、" +
          "15名での歓迎会を掲載。意見箱には賛成・補足機能を追加しました。"
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
})();