/* Inspira projects and boards are stored entirely in this browser. */
const STORAGE_KEY = 'moodboard.projects.v1';
const THEME_KEY = 'moodboard.theme.v1';
const PROFILE_KEY = 'moodboard.profile.v1';
const CATEGORIES = ['Интерьер', 'Мода', 'Графический дизайн', 'UI/UX', 'Брендинг', 'Фотография', 'Другое'];
const FONTS = ["Georgia, serif", 'Arial, sans-serif', "'Trebuchet MS', sans-serif", "'Courier New', monospace"];
const CATEGORY_IMAGE_SETS = {
	'Интерьер': ['photo-1616486338812-3dadae4b4ace', 'photo-1600210492486-724fe5c67fb0', 'photo-1600607687939-ce8a6c25118c', 'photo-1618221195710-dd6b41faaea6', 'photo-1600566753086-00f18fb6b3ea'],
	'Мода': ['photo-1539109136881-3be0616acf4b', 'photo-1483985988355-763728e1935b', 'photo-1529139574466-a303027c1d8b', 'photo-1485230895905-ec40ba36b9bc', 'photo-1523398002811-999ca8dec234'],
	'Графический дизайн': ['photo-1544816155-12df9643f363', 'photo-1541701494587-cb58502866ab', 'photo-1550859492-d5da9d8e45f3', 'photo-1634017839464-5c339ebe3cb4', 'photo-1513364776144-60967b0f800f'],
	'UI/UX': ['photo-1559028012-481c04fa702d', 'photo-1551650975-87deedd944c3', 'photo-1558655146-9f40138edfeb', 'photo-1545235617-9465d2a55698', 'photo-1498050108023-c5249f4df085'],
	'Брендинг': ['photo-1557683316-973673baf926', 'photo-1618005182384-a83a8bd57fbe', 'photo-1549490349-8643362247b5', 'photo-1618556450994-a6a128ef0d9d', 'photo-1541701494587-cb58502866ab'],
	'Фотография': ['photo-1500530855697-b586d89ba3ee', 'photo-1470770841072-f978cf4d019e', 'photo-1470252649378-9c29740c9fa8', 'photo-1500534623283-312aade485b7', 'photo-1472214103451-9374bd1c798e']
};
const IDEA_BLUEPRINTS = {
	'Интерьер': [
		['Лофт у тихого сада', 'Светлое пространство, натуральный дуб и один выразительный зелёный акцент.', 'Japandi · природная органика', ['дуб', 'свет', 'спокойствие']],
		['Дом на краю света', 'Мягкие ткани, известковые стены и ощущение открытого горизонта.', 'Soft minimal · медленный ритм', ['лен', 'воздух', 'дом']],
		['Квартира в ритме дерева', 'Графичные формы встречаются с тёплой фактурой дерева и камня.', 'Современная классика · фактура', ['дерево', 'камень', 'ритм']],
		['Солнечная кухня', 'Цветная керамика, утренний свет и простые вещи на каждый день.', 'Средиземноморский · тёплый', ['солнце', 'керамика', 'уют']],
		['Ателье в старом доме', 'Старинные детали встречаются с ясной современной мебелью и живыми растениями.', 'New heritage · личная история', ['история', 'дерево', 'зелень']]
	],
	'Мода': [
		['Летний гардероб', 'Лёгкие слои, свободный силуэт и прохладные оттенки городского лета.', 'Editorial · лёгкая форма', ['ткань', 'силуэт', 'лето']],
		['Город после дождя', 'Контраст гладких материалов и мягкой палитры мокрого асфальта.', 'Urban · функциональный', ['город', 'контраст', 'форма']],
		['Тактильная форма', 'Коллекция о движении, натуральной шерсти и честных деталях.', 'Slow fashion · тактильность', ['ткань', 'движение', 'деталь']],
		['Новая классика', 'Знакомые вещи получают свежий масштаб, смелый цвет и точную линию.', 'Modern tailoring · акцент', ['классика', 'линия', 'цвет']],
		['Цвет в движении', 'Выразительные силуэты, смелая палитра и лёгкость спонтанного образа.', 'Color story · свобода', ['цвет', 'образ', 'движение']]
	],
	'Графический дизайн': [
		['Обложка про город', 'Типографика, найденные текстуры и энергия городских маршрутов.', 'Swiss grid · эксперимент', ['типографика', 'ритм', 'город']],
		['Постер «Точки роста»', 'Крупный текст и наивная графика превращают сложную мысль в образ.', 'Expressive · плакат', ['плакат', 'текст', 'форма']],
		['Печатная коллекция', 'Серия открыток с тактильной бумагой и небольшими цветовыми кодами.', 'Print · современный фольклор', ['бумага', 'серия', 'знак']],
		['Сетка без правил', 'Аккуратная типографическая система с намеренно свободной композицией.', 'Editorial · асимметрия', ['сетка', 'воздух', 'контраст']],
		['Цветная мастерская', 'Абстрактные формы и материальные мазки складываются в живой визуальный язык.', 'Art direction · жест', ['форма', 'краска', 'эксперимент']]
	],
	'UI/UX': [
		['Медленные путешествия', 'Спокойный интерфейс планирования маршрутов без лишнего визуального шума.', 'Calm tech · доступность', ['цифровое', 'путь', 'простота']],
		['Тихий fintech', 'Финансовый сервис с понятной иерархией и мягкими цветовыми акцентами.', 'Product design · ясность', ['продукт', 'данные', 'доверие']],
		['Цифровой сад', 'Приложение для заботы о растениях с дружелюбными подсказками и деталями.', 'Organic UI · забота', ['приложение', 'природа', 'ритм']],
		['Архив привычек', 'Личный дневник прогресса, который говорит на языке мягкой типографики.', 'Human-centered · личное', ['дневник', 'текст', 'личное']],
		['Личный цифровой архив', 'Тёплый интерфейс для сохранения заметок, маршрутов и визуальных воспоминаний.', 'Personal product · коллекция', ['интерфейс', 'память', 'цифровое']]
	],
	'Брендинг': [
		['Чайный бренд', 'Упаковка с крупными знаками, травяной палитрой и ощущением ручной работы.', 'Craft · природная графика', ['упаковка', 'знак', 'травы']],
		['Пекарня у дома', 'Тёплая айдентика для локального места встречи с характерной типографикой.', 'Local brand · гостеприимство', ['айдентика', 'еда', 'место']],
		['Косметика из сада', 'Чистые формы, ботанические детали и деликатные цвета для ухода.', 'Botanical · современный', ['уход', 'ботаника', 'чистота']],
		['Знак нового места', 'Гибкая система айдентики, вдохновлённая архитектурой района.', 'Place branding · система', ['город', 'логотип', 'система']],
		['Мастерская выходного дня', 'Небольшой ремесленный бренд с тактильной упаковкой и доброй типографикой.', 'Independent · handmade', ['ремесло', 'упаковка', 'знак']]
	],
	'Фотография': [
		['Свет после дождя', 'Кинематографичная серия с отражениями, мягким зерном и прохладным светом.', 'Film · городская поэзия', ['свет', 'плёнка', 'город']],
		['Тёплые тени', 'Предметные кадры о фактурах и солнце в тихом домашнем интерьере.', 'Still life · тактильность', ['предмет', 'солнце', 'фактура']],
		['Прогулка в июне', 'Неспешная история о природе, движении и долгом летнем дне.', 'Outdoor · наблюдение', ['природа', 'путь', 'лето']],
		['Натюрморт каждого дня', 'Обычные предметы превращаются в графичные композиции и маленькие истории.', 'Art direction · простота', ['натюрморт', 'форма', 'деталь']],
		['Зелёная сторона города', 'Свет, листва и архитектура в спокойной серии о городских прогулках.', 'Urban nature · наблюдение', ['листва', 'город', 'свет']]
	]
};
const IDEA_PALETTES = [
	['#788a72', '#d4c4a3', '#f0ebdf', '#a9674a', '#394e3c'],
	['#d17b5a', '#e6c8a5', '#526775', '#e8e4d7', '#31352f'],
	['#b8a1bc', '#d6b58e', '#758a83', '#f0e9dc', '#4c4942'],
	['#4d6f74', '#d1ddce', '#e3a777', '#f3eee5', '#313f40']
];
const DEMO_CREATORS = ['Mira K.', 'Studio Forma', 'Nora Vale', 'Atelier 08', 'Dani R.', 'North Objects'];
const IDEA_LIBRARY = Object.entries(IDEA_BLUEPRINTS).flatMap(([category, ideas], categoryIndex) => ideas.map((idea, ideaIndex) => ({
	id: `idea-${categoryIndex}-${ideaIndex}`,
	category,
	title: idea[0],
	description: idea[1],
	style: idea[2],
	tags: idea[3],
	image: `https://images.unsplash.com/${CATEGORY_IMAGE_SETS[category][ideaIndex]}?auto=format&fit=crop&w=760&q=82`,
	colors: IDEA_PALETTES[(categoryIndex + ideaIndex) % IDEA_PALETTES.length],
	creator: DEMO_CREATORS[(categoryIndex + ideaIndex) % DEMO_CREATORS.length]
})));
const views = [...document.querySelectorAll('.view')];
const boardCanvas = document.getElementById('boardCanvas');
const projectModal = document.getElementById('projectModal');
const projectForm = document.getElementById('projectForm');
const toast = document.getElementById('toast');
let projects = loadProjects();
let profile = loadProfile();
let pendingProfilePhoto = '';
let activeProjectId = null;
let selectedItemId = null;
let historyStack = [];
let historyIndex = -1;
let currentZoom = 100;
let toastTimer;
let saveTimer;
let dragState = null;
let favoriteOnly = false;
let pendingIdeaConcept = null;
let activeCommunityCategory = 'Все идеи';
let showSavedIdeasOnly = false;
let savedIdeaIds = loadSavedIdeas();
let ideaChatMode = false;
let chatIdeaDraft = null;

