// File: portal-admin-update.js

/*
 * CompassONE 社内ポータル更新
 *
 * ・管理者用ワンクリック入室
 * ・管理者表示：西村直樹
 * ・既存の通常ログインは維持
 * ・ベリーダンス部の活動報告を2回分に変更
 *
 * 実際の認証、IP確認、権限付与は行いません。
 * 公開された架空サイト向けの画面演出です。
 *
 * 読み込み位置：
 * portal.html内の既存スクリプトより後。
 *
 * 第1回写真：既存ファイルを使用
 * assets/circle-belly-01.PNG
 * assets/circle-belly-02.PNG
 *
 * 第2回写真：追加
 * assets/circle-belly-03.PNG
 * assets/circle-belly-04.PNG
 *
 * すべて横3:2、大文字の .PNG。
 */

(() => {
  "use strict";

  const UPDATE_KEY = "__compassPortalAdminUpdateApplied";
  const ADMIN_SESSION_KEY = "compass.portal.adminEntry.v1";

  if (window[UPDATE_KEY]) {
    return;
  }

  if (
    typeof currentUser === "undefined" ||
    typeof circles === "undefined" ||
    typeof circleReports !== "function" ||
    typeof renderHome !== "function" ||
    typeof renderRoute !== "function" ||
    typeof openPortal !== "function" ||
    typeof loggedIn === "undefined"
  ) {
    console.error(
      "ポータル更新を開始できません。" +
      "portal.htmlの既存スクリプトより後に読み込んでください。"
    );

    return;
  }

  window[UPDATE_KEY] = true;

  const normalUser = {
    id: "komiya",
    employeeId: "C025",
    name: "小宮 莉子",
    department: "コーポレート部"
  };

  const administrator = {
    id: "nishimura",
    employeeId: "C001",
    name: "西村 直樹",
    department: "経営"
  };

  let adminMode = false;
  let entering = false;

  function readAdminSession() {
    try {
      return sessionStorage.getItem(ADMIN_SESSION_KEY) === "active";
    } catch {
      return false;
    }
  }

  function writeAdminSession(active) {
    try {
      if (active) {
        sessionStorage.setItem(ADMIN_SESSION_KEY, "active");
      } else {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
      }
    } catch {
      // 保存できない場合も、現在の画面では利用可能。
    }
  }

  function applyIdentity(asAdministrator) {
    adminMode = asAdministrator;

    Object.assign(
      currentUser,
      asAdministrator ? administrator : normalUser
    );

    const userLabel = document.querySelector(
      ".topbar-right .user-label"
    );

    if (userLabel) {
      userLabel.textContent = asAdministrator
        ? "西村 直樹さん｜管理者"
        : "小宮 莉子さん";
    }

    const status = document.querySelector(
      ".topbar-right .status-pill"
    );

    if (status) {
      status.textContent = asAdministrator
        ? "ADMINISTRATOR"
        : "INTERNAL PORTAL";
    }
  }

  /*
   * ホームの挨拶をログイン表示に合わせる。
   * ブログ著者などの「小宮莉子」は変更しない。
   */

  const originalRenderHome = renderHome;

  renderHome = function renderHomeWithAdministrator() {
    const template = document.createElement("template");
    template.innerHTML = originalRenderHome();

    if (adminMode) {
      const greeting = template.content.querySelector(".welcome h1");

      if (greeting) {
        greeting.innerHTML = greeting.innerHTML.replace(
          "小宮さん",
          "西村さん"
        );
      }

      const eyebrow = template.content.querySelector(
        ".welcome .eyebrow"
      );

      if (eyebrow) {
        eyebrow.textContent = "ADMINISTRATOR WORKSPACE";
      }
    }

    return template.innerHTML;
  };

  /*
   * ベリーダンス部：
   * 所属表示は3名。
   * 活動報告は各回の実参加者で表示する。
   */

  const belly = circles.find((circle) => {
    return circle.id === "belly";
  });

  let bellyReports = [];

  if (belly) {
    belly.members = [
      "小宮 莉子",
      "橘 沙耶",
      "西川 真帆"
    ];

    bellyReports = [
      {
        ...belly,
        reportDate: "2026-11-06",
        reportTitle: "第2回｜西川さんが加わって、3人で。",
        members: [
          "小宮 莉子",
          "橘 沙耶",
          "西川 真帆"
        ],
        comment:
          "今回は西川さんが初参加し、3人で活動しました。" +
          "まずはストレッチと姿勢の確認から始め、" +
          "小宮と橘さんで基礎動作をゆっくり紹介。" +
          "後半は短い動きを音楽に合わせてつなぎました。" +
          "覚える速さよりも、無理なく楽しめることを大切にしています。",
        photos: [
          "circle-belly-03",
          "circle-belly-04"
        ],
        captions: [
          "小宮・橘・西川の3人で、基礎動作を確認。",
          "初心者のペースに合わせ、短い振り付けに挑戦しました。"
        ]
      },
      {
        ...belly,
        reportDate: "2026-11-04",
        reportTitle: "第1回｜まずは経験者2人で、ゆっくり再開。",
        members: [
          "小宮 莉子",
          "橘 沙耶"
        ],
        comment:
          "初回は小宮と橘さんの2名で参加しました。" +
          "大学時代のサークルの話をしながら、" +
          "ストレッチと基本の姿勢、重心移動を確認。" +
          "久しぶりの動きも無理をせず、音楽に合わせて少しずつ。" +
          "初心者が加わったときに楽しめる内容や、" +
          "活動の進め方も相談しました。",
        photos: [
          "circle-belly-01",
          "circle-belly-02"
        ],
        captions: [
          "小宮莉子と橘沙耶の2人で、姿勢と基礎動作を確認。",
          "音楽に合わせて練習しながら、次回の内容も相談。"
        ]
      }
    ];

    /*
     * サークル本体の代表情報も最新回へ更新。
     * circles配列には同じ部を重複登録しない。
     */

    belly.reportDate = bellyReports[0].reportDate;
    belly.reportTitle = bellyReports[0].reportTitle;
    belly.comment = bellyReports[0].comment;
    belly.photos = [...bellyReports[0].photos];
    belly.captions = [...bellyReports[0].captions];
  }

  const originalCircleReports = circleReports;

  circleReports = function renderExpandedCircleReports(items) {
    const expanded = items.flatMap((circle) => {
      if (circle.id === "belly" && bellyReports.length) {
        return bellyReports;
      }

      return [circle];
    });

    expanded.sort((a, b) => {
      return b.reportDate.localeCompare(a.reportDate);
    });

    return originalCircleReports(expanded);
  };

  /*
   * 宮崎さんの紹介から、参加済みと読める一文だけを変更。
   * 趣味欄のベリーダンスは、興味のある活動として維持。
   */

  if (typeof employees !== "undefined") {
    const miyazaki = employees.find((employee) => {
      return employee.id === "miyazaki";
    });

    if (miyazaki) {
      miyazaki.message =
        "仕事の小さな困りごとも、気軽に相談してください。" +
        "趣味の話を聞くのも楽しみにしています。";
    }
  }

  /*
   * 管理者入室ボタンと認証進行表示を追加。
   */

  const style = document.createElement("style");

  style.textContent = `
    .admin-entry {
      margin-top: 26px;
      padding-top: 23px;
      border-top: 1px solid var(--line);
    }

    .admin-entry .button {
      color: var(--ink);
      border-color: var(--lime);
      background: var(--lime);
    }

    .admin-entry-label {
      display: block;
      margin-bottom: 11px;
      color: var(--muted);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
    }

    .admin-progress {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 30px;
      margin: 12px 0 0;
      color: var(--green);
      font-size: 12px;
    }

    .admin-progress-dot {
      width: 9px;
      height: 9px;
      flex: 0 0 9px;
      border-radius: 50%;
      background: var(--green);
      animation: admin-entry-pulse 0.8s ease-in-out infinite alternate;
    }

    @keyframes admin-entry-pulse {
      from {
        opacity: 0.3;
      }
      to {
        opacity: 1;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .admin-progress-dot {
        animation: none;
      }
    }
  `;

  document.head.append(style);

  const authCard = document.querySelector(".auth-card");
  const connectionPanel = document.getElementById("connection-panel");

  if (!authCard || !connectionPanel) {
    console.error("管理者入室ボタンの配置先が見つかりません。");
    return;
  }

  const entry = document.createElement("section");
  entry.className = "admin-entry";

  entry.innerHTML = `
    <span class="admin-entry-label">ADMINISTRATOR ACCESS</span>

    <button
      class="button full"
      id="admin-one-click"
      type="button"
    >
      管理者として入室 →
    </button>

    <div
      class="admin-progress"
      id="admin-progress"
      role="status"
      aria-live="polite"
      hidden
    >
      <span class="admin-progress-dot" aria-hidden="true"></span>
      <span id="admin-progress-text"></span>
    </div>
  `;

  connectionPanel.insertAdjacentElement("afterend", entry);

  const adminButton = document.getElementById("admin-one-click");
  const progress = document.getElementById("admin-progress");
  const progressText = document.getElementById("admin-progress-text");

  function wait(milliseconds) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, milliseconds);
    });
  }

  function setOtherAuthControlsDisabled(disabled) {
    document.querySelectorAll(
      "#login-form input, " +
      "#login-form button, " +
      "#mfa-form input, " +
      "#mfa-form button, " +
      "#enter-portal"
    ).forEach((element) => {
      element.disabled = disabled;
    });
  }

  function resetAdminEntry() {
    adminButton.disabled = false;
    adminButton.textContent = "管理者として入室 →";
    progress.hidden = true;
    progressText.textContent = "";
  }

  adminButton.addEventListener("click", async () => {
    if (entering) {
      return;
    }

    entering = true;
    adminButton.disabled = true;
    adminButton.textContent = "アクセスを確認しています";
    progress.hidden = false;

    setOtherAuthControlsDisabled(true);

    try {
      progressText.textContent = "管理者アクセスを確認しています…";
      await wait(450);

      progressText.textContent = "接続元ポリシーを確認しています…";
      await wait(450);

      progressText.textContent = "認証完了。ポータルを開いています…";
      await wait(350);

      applyIdentity(true);
      writeAdminSession(true);

      document.getElementById("login-form").reset();
      document.getElementById("mfa-form").reset();

      /*
       * 管理者ボタンからはホームへ入る。
       * 通常のポータル内移動では既存ルーティングを使用。
       */

      if (location.hash !== "#home") {
        location.hash = "home";
      }

      openPortal();

      if (typeof showToast === "function") {
        showToast("西村 直樹さん、管理者として入室しました。");
      }
    } catch (error) {
      console.error("管理者入室処理で問題が発生しました。", error);

      if (typeof showToast === "function") {
        showToast("入室できませんでした。もう一度お試しください。");
      }
    } finally {
      entering = false;
      setOtherAuthControlsDisabled(false);
      resetAdminEntry();
    }
  });

  /*
   * 通常ログインを選んだ場合は小宮アカウントに戻す。
   * 既存のログイン処理は変更しない。
   */

  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", () => {
    if (entering) {
      return;
    }

    writeAdminSession(false);
    applyIdentity(false);
  });

  /*
   * ログアウトで管理者表示の記録も解除する。
   * 有給申請などの保存内容は削除しない。
   */

  document.getElementById("logout").addEventListener("click", () => {
    writeAdminSession(false);
    applyIdentity(false);
    resetAdminEntry();
  });

  /*
   * 同じタブで再読み込みした場合、
   * 既存ポータルのログイン状態と管理者表示を合わせる。
   */

  if (loggedIn) {
    applyIdentity(readAdminSession());
    renderRoute(false);
  } else {
    writeAdminSession(false);
    applyIdentity(false);
  }
})();