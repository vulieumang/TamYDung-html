
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('telegram-activity-feed');
    if (!container) return;

    // Show loading state
    container.innerHTML = '<div style="text-align:center; padding: 20px; font-size: 1.2rem;">Đang tải hoạt động mới nhất từ Tâm Y Dung...</div>';

    const CHANNEL_URL = 'https://t.me/s/tamydung';
    // Using allorigins.win as a CORS proxy. 
    // Alternative: 'https://corsproxy.io/?' + encodeURIComponent(CHANNEL_URL)
    // api.allorigins.win/get?url=... returns JSON with 'contents' property containing the string body.
    const PROXY_URL = 'https://api.allorigins.win/get?url=' + encodeURIComponent(CHANNEL_URL);

    fetch(PROXY_URL)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const htmlContent = data.contents;
            if (!htmlContent) throw new Error('No content received');
            parseAndRender(htmlContent);
        })
        .catch(error => {
            console.error('Error fetching Telegram feed:', error);
            container.innerHTML = '<div style="text-align:center; padding: 20px; color: red;">Không thể tải hoạt động lúc này. Vui lòng truy cập <a href="https://t.me/tamydung" target="_blank">Kênh Telegram</a> để xem thêm.</div>';
        });

    function parseAndRender(htmlString) {
        // Create a dummy DOM to parse the string
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const messageWraps = doc.querySelectorAll('.tgme_widget_message_wrap');
        const posts = [];

        // Loop backwards to get newest first, though Telegram page usually lists them in order.
        // The public preview page usually has older at top? No, it's a feed. 
        // Actually t.me/s/channel loads a set of messages. 
        // We will iterate all matches and take the last 20 (which are usually the newest visible on the static snapshot).

        // Convert NodeList to Array and reverse to process newest first (if checking strictly)
        // Typically they appear in chronological order in the DOM.
        // So the last elements are the newest.
        const msgArray = Array.from(messageWraps).reverse();

        for (const wrap of msgArray) {
            if (posts.length >= 20) break;

            try {
                // Find image
                const photoWrap = wrap.querySelector('.tgme_widget_message_photo_wrap');
                let imageUrl = '';
                if (photoWrap) {
                    const style = photoWrap.getAttribute('style');
                    if (style) {
                        const match = style.match(/background-image:url\('([^']+)'\)/);
                        if (match) imageUrl = match[1];
                    }
                }

                // Skip if no image (per user requirement "những bài có thumnail")
                if (!imageUrl) continue;

                // Find Text
                const textDiv = wrap.querySelector('.tgme_widget_message_text');
                let rawText = textDiv ? textDiv.innerHTML : '';
                // Simple cleanup
                rawText = rawText.replace(/<br\s*\/?>/gi, '\n')
                    .replace(/<[^>]*>/g, ''); // strip tags

                // Decode entities basics
                const txt = document.createElement('textarea');
                txt.innerHTML = rawText;
                const decodedText = txt.value.trim();

                // Find URL
                let postUrl = '';
                const dateLink = wrap.querySelector('.tgme_widget_message_date');
                if (dateLink) postUrl = dateLink.href;

                // Find Date
                let dateStr = '';
                const timeTag = wrap.querySelector('time');
                if (timeTag) {
                    const dt = timeTag.getAttribute('datetime');
                    if (dt) {
                        const d = new Date(dt);
                        dateStr = d.toLocaleDateString('vi-VN') + ' ' + d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
                    }
                }

                // Prepare Title/Desc
                const lines = decodedText.split('\n').filter(l => l.trim().length > 0);
                let title = lines.length > 0 ? lines[0] : 'Hoạt động Tâm Y Dung';
                // Limit title length
                if (title.length > 100) title = title.substring(0, 100) + '...';

                let desc = lines.length > 1 ? lines.slice(1).join(' ') : decodedText;
                if (desc.length > 200) desc = desc.substring(0, 200) + '...';

                posts.push({
                    title,
                    desc,
                    image: imageUrl,
                    url: postUrl,
                    date: dateStr
                });

            } catch (err) {
                console.warn('Error parsing a telegram message:', err);
            }
        }

        renderPosts(posts);
    }

    function renderPosts(posts) {
        if (posts.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding: 20px;">Không có hoạt động nào mới.</div>';
            return;
        }

        const html = posts.map(post => `
            <div class="action-content">
               <div class="action-content__left">
                  <h1 class="action-name">${post.title}</h1>
                  <p class="action-time">${post.date}</p>
                  <p class="action-desc">${post.desc}</p>
                  <div class="actions">
                     <a href="${post.url}" target="_blank"><button class="btn action-btn primary">Chi tiết</button></a>
                  </div>
               </div>
               <div class="action-content__right">
                  <img class="action-content__img" src="${post.image}" alt="${post.title.replace(/"/g, '&quot;')}" loading="lazy">
               </div>
            </div>
        `).join('');

        container.innerHTML = html;
    }
});