// Reads project data from localStorage and safely recovers from invalid data.
function loadProjects() {
	try {
		const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		return Array.isArray(stored) ? stored : [];
	} catch (error) {
		console.warn('Не удалось прочитать сохранённые проекты:', error);
		return [];
	}
}

// Loads the local designer profile without exposing authentication secrets.
function loadProfile() {
	try {
		const stored = JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null');
		return stored && typeof stored.name === 'string' && typeof stored.email === 'string' ? stored : null;
	} catch (error) {
		console.warn('Не удалось прочитать профиль:', error);
		return null;
	}
}

// Opens the registration form or fills it with the existing local profile.
function openProfileModal() {
	const form = document.getElementById('profileForm');
	form.reset();
	document.getElementById('profileName').value = profile?.name || '';
	document.getElementById('profileEmail').value = profile?.email || '';
	pendingProfilePhoto = profile?.avatar || '';
	document.getElementById('profileHeading').textContent = profile ? 'Твой профиль' : 'Регистрация';
	document.getElementById('profileSubmit').innerHTML = profile ? 'Сохранить профиль <span>↗</span>' : 'Создать профиль <span>↗</span>';
	updateProfilePhotoPreview();
	document.getElementById('profileModal').hidden = false;
	document.getElementById('profileName').focus();
}

// Updates the circular photo preview in the registration form.
function updateProfilePhotoPreview() {
	const image = document.getElementById('profilePhotoPreview');
	const initial = document.getElementById('profilePhotoInitial');
	image.hidden = !pendingProfilePhoto;
	initial.hidden = Boolean(pendingProfilePhoto);
	if (pendingProfilePhoto) image.src = pendingProfilePhoto;
}

// Resizes an uploaded profile image and stores a compact square JPEG preview.
function readProfilePhoto(file) {
	if (!file || !file.type.startsWith('image/')) return;
	const reader = new FileReader();
	reader.onload = () => {
		const image = new Image();
		image.onload = () => {
			const side = Math.min(image.naturalWidth, image.naturalHeight);
			const canvas = document.createElement('canvas');
			canvas.width = 420;
			canvas.height = 420;
			canvas.getContext('2d').drawImage(image, (image.naturalWidth - side) / 2, (image.naturalHeight - side) / 2, side, side, 0, 0, 420, 420);
			pendingProfilePhoto = canvas.toDataURL('image/jpeg', 0.82);
			updateProfilePhotoPreview();
		};
		image.onerror = () => showToast('Не удалось открыть это изображение');
		image.src = reader.result;
	};
	reader.onerror = () => showToast('Не удалось прочитать фотографию');
	reader.readAsDataURL(file);
}

// Saves profile details locally and updates the header avatar.
function saveProfile(event) {
	event.preventDefault();
	const name = document.getElementById('profileName').value.trim();
	const email = document.getElementById('profileEmail').value.trim().toLowerCase();
	if (!name || !email) return;
	const nextProfile = { name, email, avatar: pendingProfilePhoto };
	try {
		localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));
		profile = nextProfile;
		updateProfileButton();
		document.getElementById('profileModal').hidden = true;
		showToast('Профиль сохранён в этом браузере');
	} catch (error) {
		showToast('Не удалось сохранить профиль. Попробуй выбрать фото поменьше.');
	}
}

// Reflects the saved name and optional photo in the top-bar avatar.
function updateProfileButton() {
	const initial = document.getElementById('profileInitial');
	const image = document.getElementById('profileAvatarImage');
	const button = document.querySelector('.avatar-button');
	initial.textContent = profile?.name?.trim().charAt(0).toLocaleUpperCase('ru') || 'М';
	image.hidden = !profile?.avatar;
	if (profile?.avatar) image.src = profile.avatar;
	button.setAttribute('aria-label', profile ? `Профиль: ${profile.name}` : 'Регистрация');
	button.title = profile ? `Профиль: ${profile.name}` : 'Регистрация';
}

// Persists the current project collection in the browser.
function persistProjects() {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
		return true;
	} catch (error) {
		console.error('Не удалось сохранить проекты:', error);
		showToast('Не удалось сохранить. Возможно, закончилось место в браузере.');
		return false;
	}
}

