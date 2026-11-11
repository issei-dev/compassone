// File: november-community-update.js

/*
 * CompassONE 11月コミュニティ更新
 *
 * 時系列：
 * 11月：ミレアメンバーがCompassOneオフィスへ移転。
 *       交流・サークル・移行準備に参加。
 * 12月1日：11名が正式転籍。
 *
 * 追加：
 * ・活動報告6件
 * ・コスプレ準サークル
 * ・社内ブログ2件
 * ・意見箱の要望3件
 *
 * 既存の活動報告、ブログ、意見は保持。
 * 意見一覧は画面上、管理者にのみ表示。
 * 実際のアクセス制限やサーバー保存は行わない。
 *
 * 必ず、各HTMLの既存更新スクリプトの最後に読み込む。
 */

(() => {
  "use strict";

  const UPDATE_KEY = "__compassNovemberCommunityUpdate";

  if (window[UPDATE_KEY]) {
    return;
  }

  /*
   * 仮想世界の表示基準日。
   * 現実の端末日時では自動的に進めない。
   *
   * 12月へ進めるときは、例えば
   * 2026-12-01 に変更する。
   */
  const STORY_DATE = "2026-11-24";
  const TRANSFER_DATE = "2026-12-01";
  const transferred = STORY_DATE >= TRANSFER_DATE;

  const mileaIds = new Set([
    "kurokawa",
    "seto-akane",
    "kiritani",
    "ikeda",
    "aoyagi",
    "kubota",
    "miyamoto",
    "kamiya-yuma",
    "tsujimoto",
    "hirano",
    "oba"
  ]);

  const isPortal =
    typeof employees !== "undefined" &&
    Array.isArray(employees) &&
    typeof circles !== "undefined" &&
    typeof renderRoute === "function";

  const isCorporate =
    typeof members !== "undefined" &&
    Array.isArray(members) &&
    typeof route === "function" &&
    typeof renderHome === "function";

  if (!isPortal && !isCorporate) {
    console.error(
      "更新対象が見つかりません。既存の更新ファイルより後に読み込んでください。"
    );
    return;
  }

  function escapeText(value) {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    };

    return String(value).replace(/[&<>"']/g, (character) => {
      return replacements[character];
    });
  }

  function parseMarkup(markup) {
    const template = document.createElement("template");
    template.innerHTML = markup;
    return template;
  }

  /*
   * 企業サイト：
   * 11月中は在籍人数に転籍予定者を含めない。
   * 掲載自体は維持し、予定であることを明示する。
   */
  if (isCorporate) {
    members.forEach((member) => {
      if (!mileaIds.has(member.id)) {
        return;
      }

      member.plannedDepartment = member.department;
      member.plannedRole = member.role;

      if (!transferred) {
        member.department =
          `${member.plannedDepartment}（12/1配属予定）`;

        member.role =
          `${member.plannedRole}（12/1予定）`;

        member.intro =
          `${member.name}は、2026年12月1日付でCompassOneへ転籍予定です。` +
          "11月からCompassOneのオフィスへ移り、交流と移行準備を進めています。" +
          `転籍後は${member.plannedDepartment}で、` +
          `${member.plannedRole}を担当します。`;
      }

      if (
        typeof photos !== "undefined" &&
        photos.has(`people-${member.id}`)
      ) {
        const image = photos.get(`people-${member.id}`);

        image.alt =
          `${member.name}／${member.department}／${member.role}`;
      }
    });

    const previousHome = renderHome;
    const previousInterview = renderInterview;

    renderHome = function renderHomeWithTransferTiming() {
      const template = parseMarkup(previousHome());
      const root = template.content;

      const total = transferred ? 108 : 97;
      const employeeCount = transferred ? 104 : 93;
      const departmentCount = transferred ? 7 : 6;

      const stats = root.querySelectorAll("#about .stats .stat");

      if (stats.length >= 3) {
        const totalValue = stats[1].querySelector("strong");
        const totalLabel = stats[1].querySelector("span");
        const departmentValue = stats[2].querySelector("strong");
        const departmentLabel = stats[2].querySelector("span");

        if (totalValue) {
          totalValue.innerHTML = `
            ${total}<small>名</small>
          `;
        }

        if (totalLabel) {
          totalLabel.textContent =
            `従業員${employeeCount}名・取締役4名`;
        }

        if (departmentValue) {
          departmentValue.innerHTML = `
            ${departmentCount}<small>部門</small>
          `;
        }

        if (departmentLabel) {
          departmentLabel.textContent = transferred
            ? "専門性をつなぐ組織"
            : "12月1日から7部門体制へ";
        }
      }

      root.querySelectorAll("#company .table-row").forEach((row) => {
        const label = row.querySelector("dt");
        const value = row.querySelector("dd");

        if (
          !label ||
          !value ||
          label.textContent.trim() !== "役職員数"
        ) {
          return;
        }

        value.innerHTML = transferred
          ? `
            108名（従業員104名・取締役4名）<br>
            <span class="note">2026年12月1日付</span>
          `
          : `
            97名（従業員93名・取締役4名）<br>
            <span class="note">
              12月1日、11名の転籍により108名となる予定です。
            </span>
          `;
      });

      const mileaSection = root.querySelector("#milea");

      if (mileaSection) {
        const timing = document.createElement("p");
        timing.className = "note";

        timing.textContent = transferred
          ? "2026年12月1日付で11名が転籍し、新体制で始動しました。"
          : "正式転籍と新体制の開始は2026年12月1日。" +
            "11月はオフィスを共にし、移行準備を進めています。";

        mileaSection.prepend(timing);
      }

      root.querySelectorAll(".news-item").forEach((item) => {
        const title = item.querySelector("h3");
        const body = item.querySelector("p");

        if (
          !title ||
          !title.textContent.includes("ミレアスタジオ事業部を新設")
        ) {
          return;
        }

        const link = title.querySelector("a");

        if (!transferred) {
          if (link) {
            link.textContent =
              "12月1日のミレアスタジオ事業部発足に向け、移行準備を開始。";
          } else {
            title.textContent =
              "12月1日のミレアスタジオ事業部発足に向け、移行準備を開始。";
          }

          if (body) {
            body.textContent =
              "11月からオフィスを共有し、11名の正式転籍と新体制の準備を進めています。";
          }
        }
      });

      return template.innerHTML;
    };

    renderInterview = function renderInterviewWithTransferDate(id) {
      const template = parseMarkup(previousInterview(id));

      if (mileaIds.has(id)) {
        const profile = template.content.querySelector(".story-profile");

        if (profile) {
          const note = document.createElement("p");
          note.className = "note space-top";

          note.textContent = transferred
            ? "2026年12月1日付で転籍"
            : "2026年12月1日付で転籍予定／11月からオフィスを共有";

          profile.append(note);
        }
      }

      return template.innerHTML;
    };
  }

  if (isPortal) {
    /*
     * 社員プロフィール：
     * 11月の所属と、12月の配属予定を区別する。
     */
    employees.forEach((employee) => {
      if (!mileaIds.has(employee.id)) {
        return;
      }

      const futureDepartment = employee.department;
      const futureRole = employee.role;
      const futureWork = employee.work;

      employee.transferDate = TRANSFER_DATE;
      employee.plannedDepartment = futureDepartment;
      employee.plannedRole = futureRole;

      if (!transferred) {
        employee.department = "ミレアスタジオ／転籍準備";
        employee.role = "2026年12月1日 転籍予定";
        employee.work =
          "11月からCompassOneのオフィスへ移り、交流と移行準備に参加しています。" +
          `12月1日の配属予定：${futureDepartment}／${futureRole}。` +
          `転籍後の担当：${futureWork}`;
      } else {
        employee.work =
          `2026年12月1日付で転籍しました。${futureWork}`;
      }
    });

    const cosplay = {
      id: "cosplay",
      name: "コスプレサークル",
      leader: "成瀬 梓",
      members: [
        "成瀬 梓",
        "須藤 花音",
        "宮本 日和"
      ],
      description:
        "女性3名で発足。衣装・小物・メイク・撮影を楽しむ準サークル。",
      activityNote:
        "撮影や顔出しは本人の希望を確認します。" +
        "着替え場所を確保し、作品・衣装・写真の公開範囲にも配慮して活動します。"
    };

    const cosplayIndex = circles.findIndex((circle) => {
      return circle.id === cosplay.id;
    });

    if (cosplayIndex === -1) {
      circles.push(cosplay);
    } else {
      Object.assign(circles[cosplayIndex], cosplay);
    }

    const additions = [
      {
        circleId: "tennis",
        date: "2026-11-18",
        title: "第1回｜まずは、ラリーが続く楽しさから。",
        participants: [
          "瀬戸 朱音",
          "水野 千晴",
          "安藤 菜月",
          "長谷川 祐介",
          "神谷 悠真"
        ],
        comment:
          "初回は5人でコートへ。準備運動の後、" +
          "経験に合わせて打ち方と短いラリーから確認しました。" +
          "後半は組み合わせを替えて練習。" +
          "長谷川さんも役職を離れ、一緒にボールを追いかけていました。" +
          "瀬戸と神谷は転籍前ですが、同じオフィスの仲間として自然に話せる時間になりました。",
        photos: [
          "circle-tennis-01",
          "circle-tennis-02"
        ],
        captions: [
          "5人で準備運動と基本の打ち方を確認。",
          "組み合わせを替えながら、無理のないラリー練習。"
        ]
      },
      {
        circleId: "hotyoga",
        date: "2026-11-19",
        title: "第1回｜仕事から少し離れて、呼吸を整える。",
        participants: [
          "青柳 詩織",
          "久保田 瑞希",
          "大庭 優衣"
        ],
        comment:
          "3人で外部スタジオの初心者向けレッスンに参加しました。" +
          "体調を確認し、水分補給と休憩を取りながら、それぞれのペースで実施。" +
          "終わった後は、同じオフィスに移って感じたことも話しました。" +
          "写真は施設の許可を得て、ほかの利用者が写らない範囲で撮影しています。",
        photos: [
          "circle-hotyoga-01",
          "circle-hotyoga-02"
        ],
        captions: [
          "レッスン前、3人でマットと持ち物を準備。",
          "レッスン後の振り返り。撮影可能な場所で記録しました。"
        ]
      },
      {
        circleId: "boardgame",
        date: "2026-11-20",
        title: "第2回｜勝つために、まずは相談。",
        participants: [
          "森田 美緒",
          "松岡 健介",
          "相馬 健太",
          "吉田 拓海"
        ],
        comment:
          "今回は協力型のゲームを中心に遊びました。" +
          "自分の考えを伝える人、全体を整理する人、" +
          "細かな条件を見つける人と、自然に役割が分かれたのが面白かったです。" +
          "次の一手で意見が割れても、最後は相談して決定。" +
          "仕事とは違う場で、お互いの考え方を知る時間になりました。",
        photos: [
          "circle-boardgame-03",
          "circle-boardgame-04"
        ],
        captions: [
          "ルールを共有し、協力型ゲームを開始。",
          "盤面を囲んで、次の一手を相談。"
        ]
      },
      {
        circleId: "badminton",
        date: "2026-11-21",
        title: "第2回｜前回より、少し長く続いたラリー。",
        participants: [
          "上原 絵里",
          "岡田 航平",
          "杉浦 里奈",
          "藤崎 彩乃"
        ],
        comment:
          "前回のおさらいから始め、短いラリーとダブルスを楽しみました。" +
          "強く打つより、相手が返しやすいところへ打つ練習を中心に実施。" +
          "途中でペアを替え、休憩もしっかり取りました。" +
          "上達を急がず、継続して体を動かせる活動にしていきたいです。",
        photos: [
          "circle-badminton-03",
          "circle-badminton-04"
        ],
        captions: [
          "フォームを確認しながら、ラリーを練習。",
          "ペアを替えてダブルス。無理のない強度で活動しました。"
        ]
      },
      {
        circleId: "belly",
        date: "2026-11-22",
        title: "第4回｜5人のペースで、少しずつ。",
        participants: [
          "小宮 莉子",
          "橘 沙耶",
          "西川 真帆",
          "宮崎 香織",
          "池田 琴葉"
        ],
        comment:
          "今回も5人で参加しました。" +
          "前回の短い振り付けを復習し、腕の動きと重心移動をゆっくり確認。" +
          "小宮と橘さんが動きを分けて説明し、" +
          "それぞれが無理のない範囲でつなげました。" +
          "そろわないところも笑い合いながら、最後は音楽に合わせて一通り。" +
          "池田さんとの会話も増え、12月の転籍前から顔の見える関係ができています。",
        photos: [
          "circle-belly-07",
          "circle-belly-08"
        ],
        captions: [
          "5人で前回の動きを復習。",
          "腕の動きと重心移動を、音楽に合わせて確認。"
        ]
      },
      {
        circleId: "cosplay",
        date: "2026-11-23",
        title: "第1回｜衣装と小物から、好きな世界をつくる。",
        participants: [
          "成瀬 梓",
          "須藤 花音",
          "宮本 日和"
        ],
        comment:
          "女性3人でコスプレサークルを立ち上げました。" +
          "初回は、それぞれ持ち寄った衣装や小物を見ながら、" +
          "色合わせ、簡単な補修、メイクの方向性を相談。" +
          "着替え場所と撮影範囲を確認したうえで、短い撮影も行いました。" +
          "宮本さんも11月の事前交流として参加。" +
          "技術や完成度を競うのではなく、好きな表現を一緒に楽しむ活動にしたいです。",
        photos: [
          "circle-cosplay-01",
          "circle-cosplay-02"
        ],
        captions: [
          "成瀬・須藤・宮本の3人で衣装と小物を準備。",
          "撮影範囲を確認して記念撮影。公開は社内報告の範囲で。"
        ]
      }
    ];

    additions.forEach((report) => {
      const circle = circles.find((item) => {
        return item.id === report.circleId;
      });

      if (!circle) {
        return;
      }

      circle.reportDate = report.date;
      circle.reportTitle = report.title;
      circle.comment = report.comment;
      circle.photos = [...report.photos];
      circle.captions = [...report.captions];
    });

    /*
     * 以前の描画結果から過去の活動記事を維持し、
     * 今回分だけ追加する。
     */
    const previousCircleReports = circleReports;

    function reportMarkup(report) {
      const circle = circles.find((item) => {
        return item.id === report.circleId;
      });

      return `
        <article
          class="card report"
          data-community-report="${report.circleId}-${report.date}"
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

    circleReports = function renderNovemberReports(items) {
      const template = parseMarkup(previousCircleReports(items));
      const ids = new Set(items.map((circle) => circle.id));

      let section = template.content.querySelector("section.section");

      if (!section) {
        section = document.createElement("section");
        section.className = "section";
        template.content.append(section);
      }

      const existingArticles = [
        ...section.querySelectorAll("article.card.report")
      ];

      const extra = additions.filter((report) => {
        return ids.has(report.circleId);
      });

      const addedArticles = extra.map((report) => {
        const item = parseMarkup(reportMarkup(report));
        return item.content.firstElementChild;
      });

      const allArticles = [
        ...existingArticles,
        ...addedArticles
      ];

      function articleDate(article) {
        if (article.dataset.reportDate) {
          return article.dataset.reportDate;
        }

        const match = article.textContent.match(
          /開催日[：:\s]*(\d{4}-\d{2}-\d{2})/
        );

        return match ? match[1] : "";
      }

      allArticles.sort((a, b) => {
        return articleDate(b).localeCompare(articleDate(a));
      });

      section.replaceChildren();

      const heading = document.createElement("div");
      heading.className = "section-top";

      const title = document.createElement("h2");
      title.textContent = "活動の記録";

      heading.append(title);
      section.append(heading);

      if (allArticles.length) {
        allArticles.forEach((article) => {
          section.append(article);
        });
      } else {
        const empty = document.createElement("p");
        empty.className = "note";
        empty.textContent = "開催後に活動報告を掲載します。";
        section.append(empty);
      }

      return template.innerHTML;
    };

    /*
     * プロフィールのひとこと。
     * 既存の趣味写真はそのまま。
     */
    const cosplayComments = {
      naruse:
        "コスプレサークルのサークル長です。" +
        "衣装や小物、写真など、好きな表現を一緒に楽しみたいです。",
      sudo:
        "コスプレサークルに参加しています。" +
        "衣装の色合わせや小物づくりも楽しんでいます。",
      miyamoto:
        "11月からオフィスで交流しています。" +
        "コスプレサークルにも参加し、仕事以外の会話も楽しんでいます。"
    };

    employees.forEach((employee) => {
      if (cosplayComments[employee.id]) {
        employee.message = cosplayComments[employee.id];
      }
    });

    /*
     * 社内ブログ2件。
     * 転籍日前の出来事として記録し、後日も本文は維持。
     */
    const newBlogs = [
      {
        id: "milea-before-transfer",
        date: "2026-11-24",
        category: "オフィスの日常",
        title: "所属が変わる前に、会話が始まりました。",
        author: "黒川 佳澄",
        image: "portal-blog-milea-office",
        excerpt:
          "正式転籍は12月1日。11月から同じオフィスで過ごして見えてきたこと。",
        paragraphs: [
          "ミレアのメンバー11名がCompassOneへ正式に転籍するのは、12月1日です。" +
          "その準備として、11月からオフィスを移し、同じ場所で過ごしています。",

          "まだ所属が変わる前でも、机の近くで相談したり、" +
          "パントリーで短く話したりする時間は少しずつ増えています。" +
          "名前と担当だけでは分からなかった人柄が見えてきました。",

          "サークルへの参加も、そのきっかけの一つです。" +
          "池田さんはベリーダンス、瀬戸さんと神谷さんはテニスへ。" +
          "青柳さんたちはホットヨガ、宮本さんはコスプレの活動にも参加しています。" +
          "もちろん参加は任意で、参加しない人との仕事上の関係も同じように大切です。",

          "一緒にいることと、契約や所属が切り替わることは別です。" +
          "11月中の顧客対応や情報の扱いは、従来の責任と移行時の取り決めを守ります。" +
          "先に同じ場所へ移ったからといって、権限や素材の利用条件まで変わるわけではありません。",

          "12月からは5名がミレアスタジオ事業部へ、6名がそれぞれの専門部署へ。" +
          "別々になるというより、相談できる場所が広がると考えています。" +
          "新しい体制を、顔の見える関係から始められることを心強く感じています。"
        ]
      },
      {
        id: "design-and-code-before-start",
        date: "2026-11-24",
        category: "仕事のつながり",
        title: "その企画、実装の前に一緒に考えませんか。",
        author: "森田 美緒",
        image: "portal-blog-design-code",
        excerpt:
          "完成したデザインを受け取る前に。移行準備の打ち合わせで話したこと。",
        paragraphs: [
          "ミレアの皆さんとの移行準備で、企画と実装の進め方を話す機会がありました。" +
          "最初にそろえたかったのは、「できる・できない」を誰か一人が決めるのではなく、" +
          "何を実現したいかを早めに共有することです。",

          "宮本さんから、デザインが固まった後に実装上の条件が分かり、" +
          "体験を変えざるを得なかった話を聞きました。" +
          "開発側も、完成したものを見て初めて相談されると、" +
          "選べる方法が少なくなってしまいます。",

          "そこで、今回の話し合いでは、顧客情報を含まない画面例を使い、" +
          "何を見せたいか、どんな操作を期待するか、" +
          "どこを固定し、どこは変えられるかを一緒に整理しました。" +
          "正式な開発着手とは分けた、進め方の確認です。",

          "技術者が近くにいることは、無制限に開発を頼めることとは違います。" +
          "必要な工数、担当、優先順位は決める必要があります。" +
          "そのうえで、まだ完成していない案を持ち寄れることには、大きな意味があります。",

          "12月から、ミレア専任ではなく全社の案件に関わるメンバーも増えます。" +
          "専門家を呼ぶ順番を少し早める。" +
          "それだけでも、諦めずに済むアイデアが増えるかもしれません。"
        ]
      }
    ];

    newBlogs.forEach((blog) => {
      const index = blogs.findIndex((item) => item.id === blog.id);

      if (index === -1) {
        blogs.push(blog);
      } else {
        blogs[index] = blog;
      }
    });

    blogs.sort((a, b) => b.date.localeCompare(a.date));

    /*
     * 転籍済みに見えていたミレアのニュースを訂正。
     */
    if (typeof news !== "undefined" && Array.isArray(news)) {
      news.forEach((item) => {
        if (
          item.title ===
          "ミレアスタジオ事業部を新設し、11名の配属を決定しました。"
        ) {
          item.title =
            "12月1日の転籍に向け、ミレア11名の配属予定を決定。";
          item.body =
            "11月からCompassOne内へオフィスを移し、交流と移行準備を進めています。" +
            "正式転籍は12月1日。事業部5名、既存部署6名の配置予定です。";
        }
      });

      const activityTitle =
        "サークル活動報告6件と、社内ブログ2件を掲載しました。";

      if (!news.some((item) => item.title === activityTitle)) {
        news.unshift({
          date: "2026-11-24",
          category: "社内交流",
          title: activityTitle,
          body:
            "テニス・ホットヨガの初回、既存サークルの続報、" +
            "女性3名のコスプレ準サークルの初回を掲載しました。"
        });
      }
    }

    /*
     * 組織資料に時系列を明記。
     */
    if (
      typeof documents !== "undefined" &&
      Array.isArray(documents)
    ) {
      const guide = documents.find((item) => {
        return item.id === "milea-cross-team-guide";
      });

      if (guide) {
        guide.title = transferred
          ? "12月1日付のミレア転籍・配属と相談方法"
          : "12月1日のミレア転籍予定と、11月の移行準備";

        guide.sections.unshift({
          title: "所属・オフィス移転の時系列",
          text:
            "11月からミレアメンバーはCompassOne内へオフィスを移し、" +
            "交流や移行準備、サークル活動に参加しています。" +
            "正式な転籍日は2026年12月1日です。" +
            "以下の配属・組織人数は12月1日以降の体制を示します。" +
            "11月のCompassOneは従業員93名・取締役4名の97名です。"
        });
      }

      const circleGuide = documents.find((item) => {
        return item.id === "circle-guide";
      });

      if (circleGuide) {
        circleGuide.sections.push({
          title: "11月のミレアメンバーの参加",
          text:
            "正式転籍前の交流参加を認める設定です。" +
            "参加記録と雇用上の所属を分けて管理します。" +
            "転籍前参加者への補助の負担先・精算方法は担当者が確認し、" +
            "この画面だけで支給を自動確定しません。"
        });
      }
    }

    /*
     * 意見箱：
     * 投稿者を特定するフィールドは持たせない。
     * 既存の投稿を保持し、固定IDで重複追加を防ぐ。
     */
    const requestedOpinions = [
      {
        id: "opinion-nov2026-benefits",
        category: "福利厚生・サークル",
        title: "サークルに参加しにくい社員も使える補助がほしい",
        body:
          "家庭の都合や通勤時間の関係で、勤務時間外のサークルに参加しにくいです。" +
          "活動を支援する方針には賛成ですが、個人の運動や文化活動にも使える枠、" +
          "短時間やオンラインで参加できる企画も検討してほしいです。" +
          "同じ額を現金で配ってほしいというより、選べる手段があるとうれしいです。",
        createdAt: "2026/11/24 09:10",
        status: "受付"
      },
      {
        id: "opinion-nov2026-office",
        category: "働き方・職場環境",
        title: "座席と会議室の空き状況を確認しやすくしてほしい",
        body:
          "11月から同じオフィスを使うメンバーが増え、出社が重なる日は席を探すことがあります。" +
          "出社予定と座席予約、会議室の空き状況を一か所で確認したいです。" +
          "会議室を押さえたまま使っていない場合の解放ルールや、" +
          "Web会議と集中作業の場所の使い分けも案内してほしいです。",
        createdAt: "2026/11/24 12:40",
        status: "受付"
      },
      {
        id: "opinion-nov2026-storage",
        category: "福利厚生・サークル",
        title: "共用備品の保管場所と撮影時のルールを整えてほしい",
        body:
          "活動が増えると、ラケットやゲーム、衣装・撮影小物の保管場所が必要になりそうです。" +
          "会社購入品と個人所有品を分けて置ける棚と、持ち出し記録があると助かります。" +
          "衣装を使う活動では、着替え場所と撮影可能な範囲を決め、" +
          "写りたくない人や業務中の人が意図せず写らないようにしてほしいです。",
        createdAt: "2026/11/24 16:20",
        status: "受付"
      }
    ];

    const opinionKey = typeof STORAGE !== "undefined"
      ? STORAGE.suggestions
      : "compass.portal.suggestions.v1";

    let opinionMemory = [...requestedOpinions];
    let opinionReadFailed = false;

    try {
      const raw = localStorage.getItem(opinionKey);
      const existing = raw ? JSON.parse(raw) : [];

      if (!Array.isArray(existing)) {
        throw new Error("保存された意見箱データが配列ではありません。");
      }

      const merged = [...existing];

      requestedOpinions.forEach((opinion) => {
        if (!merged.some((item) => item.id === opinion.id)) {
          merged.push(opinion);
        }
      });

      opinionMemory = merged;

      try {
        localStorage.setItem(opinionKey, JSON.stringify(merged));
      } catch (error) {
        console.warn(
          "要望は現在の画面内で表示します。永続保存はできませんでした。",
          error
        );
      }
    } catch (error) {
      opinionReadFailed = true;

      console.warn(
        "既存データを保護するため、意見箱の保存内容は変更しませんでした。",
        error
      );
    }

    function getOpinionsForDisplay() {
      try {
        const raw = localStorage.getItem(opinionKey);
        const parsed = raw ? JSON.parse(raw) : [];

        if (!Array.isArray(parsed)) {
          return opinionMemory;
        }

        const result = [...parsed];

        opinionMemory.forEach((opinion) => {
          if (!result.some((item) => item.id === opinion.id)) {
            result.push(opinion);
          }
        });

        return result;
      } catch {
        return opinionMemory;
      }
    }

    const previousSuggestion = renderSuggestion;

    renderSuggestion = function renderSuggestionWithAdminInbox() {
      const original = previousSuggestion();

      if (currentUser.id !== "nishimura") {
        return original;
      }

      const opinions = getOpinionsForDisplay();

      return `
        ${original}

        <section class="section">
          <div class="section-top">
            <h2>管理者用・寄せられた要望</h2>
            <span class="tag">${opinions.length}件</span>
          </div>

          <p class="note">
            このブラウザー内の登録内容です。
            他の端末とは共有されません。投稿者名は記録していません。
          </p>

          ${
            opinionReadFailed
              ? `
                <p class="notice">
                  保存済みデータの読み込みに問題がありました。
                  既存データは変更せず、今回追加した要望を表示しています。
                </p>
              `
              : ""
          }

          <div class="grid-2">
            ${opinions.slice().reverse().map((opinion) => `
              <article class="card">
                <span class="tag">
                  ${escapeText(opinion.category || "その他")}
                </span>
                <span class="tag">
                  ${escapeText(opinion.status || "受付")}
                </span>

                <h3>${escapeText(opinion.title || "")}</h3>

                <p style="white-space: pre-wrap;">${escapeText(
                  opinion.body || ""
                )}</p>

                <p class="note">
                  ${escapeText(opinion.createdAt || "")}
                </p>
              </article>
            `).join("")}
          </div>
        </section>
      `;
    };

    /*
     * 元のポータルはrenderersに関数を保持しているため、
     * 更新後の関数を明示的に同期する。
     *
     * これにより管理者ホームの挨拶、
     * サークル制度の説明、意見箱の管理者一覧を反映。
     */
    if (typeof renderers !== "undefined") {
      renderers.home = renderHome;
      renderers.circles = renderCircles;
      renderers.suggestion = renderSuggestion;
    }
  }

  window[UPDATE_KEY] = true;

  if (isCorporate) {
    route(true);
  }

  if (isPortal && loggedIn) {
    renderRoute(false);
  }
})();