/**
 * Minne AI Sales Chatbot Widget (v0.4.0)
 * Standalone embeddable widget for website public storefronts.
 * Size: < 20KB, Zero external dependencies.
 */
(function () {
    "use strict";

    // 1. Detect current script configuration
    var script = document.currentScript || (function () {
        var scripts = document.getElementsByTagName("script");
        return scripts[scripts.length - 1];
    })();

    var hubUrl = (script && script.getAttribute("data-hub-url")) || (function () {
        if (script && script.src) {
            var a = document.createElement("a");
            a.href = script.src;
            return a.protocol + "//" + a.host;
        }
        return window.location.protocol + "//" + window.location.host;
    })();

    var primaryColor = (script && script.getAttribute("data-primary")) || "#2563eb";
    var widgetTitle = (script && script.getAttribute("data-title")) || "Trợ Lý Bán Hàng AI";
    var proactiveDelay = parseInt((script && script.getAttribute("data-proactive-delay")) || "15", 10);
    var position = (script && script.getAttribute("data-position")) || "bottom-right";

    var storageKey = "minne_chat_session_id";
    var sessionId = sessionStorage.getItem(storageKey);
    var isOpen = false;
    var proactiveShown = false;

    // 2. Inject CSS
    var cssId = "minne-widget-css";
    if (!document.getElementById(cssId)) {
        var link = document.createElement("link");
        link.id = cssId;
        link.rel = "stylesheet";
        link.href = hubUrl + "/static/widget.css";
        document.head.appendChild(link);
    }

    // Set custom primary color
    var styleEl = document.createElement("style");
    styleEl.innerHTML = ":root { --mn-primary: " + primaryColor + "; }";
    document.head.appendChild(styleEl);

    // 3. Create DOM Elements
    // Launcher Button
    var launcher = document.createElement("button");
    launcher.className = "minne-widget-launcher";
    launcher.setAttribute("aria-label", "Mở chat tư vấn AI");
    launcher.innerHTML = [
        '<svg viewBox="0 0 24 24">',
        '  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.1 21.9a1 1 0 001.2 1.2l4.9-1.238A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 01-4.062-1.111l-.29-.172-3.08.777.777-3.08-.172-.29A7.952 7.952 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>',
        '</svg>',
        '<div class="minne-widget-badge"></div>'
    ].join("");

    if (position === "bottom-left") {
        launcher.style.right = "auto";
        launcher.style.left = "24px";
    }

    // Proactive tooltip bubble
    var proactiveBubble = document.createElement("div");
    proactiveBubble.className = "minne-widget-proactive";
    if (position === "bottom-left") {
        proactiveBubble.style.right = "auto";
        proactiveBubble.style.left = "24px";
    }
    proactiveBubble.innerHTML = [
        '<div style="flex: 1;">',
        '  <strong>Chào anh/chị! 👋</strong><br/>',
        '  Em là trợ lý AI Alphatech. Em có thể tư vấn chọn máy POS và gửi báo giá ưu đãi ngay ạ!',
        '</div>',
        '<button class="minne-widget-proactive-close">&times;</button>'
    ].join("");
    proactiveBubble.style.display = "none";

    // Chat Window Container
    var container = document.createElement("div");
    container.className = "minne-widget-container";
    if (position === "bottom-left") {
        container.style.right = "auto";
        container.style.left = "24px";
        container.style.transformOrigin = "bottom left";
    }
    container.style.display = "none";
    container.innerHTML = [
        '<div class="minne-widget-header">',
        '  <div class="minne-widget-header-info">',
        '    <div class="minne-widget-avatar">AI</div>',
        '    <div>',
        '      <div class="minne-widget-header-title">' + widgetTitle + '</div>',
        '      <div class="minne-widget-header-sub"><span class="minne-widget-dot-online"></span> Sẵn sàng tư vấn 24/7</div>',
        '    </div>',
        '  </div>',
        '  <div class="minne-widget-actions">',
        '    <button class="minne-widget-btn-icon" id="minne-btn-minimize" title="Thu nhỏ">',
        '      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
        '    </button>',
        '  </div>',
        '</div>',
        '<div class="minne-widget-messages" id="minne-messages"></div>',
        '<div class="minne-widget-footer">',
        '  <div class="minne-input-row">',
        '    <input type="text" class="minne-chat-input" id="minne-input" placeholder="Hỏi giá, thông số kỹ thuật máy POS..." />',
        '    <button class="minne-send-btn" id="minne-btn-send">',
        '      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',
        '    </button>',
        '  </div>',
        '  <div class="minne-branding">Cung cấp bởi <a href="https://minne.alphatech.ai.vn" target="_blank">Minne AI Sales Control Plane</a></div>',
        '</div>'
    ].join("");

    document.body.appendChild(launcher);
    document.body.appendChild(proactiveBubble);
    document.body.appendChild(container);

    var messagesEl = container.querySelector("#minne-messages");
    var inputEl = container.querySelector("#minne-input");
    var sendBtn = container.querySelector("#minne-btn-send");
    var minimizeBtn = container.querySelector("#minne-btn-minimize");
    var proactiveClose = proactiveBubble.querySelector(".minne-widget-proactive-close");

    // 4. Logic & Event Handlers
    function toggleChat() {
        isOpen = !isOpen;
        if (isOpen) {
            container.style.display = "flex";
            launcher.style.display = "none";
            proactiveBubble.style.display = "none";
            inputEl.focus();
            if (!sessionId) {
                initSession();
            } else {
                loadHistory();
            }
        } else {
            container.style.display = "none";
            launcher.style.display = "flex";
        }
    }

    launcher.addEventListener("click", toggleChat);
    minimizeBtn.addEventListener("click", toggleChat);
    proactiveBubble.addEventListener("click", function (e) {
        if (e.target === proactiveClose) return;
        toggleChat();
    });
    proactiveClose.addEventListener("click", function (e) {
        e.stopPropagation();
        proactiveBubble.style.display = "none";
    });

    // Proactive trigger timer
    if (proactiveDelay > 0) {
        setTimeout(function () {
            if (!isOpen && !proactiveShown) {
                proactiveBubble.style.display = "flex";
                proactiveShown = true;
            }
        }, proactiveDelay * 1000);
    }

    // Helpers to render messages
    function appendMessage(role, text, time, citations) {
        var msgDiv = document.createElement("div");
        msgDiv.className = "minne-msg " + role;

        var bubble = document.createElement("div");
        bubble.className = "minne-bubble";
        bubble.innerHTML = formatMarkdown(text);
        msgDiv.appendChild(bubble);

        if (citations && citations.length > 0) {
            var citeDiv = document.createElement("div");
            citeDiv.className = "minne-citations";
            citations.forEach(function (c) {
                var span = document.createElement("span");
                span.className = "minne-cite-tag";
                span.textContent = "📄 " + (c.anchor || "Tài liệu");
                citeDiv.appendChild(span);
            });
            msgDiv.appendChild(citeDiv);
        }

        var timeSpan = document.createElement("span");
        timeSpan.className = "minne-msg-time";
        timeSpan.textContent = time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        msgDiv.appendChild(timeSpan);

        messagesEl.appendChild(msgDiv);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return msgDiv;
    }

    function appendQuickReplies(replies) {
        if (!replies || replies.length === 0) return;
        var wrap = document.createElement("div");
        wrap.className = "minne-quick-replies";
        replies.forEach(function (r) {
            var chip = document.createElement("button");
            chip.className = "minne-quick-chip";
            chip.textContent = r;
            chip.addEventListener("click", function () {
                inputEl.value = r;
                sendMessage();
                wrap.remove();
            });
            wrap.appendChild(chip);
        });
        messagesEl.appendChild(wrap);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function appendLeadCaptureCard() {
        // Prevent multiple cards
        if (messagesEl.querySelector(".minne-lead-card")) return;

        var card = document.createElement("div");
        card.className = "minne-lead-card";
        card.innerHTML = [
            '<div class="minne-lead-title">📞 Đăng Ký Tư Vấn & Nhận Báo Giá Ưu Đãi</div>',
            '<div class="minne-lead-form">',
            '  <input type="text" class="minne-input" id="mn-lead-name" placeholder="Họ và tên của anh/chị" />',
            '  <input type="tel" class="minne-input" id="mn-lead-phone" placeholder="Số điện thoại (Zalo) *" required />',
            '  <input type="text" class="minne-input" id="mn-lead-note" placeholder="Nhu cầu: POS F&B, Bán lẻ, Dược..." />',
            '  <button class="minne-btn-submit" id="mn-lead-submit">Gửi Thông Tin Cho Chuyên Viên &rarr;</button>',
            '</div>'
        ].join("");

        var submitBtn = card.querySelector("#mn-lead-submit");
        submitBtn.addEventListener("click", function () {
            var name = card.querySelector("#mn-lead-name").value.trim();
            var phone = card.querySelector("#mn-lead-phone").value.trim();
            var note = card.querySelector("#mn-lead-note").value.trim();

            if (!phone) {
                alert("Vui lòng nhập Số điện thoại để chuyên viên liên hệ ạ!");
                card.querySelector("#mn-lead-phone").focus();
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = "Đang ghi nhận...";

            fetch(hubUrl + "/api/chat/lead-capture", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    session_id: sessionId,
                    name: name,
                    phone: phone,
                    note: note,
                    page_url: window.location.href,
                    utm: extractUtmParams()
                })
            })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data.ok) {
                    card.innerHTML = '<div style="color: #15803d; font-weight: 600; font-size: 12px; text-align: center; padding: 6px;">✅ ' + (data.message || 'Đã gửi thành công!') + '</div>';
                } else {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Thử lại";
                    alert(data.detail || "Có lỗi xảy ra, vui lòng thử lại.");
                }
            })
            .catch(function () {
                submitBtn.disabled = false;
                submitBtn.textContent = "Thử lại";
                alert("Không thể kết nối máy chủ. Vui lòng kiểm tra lại mạng.");
            });
        });

        messagesEl.appendChild(card);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showTypingIndicator() {
        var typingDiv = document.createElement("div");
        typingDiv.className = "minne-msg assistant minne-typing-wrap";
        typingDiv.innerHTML = '<div class="minne-bubble minne-typing"><div class="minne-typing-dot"></div><div class="minne-typing-dot"></div><div class="minne-typing-dot"></div></div>';
        messagesEl.appendChild(typingDiv);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return typingDiv;
    }

    function formatMarkdown(text) {
        if (!text) return "";
        var escaped = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        return escaped
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/\n/g, "<br/>");
    }

    function extractUtmParams() {
        var params = {};
        var search = window.location.search.substring(1);
        if (search) {
            var pairs = search.split("&");
            pairs.forEach(function (p) {
                var parts = p.split("=");
                var key = decodeURIComponent(parts[0]);
                if (key.startsWith("utm_") || key === "ref" || key === "source") {
                    params[key] = decodeURIComponent(parts[1] || "");
                }
            });
        }
        return params;
    }

    // 5. API Communications
    function initSession() {
        fetch(hubUrl + "/api/chat/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                page_url: window.location.href,
                page_title: document.title,
                referrer: document.referrer,
                utm: extractUtmParams()
            })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.ok) {
                sessionId = data.session_id;
                sessionStorage.setItem(storageKey, sessionId);
                loadHistory(data.quick_replies);
            }
        })
        .catch(function (err) {
            console.warn("Minne chat session init error:", err);
        });
    }

    function loadHistory(defaultReplies) {
        if (!sessionId) return;
        fetch(hubUrl + "/api/chat/history/" + encodeURIComponent(sessionId))
        .then(function (res) { return res.json(); })
        .then(function (data) {
            messagesEl.innerHTML = "";
            if (data.ok && data.messages && data.messages.length > 0) {
                data.messages.forEach(function (m) {
                    appendMessage(m.role, m.body, new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
                });
            }
            if (defaultReplies) {
                appendQuickReplies(defaultReplies);
            }
        })
        .catch(function (err) {
            console.warn("Load chat history error:", err);
        });
    }

    function sendMessage() {
        var text = inputEl.value.trim();
        if (!text) return;
        inputEl.value = "";

        appendMessage("customer", text);
        var typing = showTypingIndicator();

        fetch(hubUrl + "/api/chat/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                session_id: sessionId,
                message: text,
                page_url: window.location.href,
                utm: extractUtmParams()
            })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            typing.remove();
            if (data.ok) {
                appendMessage("assistant", data.reply, null, data.citations);
                if (data.suggest_lead_form) {
                    appendLeadCaptureCard();
                }
            } else {
                appendMessage("assistant", "Dạ kết nối đang gián đoạn một chút. Anh/chị vui lòng thử lại sau giây lát nhé ạ!");
            }
        })
        .catch(function () {
            typing.remove();
            appendMessage("assistant", "Không thể gửi tin nhắn. Vui lòng kiểm tra lại mạng!");
        });
    }

    // Bind Enter key and Send button
    sendBtn.addEventListener("click", sendMessage);
    inputEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

})();