// Switches between the home, projects, editor, and information screens.
function showView(name) {
	const viewId = { home: 'homeView', projects: 'projectsView', editor: 'editorView', about: 'infoView', categories: 'categoriesView', community: 'communityView' }[name] || 'homeView';
	views.forEach((view) => view.classList.toggle('is-visible', view.id === viewId));
	document.querySelectorAll('[data-view-link]').forEach((link) => link.classList.toggle('is-active', link.dataset.viewLink === name));
	if (name === 'projects') renderProjects();
	if (name === 'categories') { renderCategoryExplorer(); renderIdeaCatalog(); }
	if (name === 'community') renderCommunity();
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Opens the project creation form and prepares its default values.
function openProjectModal(category = 'Интерьер') {
	projectForm.reset();
	document.getElementById('newProjectCategory').value = CATEGORIES.includes(category) ? category : 'Интерьер';
	projectModal.hidden = false;
	document.getElementById('newProjectName').focus();
}

// Creates a project record and opens its empty board in the editor.
function createProject(name, category) {
	const project = { id: makeId(), name: name.trim(), category, favorite: false, updatedAt: Date.now(), items: [], palette: [] };
	projects.unshift(project);
	persistProjects();
	openProject(project.id);
	showToast('Проект создан');
}

// Opens a fresh local design conversation.
function openIdeaAssistant() {
	const form = document.getElementById('ideaForm');
	form.reset();
	document.getElementById('ideaChatInput').value = '';
	form.hidden = true;
	ideaChatMode = true;
	chatIdeaDraft = null;
	document.getElementById('ideaChat').hidden = false;
	document.getElementById('ideaResult').hidden = true;
	document.getElementById('ideaModal').hidden = false;
	document.getElementById('ideaChatTranscript').replaceChildren();
	addChatMessage('assistant', 'Привет! Я помогу превратить задумку в визуальную концепцию. Расскажи, что хочешь создать: интерьер, коллекцию одежды, бренд или цифровой продукт?');
	showChatSuggestions();
	document.getElementById('ideaChatInput').focus();
}

// Creates a concept from shared fields so chat and the guided form stay consistent.
function buildIdeaConcept(fields) {
	const paletteByMood = {
		'Спокойное и природное': ['#788a72', '#d4c4a3', '#f0ebdf', '#a9674a', '#394e3c'],
		'Смелое и энергичное': ['#e65b3f', '#f2c94c', '#315b7a', '#f3eee5', '#292923'],
		'Тёплое и уютное': ['#c77b52', '#dfbd93', '#f2e4ca', '#78836a', '#4c3d36'],
		'Чистое и технологичное': ['#75aa9c', '#d2e4de', '#394d56', '#eff1ea', '#ecc56c']
	};
	const concept = { ...fields, palette: paletteByMood[fields.mood] || paletteByMood['Спокойное и природное'] };
	concept.description = `${concept.style} с настроением «${concept.mood.toLocaleLowerCase('ru')}». ${concept.audience ? `Создано для: ${concept.audience}.` : `Направление: ${concept.category.toLocaleLowerCase('ru')}.`} Начни с выразительных фактур, ясной композиции и этой цветовой палитры.`;
	return concept;
}

// Builds a concise concept and a mood-matched palette from the guided form.
function generateIdeaConcept(event) {
	event.preventDefault();
	ideaChatMode = false;
	const concept = buildIdeaConcept({
		category: document.getElementById('ideaCategory').value,
		subject: document.getElementById('ideaSubject').value.trim(),
		mood: document.getElementById('ideaMood').value,
		style: document.getElementById('ideaStyle').value,
		audience: document.getElementById('ideaAudience').value.trim()
	});
	pendingIdeaConcept = concept;
	showIdeaResult(concept);
}

// Adds a text-only chat bubble without interpreting user text as HTML.
function addChatMessage(role, text) {
	const message = document.createElement('div');
	message.className = `chat-message ${role === 'assistant' ? 'assistant-message' : 'user-message'}`;
	if (role === 'assistant') {
		const avatar = document.createElement('span');
		avatar.className = 'chat-avatar';
		avatar.textContent = '✳';
		message.append(avatar);
	}
	const bubble = document.createElement('p');
	bubble.textContent = text;
	message.append(bubble);
	const transcript = document.getElementById('ideaChatTranscript');
	transcript.append(message);
	transcript.scrollTop = transcript.scrollHeight;
}

// Creates contextual quick replies for the first and second chat turns.
function showChatSuggestions(moods = false) {
	const suggestions = document.getElementById('ideaChatSuggestions');
	const choices = moods
		? ['Спокойное и природное', 'Смелое и энергичное', 'Тёплое и уютное', 'Чистое и технологичное']
		: ['Хочу придумать интерьер для небольшого кафе', 'Хочу создать яркую коллекцию одежды', 'Нужен образ для нового бренда', 'Придумай идею для мобильного приложения'];
	suggestions.replaceChildren();
	choices.forEach((choice) => {
		const button = document.createElement('button');
		button.type = 'button';
		button.textContent = choice;
		if (moods) button.dataset.chatMood = choice;
		else button.dataset.chatPrompt = choice;
		suggestions.append(button);
	});
}

// Infers the closest design category from everyday project language.
function inferIdeaCategory(text) {
	const value = text.toLocaleLowerCase('ru');
	const rules = [
		['UI/UX', ['приложен', 'интерфейс', 'сайт', 'цифров', 'ui/ux', 'мобильн']],
		['Брендинг', ['бренд', 'логотип', 'упаковк', 'айдентик']],
		['Графический дизайн', ['плакат', 'постер', 'обложк', 'типограф', 'график']],
		['Фотография', ['фотограф', 'фотосесс', 'съёмк', 'снимк']],
		['Мода', ['мод', 'одежд', 'гардероб', 'коллекц', 'образ']],
		['Интерьер', ['интерьер', 'квартир', 'комнат', 'спальн', 'кухн', 'гостин', 'кафе', 'кофейн', 'ресторан', 'офис', 'магазин', 'пространств', 'заведен', 'салон', 'студия', 'дом']]
	];
	return rules.find(([, keywords]) => keywords.some((keyword) => value.includes(keyword)))?.[0] || 'Другое';
}

// Chooses a suitable style label from the user's free-form description.
function inferIdeaStyle(text) {
	const value = text.toLocaleLowerCase('ru');
	if (/ретро|винтаж|старин/.test(value)) return 'Мягкий ретро';
	if (/смел|ярк|эксперимент|необыч/.test(value)) return 'Яркий эксперимент';
	if (/природ|растени|дерев|натурал|органик/.test(value)) return 'Природная органика';
	if (/редакц|журнал|классик|элегант/.test(value)) return 'Редакционная классика';
	return 'Современный минимализм';
}

// Extracts a short working title from the first chat message.
function makeIdeaSubject(text) {
	const subject = text.replace(/^(привет[,!]?\s*)?(я хочу|хочу|мне нужен|мне нужна|нужен|нужна|создай|придумай|сделай|мне хочется)\s*/i, '').replace(/^(придумать|создать|сделать)\s*/i, '').replace(/[.!?]+$/g, '').trim();
	return (subject || 'Новая идея').slice(0, 64).replace(/^\p{L}/u, (letter) => letter.toLocaleUpperCase('ru'));
}

// Handles one submitted user message and asks a contextual follow-up question.
function handleIdeaChatSubmit(event) {
	event.preventDefault();
	const input = document.getElementById('ideaChatInput');
	const text = input.value.trim();
	if (!text) return;
	input.value = '';
	addChatMessage('user', text);
	if (!chatIdeaDraft) {
		const category = inferIdeaCategory(text);
		chatIdeaDraft = { category, subject: makeIdeaSubject(text), style: inferIdeaStyle(text), audience: '' };
		addChatMessage('assistant', `Поняла: «${chatIdeaDraft.subject}». Это похоже на направление «${category}». Какое настроение ты хочешь передать?`);
		showChatSuggestions(true);
		return;
	}
	chatIdeaDraft.mood = inferIdeaMood(text);
	pendingIdeaConcept = buildIdeaConcept(chatIdeaDraft);
	addChatMessage('assistant', `Для проекта «${pendingIdeaConcept.subject}» я бы начала с направления «${pendingIdeaConcept.style}» и настроения «${pendingIdeaConcept.mood.toLocaleLowerCase('ru')}». Подготовила палитру и стартовую доску ниже. Что-то можно изменить уже в редакторе.`);
	showIdeaSuggestionsForConcept();
	showIdeaResult(pendingIdeaConcept);
}

// Maps a mood reply to one of the assistant's four palette directions.
function inferIdeaMood(text) {
	const value = text.toLocaleLowerCase('ru');
	if (/смел|ярк|энерг|сочн|контраст/.test(value)) return 'Смелое и энергичное';
	if (/тёпл|тепл|уют|мягк|домаш/.test(value)) return 'Тёплое и уютное';
	if (/техно|чист|цифров|строг|минимал/.test(value)) return 'Чистое и технологичное';
	return 'Спокойное и природное';
}

// Replaces mood replies with a link to matching visual references.
function showIdeaSuggestionsForConcept() {
	const suggestions = document.getElementById('ideaChatSuggestions');
	suggestions.replaceChildren();
	const link = document.createElement('a');
	link.className = 'chat-pinterest-link';
	link.href = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(`${pendingIdeaConcept.category} ${pendingIdeaConcept.subject} ${pendingIdeaConcept.style}`)}`;
	link.target = '_blank';
	link.rel = 'noopener noreferrer';
	link.textContent = 'Ещё референсы на Pinterest ↗';
	suggestions.append(link);
}

// Displays the generated concept and its color swatches in the dialog.
function showIdeaResult(concept) {
	document.getElementById('ideaForm').hidden = true;
	document.getElementById('ideaChat').hidden = !ideaChatMode;
	document.getElementById('ideaResult').hidden = false;
	document.getElementById('ideaResultTitle').textContent = concept.subject;
	document.getElementById('ideaResultDescription').textContent = concept.description;
	const palette = document.getElementById('ideaResultPalette');
	palette.replaceChildren();
	concept.palette.forEach((color) => {
		const swatch = document.createElement('span');
		swatch.className = 'idea-result-swatch';
		swatch.style.backgroundColor = color;
		swatch.textContent = color.toUpperCase();
		palette.append(swatch);
	});
}

// Creates an editable board prefilled with a title, design brief, and palette.
function createBoardFromIdea() {
	const concept = pendingIdeaConcept;
	if (!concept) return;
	const project = {
		id: makeId(),
		name: concept.subject,
		category: concept.category,
		favorite: false,
		updatedAt: Date.now(),
		palette: [...concept.palette],
		items: [
			makeItem('text', { x: 76, y: 72, width: 900, height: 82, font: FONTS[0], fontSize: 48, color: '#344b3c', text: concept.subject }),
			makeItem('text', { x: 82, y: 168, width: 860, height: 105, font: FONTS[1], fontSize: 19, color: '#555f53', text: `${concept.category}  /  ${concept.style}\n${concept.mood}${concept.audience ? `  /  ${concept.audience}` : ''}` }),
			...concept.palette.map((color, index) => makeItem('shape', { x: 82 + index * 160, y: 520, width: 122, height: 122, shape: 'rectangle', color }))
		]
	};
	projects.unshift(project);
	persistProjects();
	document.getElementById('ideaModal').hidden = true;
	openProject(project.id);
	showToast('Твоя идея стала основой мудборда');
}

// Loads saved design references from this browser.
function loadSavedIdeas() {
	try {
		const saved = JSON.parse(localStorage.getItem('inspira.saved-ideas.v1') || '[]');
		return Array.isArray(saved) ? saved : [];
	} catch (error) {
		return [];
	}
}

// Saves or removes one reference from the local inspiration board.
function toggleSavedIdea(ideaId) {
	savedIdeaIds = savedIdeaIds.includes(ideaId) ? savedIdeaIds.filter((id) => id !== ideaId) : [...savedIdeaIds, ideaId];
	localStorage.setItem('inspira.saved-ideas.v1', JSON.stringify(savedIdeaIds));
	renderCommunity();
	renderIdeaCatalog();
	renderHomePicks();
	if (!document.getElementById('categoryIdeasModal').hidden) {
		const selectedCategory = CATEGORIES.find((category) => category.toLocaleUpperCase('ru') === document.getElementById('categoryIdeaEyebrow').textContent);
		if (selectedCategory) showCategoryIdeas(selectedCategory);
	}
}

// Builds a reusable reference card with save, search tags, and project actions.
function createIdeaCard(idea) {
	const card = document.createElement('article');
	card.className = 'idea-card';
	const cover = document.createElement('div');
	cover.className = 'idea-card-cover';
	const image = document.createElement('img');
	image.src = idea.image;
	image.alt = `${idea.title}: ${idea.category.toLocaleLowerCase('ru')} референс`;
	image.loading = 'lazy';
	cover.append(image);
	const categoryTag = document.createElement('span');
	categoryTag.className = 'idea-category-label';
	categoryTag.textContent = idea.category;
	cover.append(categoryTag);
	const save = document.createElement('button');
	const isSaved = savedIdeaIds.includes(idea.id);
	save.className = `idea-save-button${isSaved ? ' is-saved' : ''}`;
	save.type = 'button';
	save.textContent = isSaved ? '♥' : '♡';
	save.title = isSaved ? 'Убрать из сохранённых' : 'Сохранить идею';
	save.setAttribute('aria-label', save.title);
	save.setAttribute('aria-pressed', String(isSaved));
	save.addEventListener('click', () => toggleSavedIdea(idea.id));
	cover.append(save);
	const details = document.createElement('div');
	details.className = 'idea-card-details';
	const creator = document.createElement('span');
	creator.className = 'idea-creator';
	creator.textContent = `INSPIRA PICK · ${idea.creator}`;
	const title = document.createElement('h3');
	title.textContent = idea.title;
	const description = document.createElement('p');
	description.textContent = idea.description;
	const tags = document.createElement('div');
	tags.className = 'idea-tags';
	[idea.style, ...idea.tags].forEach((value) => {
		const tag = document.createElement('span');
		tag.textContent = value;
		tags.append(tag);
	});
	const palette = document.createElement('div');
	palette.className = 'idea-card-palette';
	idea.colors.forEach((color) => {
		const swatch = document.createElement('span');
		swatch.style.backgroundColor = color;
		swatch.title = color.toUpperCase();
		palette.append(swatch);
	});
	const actions = document.createElement('div');
	actions.className = 'idea-card-actions';
	const pinterest = document.createElement('a');
	pinterest.className = 'idea-card-pinterest';
	pinterest.href = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(`${idea.category} ${idea.title} design inspiration`)}`;
	pinterest.target = '_blank';
	pinterest.rel = 'noopener noreferrer';
	pinterest.textContent = 'Pinterest ↗';
	const create = document.createElement('button');
	create.className = 'idea-card-create';
	create.type = 'button';
	create.textContent = 'Открыть проект ↗';
	create.addEventListener('click', () => createTemplateProject(idea.id));
	actions.append(pinterest, create);
	details.append(creator, title, description, tags, palette, actions);
	card.append(cover, details);
	return card;
}

