// File: security-team-update-2026.js

/*
 * CompassONE
 * 2026年11月1日付 セキュリティ・社内IT室発足
 *
 * 外部採用：
 * 橘 沙耶／CISO兼セキュリティ・社内IT室長
 *
 * 社内異動：
 * 榎本 理央／社内IT・認証基盤担当
 *
 * 前提：
 * index.html の既存スクリプトと
 * team-update-2026.js の後に読み込む。
 *
 * 人員：
 * 従業員93名、役員5名、合計98名。
 * 榎本理央は既存社員の異動のため増員に含めない。
 *
 * 追加画像：
 * すべて assets フォルダ内。
 * 拡張子は大文字の .PNG。
 *
 * プロフィール：縦4:5
 * people-tachibana-saya.PNG
 * people-enomoto.PNG
 *
 * 個人インタビュー：横3:2
 * interview-tachibana-saya-01.PNG
 * interview-tachibana-saya-02.PNG
 * interview-enomoto-01.PNG
 * interview-enomoto-02.PNG
 *
 * 年齢や詳細な人物設定は公開プロフィールに表示しない。
 */

(() => {
  "use strict";

  const UPDATE_KEY = "__compassOneSecurityTeam2026Applied";

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
      "セキュリティ室の更新を開始できません。" +
      "index.htmlの既存スクリプトより後に読み込んでください。"
    );

    return;
  }

  const securityMembers = [
    {
      id: "tachibana-saya",
      name: "橘 沙耶",
      reading: "たちばな さや",
      ageAtNovember2026: 31,
      department: "セキュリティ・社内IT室",
      role: "CISO兼室長",
      category: "management",
      color: "#ecd7b7",
      label: "CISO MESSAGE",
      joinedAt: "2026-11-01",
      appointmentLabel: "2026年11月1日 中途入社",
      title: "相談は気軽に。判断は、曖昧にしない。",
      intro:
        "アメリカで育ち、外資系フィンテック企業の日本法人で" +
        "情報セキュリティ責任者を務めてきた橘沙耶。" +
        "2026年11月、CompassONEのCISOとして入社しました。" +
        "明るく率直な対話と、根拠を持って判断する姿勢。" +
        "その両方で、相談しやすく、信頼できるセキュリティ組織を目指します。",
      background:
        "アメリカで育ち、日英両言語での業務調整を経験。" +
        "前職の外資系フィンテック企業では、日本法人の情報セキュリティ責任者として、" +
        "アクセス制御、リスク評価、監査対応、海外本社との調整を担当。",
      responsibility:
        "社長直轄のCISOとして、セキュリティ方針とリスク判断を統括。" +
        "SSO、アクセス元制限、FIDO2セキュリティキー、" +
        "端末管理の強化を、現場の業務と両立させながら推進する。",
      questions: [
        "入社にあたり、まず大切にしたいことは？",
        "経営陣に、意見の修正を求めることもありますか？",
        "社員が気軽に相談できる組織にするには？"
      ],
      answers: [
        "まずは皆さんの名前と、普段どんな仕事をしているかを知りたいです。" +
        "肩書きを見て話し方を変えるより、" +
        "「いま何に困っていますか？」と聞くところから始めたいですね。" +
        "アメリカで育った影響もあるのか、" +
        "分からないことを聞いたり、考えを言葉にしたりすることへの抵抗は少ないです。" +
        "ただ、明るく声をかけるだけで信頼されるとは思っていません。" +
        "相談してくれたことに、きちんと返す。" +
        "その積み重ねを大切にしたいです。",

        "もちろんあります。社長の案だから通す、という判断はしません。" +
        "でも、相手を否定したいわけでもありません。" +
        "何を実現したいのかを確認して、" +
        "そのまま進めた場合のリスクと、代わりに取れる方法を整理してお伝えします。" +
        "外資系で厳しく求められたのは、" +
        "強く言うことではなく、事実と根拠を持って説明することでした。" +
        "「ここは変えましょう。その目的なら、こちらの方法で進められます」と、" +
        "役職にかかわらず落ち着いて話せる存在でありたいです。",

        "「こんなことを聞いたら怒られるかな」と思わせないことです。" +
        "怪しいリンクを開いたかもしれない、キーが見当たらない。" +
        "そういうときこそ、早く声をかけてほしいです。" +
        "連絡してくれたら、まずは「教えてくれてありがとう」から始めます。" +
        "もちろん、確認すべきことや改善点は曖昧にしません。" +
        "話しやすさと、基準の厳しさは両立できると思っています。" +
        "榎本さんと一緒に、困ったときに顔が浮かぶチームをつくりたいですね。"
      ],
      interviewScenes: [
        {
          id: "interview-tachibana-saya-01",
          alt:
            "明るい表情で、社員との対話とセキュリティへの考えを話す橘沙耶",
          caption:
            "「まずは名前を覚えるところから」。肩書きより先に、一人ひとりの仕事を知りたい。"
        },
        {
          id: "interview-tachibana-saya-02",
          alt:
            "会議室で資料を示しながら、リスクと代替策を落ち着いて説明する橘沙耶",
          caption:
            "意見は率直に、判断は冷静に。経営にも、根拠と代替策をセットで伝える。"
        }
      ]
    },
    {
      id: "enomoto",
      name: "榎本 理央",
      reading: "えのもと りお",
      ageAtNovember2026: 28,
      department: "セキュリティ・社内IT室",
      role: "社内IT・認証基盤担当",
      category: "corporate",
      color: "#cddfd8",
      label: "INTERNAL CHALLENGE",
      appointmentDate: "2026-11-01",
      appointmentLabel: "2022年中途入社／2026年11月1日 社内公募により異動",
      title: "安全な仕組みを、毎日使える仕組みに。",
      intro:
        "クラウドソリューション部で顧客環境の運用を担当してきた榎本理央。" +
        "社内公募に自ら手を挙げ、2026年11月に新設された" +
        "セキュリティ・社内IT室へ異動しました。" +
        "落ち着いた説明と運用経験を生かし、" +
        "社員が安心して働ける日常を支えます。",
      background:
        "IT運用会社で企業向けヘルプデスクと端末管理を経験し、2022年に入社。" +
        "クラウドソリューション部では、顧客のアカウント・権限管理、" +
        "監視設定、運用手順の整備を担当。",
      responsibility:
        "SSOと認証基盤の運用、セキュリティキーの登録・失効、" +
        "端末管理、入退社・異動時のアクセス管理、" +
        "社内IT問い合わせ対応を担当する。",
      questions: [
        "社内公募に立候補した理由は？",
        "新しいルールを運用するとき、大切にしたいことは？",
        "橘さんと、どんなチームをつくりたいですか？"
      ],
      answers: [
        "お客様の環境では手順をそろえていても、" +
        "社内では「詳しいあの人に聞けば分かる」で進んでいることがありました。" +
        "それ自体が悪いわけではないですが、" +
        "人が増えるほど、誰かの記憶に頼るやり方は難しくなります。" +
        "これまでのヘルプデスクとクラウド運用の経験を、" +
        "今度は一緒に働く人のために使いたいと思い、立候補しました。",

        "正常に使えるときだけでなく、困ったときの動きまで決めることです。" +
        "セキュリティキーをなくしたら誰に連絡するのか。" +
        "入社初日にログインできなかったら、どう確認するのか。" +
        "ルールだけ渡して、あとは頑張ってください、にはしたくありません。" +
        "ただし、急いでいるから確認を省くのではなく、" +
        "確認を守りながら早く解決できる手順をつくりたいです。",

        "橘さんは、こちらが言葉を整理している途中でも" +
        "「それ、もう少し聞かせて」と受け止めてくれる方です。" +
        "話しやすい一方で、判断するときは理由がはっきりしています。" +
        "私は社員の困りごとや、運用して初めて分かることを拾って、" +
        "判断に必要な材料を渡していきたいです。" +
        "自分だけで抱え込まないことも、新しい役割では意識したいですね。" +
        "親切な誰かに頼るのではなく、チームとして応えられる状態を目指します。"
      ],
      interviewScenes: [
        {
          id: "interview-enomoto-01",
          alt:
            "社内公募に立候補した理由について、落ち着いた表情で話す榎本理央",
          caption:
            "顧客の環境を支えてきた経験を、今度は一緒に働く仲間のために生かす。"
        },
        {
          id: "interview-enomoto-02",
          alt:
            "セキュリティキーと案内資料を前に、社員支援の進め方を説明する榎本理央",
          caption:
            "キーを渡すだけでは終わらない。困った日の手順まで含めて、使える仕組みにする。"
        }
      ]
    }
  ];

  /*
   * 再登録時に重複しないよう、同じIDのデータを除去。
   */

  securityMembers.forEach((person) => {
    const existingIndex = members.findIndex((member) => {
      return member.id === person.id;
    });

    if (existingIndex !== -1) {
      members.splice(existingIndex, 1);
    }
  });

  /*
   * 社長の直後に2名を配置。
   * その他の既存メンバーの順序は維持。
   */

  const presidentIndex = members.findIndex((member) => {
    return member.id === "nishimura";
  });

  const insertionIndex = presidentIndex === -1
    ? 0
    : presidentIndex + 1;

  members.splice(insertionIndex, 0, ...securityMembers);

  securityMembers.forEach((member) => {
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

  const securityMemberMap = new Map(
    securityMembers.map((member) => {
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

  function updateMemberCountCopy(root) {
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
        .replace(/(?:12|16)人/g, `${members.length}人`)
        .replace(/全(?:12|16)名/g, `全${members.length}名`);
    });
  }

  function updateCompanyCounts(root) {
    const stats = root.querySelectorAll("#about .stats .stat");

    if (stats.length >= 3) {
      const totalValue = stats[1].querySelector("strong");
      const totalLabel = stats[1].querySelector("span");
      const hiresValue = stats[2].querySelector("strong");
      const hiresLabel = stats[2].querySelector("span");

      if (totalValue) {
        totalValue.innerHTML = `
          98<small>名</small>
        `;
      }

      if (totalLabel) {
        totalLabel.textContent = "従業員93名・役員5名";
      }

      if (hiresValue) {
        hiresValue.innerHTML = `
          ＋5<small>名</small>
        `;
      }

      if (hiresLabel) {
        hiresLabel.textContent = "2026年10〜11月の追加中途採用";
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
        "98名（従業員93名・役員5名）"
      );

      const lineBreak = document.createElement("br");

      const date = document.createElement("span");
      date.className = "note";
      date.textContent = "2026年11月1日付";

      content.append(count, lineBreak, date);
    });
  }

  function addSecurityNews(root) {
    const list = root.querySelector(".news-list");

    if (!list) {
      return;
    }

    const article = document.createElement("article");
    article.className = "news-item";

    const time = document.createElement("time");
    time.dateTime = "2026-11-01";
    time.textContent = "2026.11.01";

    const tag = document.createElement("span");
    tag.className = "news-tag";
    tag.textContent = "COMPANY";

    const content = document.createElement("div");
    content.className = "news-copy";

    const heading = document.createElement("h3");
    const link = document.createElement("a");

    link.href = "#interview/tachibana-saya";
    link.textContent =
      "セキュリティ・社内IT室を新設。CISOに橘沙耶が就任。";

    heading.append(link);

    const description = document.createElement("p");
    description.textContent =
      "外部採用の橘沙耶と、社内公募で選出した榎本理央が着任。" +
      "安心して働ける環境づくりを進めます。";

    content.append(heading, description);
    article.append(time, tag, content);

    list.prepend(article);
  }

  function addSecurityFilter(root) {
    const groups = root.querySelectorAll(".filters");

    groups.forEach((group) => {
      if (!group.querySelector("[data-person-filter]")) {
        return;
      }

      if (group.querySelector("[data-security-team-filter]")) {
        return;
      }

      const button = document.createElement("button");
      button.className = "filter-button";
      button.type = "button";
      button.dataset.securityTeamFilter = "true";
      button.setAttribute("aria-pressed", "false");
      button.textContent = "セキュリティ・社内IT";

      group.append(button);
    });
  }

  function finalizeListing(template) {
    updateMemberCountCopy(template.content);
    addSecurityFilter(template.content);

    return template.innerHTML;
  }

  renderHome = function renderHomeWithSecurityTeam() {
    const template = parseMarkup(previousRenderHome());

    updateCompanyCounts(template.content);
    addSecurityNews(template.content);

    return finalizeListing(template);
  };

  renderInterviews = function renderInterviewsWithSecurityTeam() {
    const template = parseMarkup(previousRenderInterviews());

    return finalizeListing(template);
  };

  renderOffice = function renderOfficeWithSecurityTeamCount() {
    const template = parseMarkup(previousRenderOffice());

    updateMemberCountCopy(template.content);

    return template.innerHTML;
  };

  renderInterview = function renderSecurityInterview(id) {
    const template = parseMarkup(previousRenderInterview(id));
    const member = securityMemberMap.get(id);

    updateMemberCountCopy(template.content);

    if (!member) {
      return template.innerHTML;
    }

    const profile = template.content.querySelector(".story-profile");

    if (profile) {
      const appointment = document.createElement("p");

      appointment.className = "note space-top";
      appointment.textContent = member.appointmentLabel;

      profile.append(appointment);
    }

    const intro = template.content.querySelector(".story-intro");

    if (intro) {
      const section = document.createElement("section");
      section.className = "card space-top";
      section.setAttribute(
        "aria-label",
        `${member.name}の経歴と担当業務`
      );

      const label = document.createElement("span");
      label.className = "eyebrow";
      label.textContent = "BACKGROUND & ROLE";

      const backgroundTitle = document.createElement("h3");
      backgroundTitle.textContent = "これまでの経験";

      const background = document.createElement("p");
      background.textContent = member.background;

      const roleTitle = document.createElement("h3");
      roleTitle.className = "space-top";
      roleTitle.textContent = "CompassONEで担うこと";

      const responsibility = document.createElement("p");
      responsibility.textContent = member.responsibility;

      section.append(
        label,
        backgroundTitle,
        background,
        roleTitle,
        responsibility
      );

      intro.insertAdjacentElement("afterend", section);
    }

    return template.innerHTML;
  };

  /*
   * 新設部門の専用フィルター。
   *
   * 既存の分類：
   * 橘沙耶は「経営」にも表示。
   * 榎本理央は「コーポレート」にも表示。
   */

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const securityButton = event.target.closest(
      "[data-security-team-filter]"
    );

    const normalButton = event.target.closest(
      "[data-person-filter]"
    );

    if (normalButton) {
      const group = normalButton.closest(".filters");
      const special = group?.querySelector(
        "[data-security-team-filter]"
      );

      if (special) {
        special.setAttribute("aria-pressed", "false");
      }

      return;
    }

    if (!securityButton) {
      return;
    }

    const group = securityButton.closest(".filters");
    const grid = document.getElementById("people-grid");
    const counter = document.getElementById("person-count");

    if (!group || !grid) {
      return;
    }

    group.querySelectorAll(".filter-button").forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button === securityButton)
      );
    });

    const selected = members.filter((member) => {
      return member.department === "セキュリティ・社内IT室";
    });

    const large = grid.dataset.cardStyle === "large";

    grid.innerHTML = selected.map((member) => {
      return memberCard(member, large);
    }).join("");

    hydratePhotos(grid);

    if (counter) {
      counter.textContent =
        `${large ? "STORIES" : "MEMBERS"} / ${selected.length}`;
    }
  });

  if (typeof pageDescriptions !== "undefined") {
    pageDescriptions.interviews =
      `代表の西村直樹をはじめとする${members.length}人のインタビュー。` +
      "CISOの橘沙耶、社内IT担当の榎本理央も加わり、" +
      "それぞれの仕事への向き合い方を紹介します。";
  }

  window[UPDATE_KEY] = true;

  route(true);
})();