// Opens the selected category's large idea and template collection.
function showCategoryIdeas(category) {
	const ideas = IDEA_LIBRARY.filter((idea) => idea.category === category);
	if (!ideas.length) return;
	document.getElementById('categoryIdeaEyebrow').textContent = category.toLocaleUpperCase('ru');
	document.getElementById('categoryIdeasTitle').textContent = `Идеи: ${category}`;
	document.getElementById('categoryIdeasDescription').textContent = `Пять направлений для старта. Выбери понравившееся и настрой детали на своей доске.`;
	document.getElementById('categoryIdeasCount').textContent = `${ideas.length} ИДЕЙ`;
	const grid = document.getElementById('categoryIdeasGrid');
	grid.replaceChildren(...ideas.map(createIdeaCard));
	document.getElementById('categoryIdeasModal').hidden = false;
}

// Renders the large category tiles on the dedicated category page.
function renderCategoryExplorer() {
	const grid = document.getElementById('categoryExplorerGrid');
	grid.replaceChildren();
	CATEGORIES.filter((category) => category !== 'Другое').forEach((category, index) => {
		const tile = document.createElement('button');
		tile.className = `category-explorer-tile explorer-tile-${index + 1}`;
		tile.type = 'button';
		tile.addEventListener('click', () => showCategoryIdeas(category));
		const image = document.createElement('img');
		image.src = CATEGORY_IMAGE_SETS[category][index % 4] ? `https://images.unsplash.com/${CATEGORY_IMAGE_SETS[category][index % 4]}?auto=format&fit=crop&w=800&q=82` : '';
		image.alt = '';
		image.loading = 'lazy';
		const label = document.createElement('span');
		label.textContent = `${String(index + 1).padStart(2, '0')} / ${category}`;
		const count = document.createElement('small');
		count.textContent = `${IDEA_LIBRARY.filter((idea) => idea.category === category).length} ИДЕИ · СМОТРЕТЬ ↗`;
		tile.append(image, label, count);
		grid.append(tile);
	});
}

// Filters and renders the category page's full template library.
function renderIdeaCatalog() {
	const query = document.getElementById('categorySearch')?.value.trim().toLocaleLowerCase('ru') || '';
	const ideas = IDEA_LIBRARY.filter((idea) => `${idea.title} ${idea.category} ${idea.description} ${idea.style} ${idea.tags.join(' ')}`.toLocaleLowerCase('ru').includes(query));
	const grid = document.getElementById('ideaCatalogGrid');
	if (!grid) return;
	grid.replaceChildren(...ideas.map(createIdeaCard));
	document.getElementById('categoryResultCount').textContent = `${ideas.length} КОНЦЕПЦИЙ`;
	document.getElementById('catalogEmpty').hidden = ideas.length > 0;
}

// Renders category and saved-only filters for the designer inspiration feed.
function renderCommunityFilters() {
	const filters = document.getElementById('communityFilters');
	filters.replaceChildren();
	['Все идеи', ...CATEGORIES.filter((category) => category !== 'Другое'), 'Сохранённое'].forEach((category) => {
		const button = document.createElement('button');
		button.type = 'button';
		button.className = `discovery-chip${category === activeCommunityCategory ? ' is-active' : ''}`;
		button.textContent = category;
		button.addEventListener('click', () => {
			activeCommunityCategory = category;
			showSavedIdeasOnly = category === 'Сохранённое';
			renderCommunity();
		});
		filters.append(button);
	});
}

// Searches the designer-only inspiration feed by title, style, category, and tags.
function renderCommunity() {
	const query = document.getElementById('communitySearch')?.value.trim().toLocaleLowerCase('ru') || '';
	const ideas = IDEA_LIBRARY.filter((idea) => {
		const matchesQuery = `${idea.title} ${idea.category} ${idea.description} ${idea.style} ${idea.tags.join(' ')} ${idea.creator}`.toLocaleLowerCase('ru').includes(query);
		const matchesCategory = activeCommunityCategory === 'Все идеи' || activeCommunityCategory === 'Сохранённое' || idea.category === activeCommunityCategory;
		return matchesQuery && matchesCategory && (!showSavedIdeasOnly || savedIdeaIds.includes(idea.id));
	});
	const grid = document.getElementById('communityGrid');
	if (!grid) return;
	grid.replaceChildren(...ideas.map(createIdeaCard));
	document.getElementById('communityResultCount').textContent = `${ideas.length} ИДЕЙ`;
	document.getElementById('communityEmpty').hidden = ideas.length > 0;
	renderCommunityFilters();
}

// Shows a small rotating selection of inspiration ideas on the home page.
function renderHomePicks() {
	const grid = document.getElementById('homePicksGrid');
	if (!grid) return;
	const picks = [IDEA_LIBRARY[0], IDEA_LIBRARY[5], IDEA_LIBRARY[10], IDEA_LIBRARY[17]];
	grid.replaceChildren(...picks.map(createIdeaCard));
}

// Creates a new editable moodboard from one of the curated design references.
function createTemplateProject(ideaId) {
	const idea = IDEA_LIBRARY.find((entry) => entry.id === ideaId);
	if (!idea) return;
	const project = {
		id: makeId(), name: idea.title, category: idea.category, favorite: false, updatedAt: Date.now(), palette: [...idea.colors],
		items: [
			makeItem('text', { x: 72, y: 52, width: 1030, height: 90, font: FONTS[0], fontSize: 48, color: '#344b3c', text: idea.title }),
			makeItem('text', { x: 80, y: 150, width: 1020, height: 95, font: FONTS[1], fontSize: 18, color: '#596057', text: `${idea.category}  /  ${idea.style}\n${idea.description}` }),
			makeItem('shape', { x: 82, y: 330, width: 390, height: 155, shape: 'rectangle', color: idea.colors[0] }),
			makeItem('shape', { x: 510, y: 330, width: 150, height: 155, shape: 'rectangle', color: idea.colors[1] }),
			makeItem('shape', { x: 700, y: 330, width: 150, height: 155, shape: 'circle', color: idea.colors[2] }),
			...idea.colors.map((color, index) => makeItem('shape', { x: 82 + index * 158, y: 550, width: 118, height: 82, shape: 'rectangle', color })),
			makeItem('text', { x: 82, y: 690, width: 960, height: 40, font: FONTS[3], fontSize: 14, color: '#4c5948', text: `${idea.tags.join('  /  ')}     —     INSPIRA PICK` })
		]
	};
	projects.unshift(project);
	persistProjects();
	document.getElementById('categoryIdeasModal').hidden = true;
	openProject(project.id);
	showToast('Проект создан из идеи Inspira. Меняй детали на холсте.');
}

// Makes a unique ID that works in browsers without crypto.randomUUID.
function makeId() {
	return window.crypto?.randomUUID?.() || `p-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// Finds the active project record.
function getActiveProject() {
	return projects.find((project) => project.id === activeProjectId);
}

// Opens a saved project and rebuilds its board elements.
function openProject(projectId) {
	const project = projects.find((entry) => entry.id === projectId);
	if (!project) return;
	activeProjectId = project.id;
	project.items ||= [];
	project.palette ||= [];
	document.getElementById('boardTitle').value = project.name;
	selectedItemId = null;
	historyStack = [];
	historyIndex = -1;
	renderBoard();
	renderPalette();
	updateInspector();
	pushHistory();
	showView('editor');
}

// Updates the active project from editor state and schedules local persistence.
function scheduleSave(message = 'Сохранено локально') {
	const project = getActiveProject();
	if (!project) return;
	project.name = document.getElementById('boardTitle').value.trim() || 'Без названия';
	project.updatedAt = Date.now();
	const status = document.getElementById('saveStatus');
	status.textContent = 'Сохранение…';
	status.classList.add('is-saving');
	clearTimeout(saveTimer);
	saveTimer = setTimeout(() => {
		persistProjects();
		status.textContent = message;
		status.classList.remove('is-saving');
	}, 250);
}

// Saves the active board immediately and confirms the action.
function saveProjectNow() {
	clearTimeout(saveTimer);
	scheduleSave('Сохранено локально');
	persistProjects();
	document.getElementById('saveStatus').textContent = 'Сохранено локально';
	document.getElementById('saveStatus').classList.remove('is-saving');
	showToast('Проект сохранён в этом браузере');
}

// Creates a board item with common transform and appearance fields.
function makeItem(type, values = {}) {
	return { id: makeId(), type, x: 100 + Math.round(Math.random() * 110), y: 100 + Math.round(Math.random() * 90), width: type === 'text' ? 250 : 180, height: type === 'text' ? 70 : 150, rotation: 0, opacity: 100, color: '#d6a27c', font: FONTS[0], fontSize: 30, align: 'left', text: 'Новый текст', src: '', shape: 'rectangle', ...values };
}

// Renders saved board items as draggable DOM elements.
function renderBoard() {
	const project = getActiveProject();
	if (!project) return;
	boardCanvas.replaceChildren();
	boardCanvas.classList.toggle('is-empty', project.items.length === 0);
	project.items.forEach((item) => {
		const element = document.createElement('div');
		element.className = `board-item ${item.type === 'text' ? 'text-item' : ''} ${item.type === 'shape' ? `shape-${item.shape}` : ''}`;
		element.dataset.itemId = item.id;
		element.style.left = `${item.x / 1200 * 100}%`;
		element.style.top = `${item.y / 800 * 100}%`;
		element.style.width = `${item.width / 1200 * 100}%`;
		element.style.height = `${item.height / 800 * 100}%`;
		element.style.transform = `rotate(${item.rotation}deg)`;
		element.style.opacity = item.opacity / 100;
		if (item.type === 'image') {
			const image = document.createElement('img');
			image.src = item.src;
			image.alt = 'Элемент мудборда';
			element.append(image);
		} else if (item.type === 'text') {
			element.contentEditable = 'true';
			element.spellcheck = false;
			element.textContent = item.text;
			element.style.color = item.color;
			element.style.fontFamily = item.font;
			element.style.fontSize = `${item.fontSize}px`;
			element.style.textAlign = item.align;
		} else {
			element.style.backgroundColor = item.color;
			if (item.shape === 'line') element.style.height = '4px';
		}
		if (item.id === selectedItemId) {
			element.classList.add('is-selected');
			const handle = document.createElement('span');
			handle.className = 'resize-handle';
			handle.setAttribute('aria-label', 'Изменить размер');
			element.append(handle);
		}
		boardCanvas.append(element);
	});
	updateInspector();
}

// Adds an item, selects it, records undo history, and saves the board.
function addItem(item) {
	const project = getActiveProject();
	if (!project) return;
	project.items.push(item);
	selectedItemId = item.id;
	renderBoard();
	pushHistory();
	scheduleSave();
}

// Applies a property change to the currently selected item.
function updateSelected(changes, rerender = false) {
	const item = getSelectedItem();
	if (!item) return;
	Object.assign(item, changes);
	if (rerender) renderBoard();
	else applyItemStyles(item);
	scheduleSave();
}

// Returns the currently selected item model.
function getSelectedItem() {
	return getActiveProject()?.items.find((item) => item.id === selectedItemId);
}

// Applies updated properties directly to an existing board element.
function applyItemStyles(item) {
	const element = boardCanvas.querySelector(`[data-item-id="${item.id}"]`);
	if (!element) return;
	element.style.left = `${item.x / 1200 * 100}%`;
	element.style.top = `${item.y / 800 * 100}%`;
	element.style.width = `${item.width / 1200 * 100}%`;
	element.style.height = `${item.height / 800 * 100}%`;
	element.style.transform = `rotate(${item.rotation}deg)`;
	element.style.opacity = item.opacity / 100;
	if (item.type === 'text') {
		element.style.color = item.color;
		element.style.fontFamily = item.font;
		element.style.fontSize = `${item.fontSize}px`;
		element.style.textAlign = item.align;
	} else if (item.type === 'shape') element.style.backgroundColor = item.color;
}

// Selects a board item and refreshes its handles and inspector values.
function selectItem(itemId) {
	selectedItemId = itemId;
	boardCanvas.querySelectorAll('.board-item').forEach((element) => element.classList.toggle('is-selected', element.dataset.itemId === itemId));
	renderBoard();
}

// Synchronizes the property sidebar with the selected item.
function updateInspector() {
	const item = getSelectedItem();
	const empty = document.getElementById('inspectorEmpty');
	const fields = document.getElementById('propertyFields');
	empty.hidden = Boolean(item);
	fields.hidden = !item;
	if (!item) return;
	document.getElementById('selectedType').textContent = item.type === 'image' ? 'ИЗОБРАЖЕНИЕ' : item.type === 'text' ? 'ТЕКСТ' : 'ФИГУРА';
	setInputValue('propWidth', Math.round(item.width));
	setInputValue('propHeight', Math.round(item.height));
	setInputValue('propX', Math.round(item.x));
	setInputValue('propY', Math.round(item.y));
	setInputValue('propRotation', item.rotation);
	setInputValue('propColor', item.color);
	setInputValue('propColorHex', item.color.toUpperCase());
	setInputValue('propOpacity', item.opacity);
	setInputValue('propFont', item.font);
	setInputValue('propFontSize', item.fontSize);
	document.getElementById('rotationValue').textContent = `${item.rotation}°`;
	document.getElementById('opacityValue').textContent = `${item.opacity}%`;
	document.getElementById('colorProperty').hidden = item.type === 'image';
	document.getElementById('textProperties').hidden = item.type !== 'text';
	document.querySelectorAll('[data-align]').forEach((button) => button.classList.toggle('is-active', button.dataset.align === item.align));
}

// Sets a form value only when it is not currently being edited.
function setInputValue(id, value) {
	const input = document.getElementById(id);
	if (document.activeElement !== input) input.value = value;
}

// Records a compact board snapshot for undo and redo.
function pushHistory() {
	const project = getActiveProject();
	if (!project) return;
	const snapshot = JSON.stringify({ items: project.items, palette: project.palette });
	if (historyStack[historyIndex] === snapshot) return;
	historyStack = historyStack.slice(0, historyIndex + 1);
	historyStack.push(snapshot);
	if (historyStack.length > 40) historyStack.shift();
	historyIndex = historyStack.length - 1;
}

// Moves through recorded board snapshots and restores their items and palette.
function travelHistory(direction) {
	const next = historyIndex + direction;
	if (next < 0 || next >= historyStack.length) return;
	historyIndex = next;
	const state = JSON.parse(historyStack[historyIndex]);
	const project = getActiveProject();
	project.items = state.items;
	project.palette = state.palette;
	selectedItemId = null;
	renderBoard();
	renderPalette();
	scheduleSave();
}

// Deletes the selected object from the current board.
function deleteSelected() {
	const project = getActiveProject();
	if (!project || !selectedItemId) return;
	project.items = project.items.filter((item) => item.id !== selectedItemId);
	selectedItemId = null;
	renderBoard();
	pushHistory();
	scheduleSave();
}

// Adds the selected local image file to the board as an embedded data URL.
function addImageFile(file) {
	if (!file || !file.type.startsWith('image/')) return;
	const reader = new FileReader();
	reader.onload = () => addItem(makeItem('image', { src: reader.result, width: 280, height: 205 }));
	reader.onerror = () => showToast('Не удалось прочитать изображение');
	reader.readAsDataURL(file);
}

// Opens the palette inspector tab.
function openPalette() {
	setInspectorTab('palette');
	document.getElementById('newPaletteColor').focus();
}

// Activates the chosen inspector tab.
function setInspectorTab(tabName) {
	document.querySelectorAll('.inspector-tab').forEach((tab) => tab.classList.toggle('is-active', tab.dataset.inspector === tabName));
	document.getElementById('propertiesContent').hidden = tabName !== 'properties';
	document.getElementById('paletteContent').hidden = tabName !== 'palette';
}

// Renders palette swatches with copy and remove actions.
function renderPalette() {
	const project = getActiveProject();
	const palette = project?.palette || [];
	document.getElementById('paletteCount').textContent = palette.length;
	const list = document.getElementById('paletteList');
	list.replaceChildren();
	palette.forEach((color, index) => {
		const row = document.createElement('div');
		row.className = 'palette-swatch';
		const swatch = document.createElement('span');
		swatch.className = 'palette-swatch-color';
		swatch.style.backgroundColor = color;
		const code = document.createElement('button');
		code.className = 'palette-swatch-code';
		code.textContent = color.toUpperCase();
		code.title = 'Скопировать HEX-код';
		code.addEventListener('click', () => copyColor(color));
		const remove = document.createElement('button');
		remove.textContent = '×';
		remove.setAttribute('aria-label', `Удалить цвет ${color}`);
		remove.addEventListener('click', () => removePaletteColor(index));
		row.append(swatch, code, remove);
		list.append(row);
	});
}

// Adds a unique HEX color to the active project's palette.
function addPaletteColor(color = document.getElementById('newPaletteColor').value) {
	const project = getActiveProject();
	if (!project || !/^#[0-9a-f]{6}$/i.test(color)) return;
	if (!project.palette.includes(color.toLowerCase())) project.palette.push(color.toLowerCase());
	renderPalette();
	pushHistory();
	scheduleSave();
}

// Removes one swatch from the active project palette.
function removePaletteColor(index) {
	const project = getActiveProject();
	if (!project) return;
	project.palette.splice(index, 1);
	renderPalette();
	pushHistory();
	scheduleSave();
}

// Copies a HEX value to the clipboard and provides a fallback for older browsers.
async function copyColor(color) {
	try {
		await navigator.clipboard.writeText(color.toUpperCase());
	} catch (error) {
		const temporary = document.createElement('textarea');
		temporary.value = color.toUpperCase();
		document.body.append(temporary);
		temporary.select();
		document.execCommand('copy');
		temporary.remove();
	}
	showToast(`${color.toUpperCase()} скопирован`);
}

// Generates five colors with a shared hue and varied lightness.
function generatePalette() {
	const project = getActiveProject();
	if (!project) return;
	const baseHue = Math.floor(Math.random() * 360);
	const colors = [0, 28, 155, 205, 320].map((offset, index) => hslToHex((baseHue + offset) % 360, index === 2 ? 25 : 32 + index * 5, [73, 58, 84, 43, 66][index]));
	project.palette = colors;
	renderPalette();
	setInspectorTab('palette');
	pushHistory();
	scheduleSave();
}

// Converts an HSL color into a hexadecimal CSS color.
function hslToHex(hue, saturation, lightness) {
	const s = saturation / 100;
	const l = lightness / 100;
	const k = (n) => (n + hue / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const channel = (n) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1)))).toString(16).padStart(2, '0');
	return `#${channel(0)}${channel(8)}${channel(4)}`;
}

// Applies search, category, and favorites filters to the saved project list.
function renderProjects() {
	const search = document.getElementById('projectSearch').value.trim().toLocaleLowerCase('ru');
	const category = document.getElementById('categoryFilter').value;
	const filtered = projects.filter((project) => project.name.toLocaleLowerCase('ru').includes(search) && (category === 'Все категории' || project.category === category) && (!favoriteOnly || project.favorite));
	document.getElementById('projectCount').textContent = projects.length;
	const grid = document.getElementById('projectsGrid');
	grid.replaceChildren();
	filtered.forEach((project, index) => grid.append(createProjectCard(project, index)));
	document.getElementById('emptyProjects').hidden = filtered.length > 0;
}

// Builds a project preview card and its favorite and delete actions.
function createProjectCard(project, index) {
	const card = document.createElement('article');
	card.className = 'project-card';
	card.style.animationDelay = `${Math.min(index * 35, 210)}ms`;
	const cover = document.createElement('div');
	cover.className = 'project-cover';
	cover.tabIndex = 0;
	cover.setAttribute('role', 'button');
	cover.setAttribute('aria-label', `Открыть проект ${project.name}`);
	cover.addEventListener('click', () => openProject(project.id));
	cover.addEventListener('keydown', (event) => { if (event.key === 'Enter') openProject(project.id); });
	const image = project.items.find((item) => item.type === 'image');
	if (image) {
		const preview = document.createElement('img');
		preview.src = image.src;
		preview.alt = '';
		cover.append(preview);
	} else {
		const stack = document.createElement('div');
		stack.className = 'cover-stack';
		const title = document.createElement('span');
		title.textContent = project.name;
		const label = document.createElement('small');
		label.textContent = `${project.category.toUpperCase()} / INSPIRA`;
		stack.append(title, label);
		cover.append(stack);
	}
	const actions = document.createElement('div');
	actions.className = 'project-card-actions';
	const favorite = document.createElement('button');
	favorite.className = project.favorite ? 'is-favorite' : '';
	favorite.textContent = project.favorite ? '★' : '☆';
	favorite.title = project.favorite ? 'Убрать из избранного' : 'В избранное';
	favorite.setAttribute('aria-label', favorite.title);
	favorite.addEventListener('click', (event) => { event.stopPropagation(); toggleFavorite(project.id); });
	const remove = document.createElement('button');
	remove.textContent = '×';
	remove.title = 'Удалить проект';
	remove.setAttribute('aria-label', `Удалить проект ${project.name}`);
	remove.addEventListener('click', (event) => { event.stopPropagation(); deleteProject(project.id); });
	actions.append(favorite, remove);
	cover.append(actions);
	const meta = document.createElement('div');
	meta.className = 'project-meta';
	const details = document.createElement('div');
	const title = document.createElement('h3');
	title.textContent = project.name;
	const date = document.createElement('p');
	date.textContent = `${project.category} · ${formatDate(project.updatedAt)}`;
	details.append(title, date);
	const more = document.createElement('button');
	more.className = 'project-more';
	more.textContent = '↗';
	more.title = 'Открыть проект';
	more.addEventListener('click', () => openProject(project.id));
	meta.append(details, more);
	card.append(cover, meta);
	return card;
}

// Formats a project timestamp as a compact Russian date.
function formatDate(timestamp) {
	return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' }).format(new Date(timestamp));
}

// Toggles favorite state and refreshes the project grid.
function toggleFavorite(projectId) {
	const project = projects.find((entry) => entry.id === projectId);
	if (!project) return;
	project.favorite = !project.favorite;
	persistProjects();
	renderProjects();
}

// Removes a saved project after an explicit confirmation.
function deleteProject(projectId) {
	const project = projects.find((entry) => entry.id === projectId);
	if (!project || !window.confirm(`Удалить проект «${project.name}»?`)) return;
	projects = projects.filter((entry) => entry.id !== projectId);
	persistProjects();
	if (activeProjectId === projectId) activeProjectId = null;
	renderProjects();
	showToast('Проект удалён');
}

// Clears all objects from the board after confirmation.
function clearBoard() {
	const project = getActiveProject();
	if (!project || project.items.length === 0) return showToast('Доска уже пустая');
	if (!window.confirm('Очистить все элементы на доске?')) return;
	project.items = [];
	selectedItemId = null;
	renderBoard();
	pushHistory();
	scheduleSave();
}

// Downloads the current board as a PNG rendered by the Canvas API.
async function downloadBoard() {
	const project = getActiveProject();
	if (!project) return;
	const canvas = document.createElement('canvas');
	canvas.width = 1200;
	canvas.height = 800;
	const context = canvas.getContext('2d');
	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, canvas.width, canvas.height);
	for (const item of project.items) {
		context.save();
		context.globalAlpha = item.opacity / 100;
		context.translate(item.x + item.width / 2, item.y + item.height / 2);
		context.rotate(item.rotation * Math.PI / 180);
		if (item.type === 'image') {
			const image = await loadImage(item.src);
			if (image) context.drawImage(image, -item.width / 2, -item.height / 2, item.width, item.height);
		} else if (item.type === 'shape') {
			context.fillStyle = item.color;
			if (item.shape === 'circle') {
				context.beginPath();
				context.ellipse(0, 0, item.width / 2, item.height / 2, 0, 0, Math.PI * 2);
				context.fill();
			} else context.fillRect(-item.width / 2, -item.height / 2, item.width, item.shape === 'line' ? 4 : item.height);
		} else {
			context.fillStyle = item.color;
			context.font = `${item.fontSize}px ${item.font}`;
			context.textAlign = item.align;
			context.textBaseline = 'top';
			const textX = item.align === 'left' ? -item.width / 2 : item.align === 'right' ? item.width / 2 : 0;
			item.text.split('\n').forEach((line, lineIndex) => context.fillText(line, textX, -item.height / 2 + lineIndex * item.fontSize * 1.25, item.width));
		}
		context.restore();
	}
	const link = document.createElement('a');
	link.download = `${safeFilename(project.name)}.png`;
	link.href = canvas.toDataURL('image/png');
	link.click();
	showToast('Мудборд скачан в формате PNG');
}

// Loads an image into a drawable HTMLImageElement for PNG export.
function loadImage(source) {
	return new Promise((resolve) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = () => { showToast('Одно из изображений не удалось экспортировать'); resolve(null); };
		image.src = source;
	});
}

// Converts a project name to a simple, safe download filename.
function safeFilename(name) {
	return name.trim().replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, '-').slice(0, 60) || 'inspira';
}

// Shows a temporary status message.
function showToast(message) {
	toast.textContent = message;
	toast.classList.add('is-visible');
	clearTimeout(toastTimer);
	toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

// Changes editor zoom while keeping the source board dimensions unchanged.
function setZoom(change) {
	currentZoom = Math.max(50, Math.min(130, currentZoom + change));
	boardCanvas.style.width = `min(${currentZoom}%, 1200px)`;
	boardCanvas.style.transform = `scale(${currentZoom / 100})`;
	document.getElementById('zoomLabel').textContent = `${currentZoom}%`;
}

// Starts pointer-based movement or resizing for a board item.
function startItemPointer(event) {
	const itemElement = event.target.closest('.board-item');
	if (!itemElement) {
		selectedItemId = null;
		renderBoard();
		return;
	}
	const item = getActiveProject()?.items.find((entry) => entry.id === itemElement.dataset.itemId);
	if (!item) return;
	const isResize = event.target.classList.contains('resize-handle');
	if (item.type === 'text' && selectedItemId === item.id && !isResize) return;
	selectedItemId = item.id;
	renderBoard();
	const element = boardCanvas.querySelector(`[data-item-id="${item.id}"]`);
	if (item.type === 'text' && event.target.closest('.text-item') && !isResize) return;
	dragState = { itemId: item.id, isResize, startX: event.clientX, startY: event.clientY, x: item.x, y: item.y, width: item.width, height: item.height, scaleX: boardCanvas.clientWidth / 1200, scaleY: boardCanvas.clientHeight / 800 };
	element?.setPointerCapture?.(event.pointerId);
	event.preventDefault();
}

// Moves or resizes the active item while the pointer is held.
function moveItemPointer(event) {
	if (!dragState) return;
	const item = getActiveProject()?.items.find((entry) => entry.id === dragState.itemId);
	if (!item) return;
	const deltaX = (event.clientX - dragState.startX) / dragState.scaleX;
	const deltaY = (event.clientY - dragState.startY) / dragState.scaleY;
	if (dragState.isResize) {
		item.width = Math.max(20, Math.min(1200 - item.x, dragState.width + deltaX));
		item.height = Math.max(20, Math.min(800 - item.y, dragState.height + deltaY));
	} else {
		item.x = Math.max(0, Math.min(1200 - item.width, dragState.x + deltaX));
		item.y = Math.max(0, Math.min(800 - item.height, dragState.y + deltaY));
	}
	applyItemStyles(item);
	updateInspector();
}

// Commits the finished pointer gesture to history and local storage.
function finishItemPointer() {
	if (!dragState) return;
	dragState = null;
	pushHistory();
	scheduleSave();
}

// Adds a new shape from the available basic geometry options.
function addShape(shape) {
	const dimensions = shape === 'line' ? { width: 180, height: 8 } : { width: 145, height: 145 };
	addItem(makeItem('shape', { shape, color: shape === 'circle' ? '#91a38d' : '#d6a27c', ...dimensions }));
}

// Handles a tool action from the left editor toolbar.
function handleTool(tool) {
	if (tool === 'image') document.getElementById('imageInput').click();
	if (tool === 'text') addItem(makeItem('text'));
	if (tool === 'color') openPalette();
	if (tool === 'font') {
		if (getSelectedItem()?.type === 'text') {
			document.getElementById('propFont').focus();
			setInspectorTab('properties');
		} else showToast('Сначала выбери текстовый элемент');
	}
	if (tool === 'shape') addShape(window.prompt('Фигура: rectangle, circle или line', 'rectangle')?.toLowerCase());
	if (tool === 'delete') deleteSelected();
	if (tool === 'undo') travelHistory(-1);
	if (tool === 'redo') travelHistory(1);
}

// Applies property editor changes to the selected item.
function handlePropertyInput(event) {
	const item = getSelectedItem();
	if (!item) return;
	const { id, value } = event.target;
	if (id === 'propWidth') updateSelected({ width: Math.max(20, Number(value) || 20) }, true);
	if (id === 'propHeight') updateSelected({ height: Math.max(20, Number(value) || 20) }, true);
	if (id === 'propX') updateSelected({ x: Math.max(0, Number(value) || 0) });
	if (id === 'propY') updateSelected({ y: Math.max(0, Number(value) || 0) });
	if (id === 'propRotation') {
		updateSelected({ rotation: Number(value) });
		document.getElementById('rotationValue').textContent = `${value}°`;
	}
	if (id === 'propOpacity') {
		updateSelected({ opacity: Number(value) });
		document.getElementById('opacityValue').textContent = `${value}%`;
	}
	if (id === 'propColor') {
		updateSelected({ color: value });
		document.getElementById('propColorHex').value = value.toUpperCase();
	}
	if (id === 'propColorHex' && /^#[0-9a-f]{6}$/i.test(value)) {
		updateSelected({ color: value });
		document.getElementById('propColor').value = value;
	}
	if (id === 'propFont') updateSelected({ font: value }, true);
	if (id === 'propFontSize') updateSelected({ fontSize: Math.max(8, Number(value) || 8) }, true);
}

// Wires navigation, editor tools, filters, and board interactions.
function initializeApp() {
	if (localStorage.getItem(THEME_KEY) === 'dark') document.body.classList.add('dark-theme');
	updateProfileButton();
	document.querySelectorAll('[data-view-link]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.viewLink)));
	document.querySelectorAll('[data-action="new-board"]').forEach((button) => button.addEventListener('click', () => openProjectModal()));
	document.querySelectorAll('[data-action="idea-open"]').forEach((button) => button.addEventListener('click', openIdeaAssistant));
	document.querySelectorAll('[data-action="profile"]').forEach((button) => button.addEventListener('click', openProfileModal));
	document.querySelectorAll('[data-action="theme"]').forEach((button) => button.addEventListener('click', () => {
		document.body.classList.toggle('dark-theme');
		localStorage.setItem(THEME_KEY, document.body.classList.contains('dark-theme') ? 'dark' : 'light');
	}));
	document.querySelectorAll('[data-tool]').forEach((button) => button.addEventListener('click', () => handleTool(button.dataset.tool)));
	document.querySelectorAll('[data-category]').forEach((button) => button.addEventListener('click', () => showCategoryIdeas(button.dataset.category)));
	document.querySelectorAll('[data-action="close-modal"]').forEach((button) => button.addEventListener('click', () => { projectModal.hidden = true; }));
	projectModal.addEventListener('click', (event) => { if (event.target === projectModal) projectModal.hidden = true; });
	const profileModal = document.getElementById('profileModal');
	profileModal.addEventListener('click', (event) => { if (event.target === profileModal) profileModal.hidden = true; });
	document.querySelectorAll('[data-action="close-profile"]').forEach((button) => button.addEventListener('click', () => { profileModal.hidden = true; }));
	document.getElementById('profileForm').addEventListener('submit', saveProfile);
	document.getElementById('profilePhoto').addEventListener('change', (event) => { readProfilePhoto(event.target.files[0]); event.target.value = ''; });
	const ideaModal = document.getElementById('ideaModal');
	ideaModal.addEventListener('click', (event) => { if (event.target === ideaModal) ideaModal.hidden = true; });
	document.getElementById('ideaChatForm').addEventListener('submit', handleIdeaChatSubmit);
	document.getElementById('ideaChatInput').addEventListener('keydown', (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			document.getElementById('ideaChatForm').requestSubmit();
		}
	});
	document.getElementById('ideaChatSuggestions').addEventListener('click', (event) => {
		const prompt = event.target.closest('[data-chat-prompt]');
		const mood = event.target.closest('[data-chat-mood]');
		if (prompt) {
			document.getElementById('ideaChatInput').value = prompt.dataset.chatPrompt;
			document.getElementById('ideaChatForm').requestSubmit();
		}
		if (mood) {
			document.getElementById('ideaChatInput').value = mood.dataset.chatMood;
			document.getElementById('ideaChatForm').requestSubmit();
		}
	});
	document.getElementById('ideaForm').addEventListener('submit', generateIdeaConcept);
	document.querySelectorAll('[data-action="idea-close"]').forEach((button) => button.addEventListener('click', () => { ideaModal.hidden = true; }));
	document.querySelectorAll('[data-action="idea-back"]').forEach((button) => button.addEventListener('click', () => {
		document.getElementById('ideaResult').hidden = true;
		document.getElementById('ideaChat').hidden = !ideaChatMode;
		document.getElementById('ideaForm').hidden = ideaChatMode;
	}));
	document.querySelectorAll('[data-action="idea-use-quiz"]').forEach((button) => button.addEventListener('click', () => {
		ideaChatMode = false;
		document.getElementById('ideaChat').hidden = true;
		document.getElementById('ideaForm').hidden = false;
	}));
	document.querySelectorAll('[data-action="idea-create"]').forEach((button) => button.addEventListener('click', createBoardFromIdea));
	const categoryIdeasModal = document.getElementById('categoryIdeasModal');
	categoryIdeasModal.addEventListener('click', (event) => { if (event.target === categoryIdeasModal) categoryIdeasModal.hidden = true; });
	document.querySelectorAll('[data-action="close-category-ideas"]').forEach((button) => button.addEventListener('click', () => { categoryIdeasModal.hidden = true; }));
	projectForm.addEventListener('submit', (event) => {
		event.preventDefault();
		createProject(document.getElementById('newProjectName').value, document.getElementById('newProjectCategory').value);
		projectModal.hidden = true;
	});
	document.getElementById('imageInput').addEventListener('change', (event) => { addImageFile(event.target.files[0]); event.target.value = ''; });
	document.getElementById('boardTitle').addEventListener('input', () => scheduleSave());
	document.getElementById('boardTitle').addEventListener('change', () => { const project = getActiveProject(); if (project) project.name = document.getElementById('boardTitle').value.trim() || 'Без названия'; });
	document.querySelectorAll('.inspector-tab').forEach((button) => button.addEventListener('click', () => setInspectorTab(button.dataset.inspector)));
	document.querySelectorAll('[data-action="add-color"]').forEach((button) => button.addEventListener('click', () => addPaletteColor()));
	document.querySelectorAll('[data-action="generate-palette"]').forEach((button) => button.addEventListener('click', generatePalette));
	document.getElementById('projectSearch').addEventListener('input', renderProjects);
	document.getElementById('categoryFilter').addEventListener('change', renderProjects);
	document.getElementById('categorySearch').addEventListener('input', renderIdeaCatalog);
	document.getElementById('communitySearch').addEventListener('input', renderCommunity);
	document.getElementById('clearCommunitySearch').addEventListener('click', () => {
		document.getElementById('communitySearch').value = '';
		renderCommunity();
	});
	document.getElementById('favoritesFilter').addEventListener('click', (event) => {
		favoriteOnly = !favoriteOnly;
		event.currentTarget.classList.toggle('is-active', favoriteOnly);
		event.currentTarget.setAttribute('aria-pressed', String(favoriteOnly));
		renderProjects();
	});
	document.querySelectorAll('[data-action="save-project"]').forEach((button) => button.addEventListener('click', saveProjectNow));
	document.querySelectorAll('[data-action="clear-board"]').forEach((button) => button.addEventListener('click', clearBoard));
	document.querySelectorAll('[data-action="download"]').forEach((button) => button.addEventListener('click', downloadBoard));
	document.getElementById('zoomIn').addEventListener('click', () => setZoom(10));
	document.getElementById('zoomOut').addEventListener('click', () => setZoom(-10));
	boardCanvas.addEventListener('pointerdown', startItemPointer);
	window.addEventListener('pointermove', moveItemPointer);
	window.addEventListener('pointerup', finishItemPointer);
	boardCanvas.addEventListener('input', (event) => {
		const element = event.target.closest('.text-item');
		const item = getSelectedItem();
		if (element && item?.type === 'text') { item.text = element.textContent; scheduleSave(); }
	});
	boardCanvas.addEventListener('blur', (event) => {
		if (event.target.classList.contains('text-item')) pushHistory();
	}, true);
	document.querySelectorAll('#propertyFields input, #propertyFields select').forEach((input) => {
		input.addEventListener('input', handlePropertyInput);
		input.addEventListener('change', pushHistory);
	});
	document.querySelectorAll('[data-align]').forEach((button) => button.addEventListener('click', () => updateSelected({ align: button.dataset.align }, true)));
	document.querySelectorAll('[data-layer]').forEach((button) => button.addEventListener('click', () => {
		const element = boardCanvas.querySelector(`[data-item-id="${selectedItemId}"]`);
		if (!element) return;
		if (button.dataset.layer === 'front') boardCanvas.append(element);
		else boardCanvas.prepend(element);
		const project = getActiveProject();
		const item = project.items.find((entry) => entry.id === selectedItemId);
		project.items = project.items.filter((entry) => entry.id !== selectedItemId);
		if (button.dataset.layer === 'front') project.items.push(item);
		else project.items.unshift(item);
		pushHistory();
		scheduleSave();
	}));
	window.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			projectModal.hidden = true;
			profileModal.hidden = true;
			ideaModal.hidden = true;
			categoryIdeasModal.hidden = true;
		}
		if (event.key === 'Delete' || event.key === 'Backspace') {
			if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) && !document.activeElement.isContentEditable) deleteSelected();
		}
		if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
			event.preventDefault();
			travelHistory(event.shiftKey ? 1 : -1);
		}
	});
	renderProjects();
	renderCategoryExplorer();
	renderIdeaCatalog();
	renderCommunity();
	renderHomePicks();
}

initializeApp();
