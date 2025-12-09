import React from 'react';

// === スタイル定義 ===
const COLORS = {
  primary: 'text-blue-600',
  primaryBg: 'bg-blue-600',
  secondaryBg: 'bg-gray-50',
  border: 'border-gray-200',
};

// === ダミーデータ ===
const dummyData = {
  name: '高山 徹 (Toru Takayama)',
  title: 'プロダクトマネージャー',
  summary: 'Next.jsとVercel AI SDKを用いた先進的なAIプロダクト開発を専門とする。ユーザー体験を最大化する設計と迅速なプロトタイピングを得意とする。',
  contact: {
    email: 'toru.takayama@example.com',
    phone: '090-XXXX-XXXX',
    github: 'github.com/toru-t',
  },
  experiences: [
    {
      company: '株式会社 AI-Drive',
      duration: '2020年4月 - 現在',
      role: 'リードエンジニア / PM',
      achievements: [
        'Vercel AI SDKを利用した音声対話型サービスを開発・ローンチ。ユーザーアクティビティを50%向上。',
        'Next.js App Routerでのマイクロフロントエンド設計を導入し、開発効率を30%改善。',
        'ジュニアエンジニアの育成プログラムを策定し、チーム全体のスキル底上げに貢献。',
      ],
    },
  ],
  skills: [
    { name: 'Next.js', proficiency: 95 },
    { name: 'React', proficiency: 90 },
    { name: 'Tailwind CSS', proficiency: 85 },
    { name: 'JavaScript', proficiency: 80 },
  ],
  aiAssessment: {
    title: '🤖 AIが分析した強み：迅速なプロトタイピング能力',
    summary: '高山氏は、最新の技術スタック（Next.js, Vercel AI SDK）への深い理解と実践力を持つ。特に、音声入力インターフェース設計に関する発言から、**ユーザーフレンドリーな体験設計**への強いコミットメントが確認できる。',
  },
};


// === コンポーネント実装 ===

/**
 * 汎用セクションコンポーネント
 */
const ResumeSection = ({ title, children }) => (
  <div className="mb-6">
    <h2 className={`text-lg font-bold uppercase tracking-wider ${COLORS.primary} pb-1 border-b-2 border-current mb-3`}>
      {title}
    </h2>
    {children}
  </div>
);

/**
 * スキル表示コンポーネント（プログレスバー形式）
 */
const SkillTags = ({ skills }) => (
  <div className="grid grid-cols-2 gap-y-2 gap-x-6">
    {skills.map((skill) => (
      <div key={skill.name} className="flex items-center">
        <span className="w-24 text-sm font-medium mr-3">{skill.name}</span>
        <div className="flex-grow h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className={`h-full ${COLORS.primaryBg}`}
            style={{ width: `${skill.proficiency}%` }}
          ></div>
        </div>
        <span className="text-xs ml-2 text-gray-500">{skill.proficiency}%</span>
      </div>
    ))}
  </div>
);

/**
 * 職務経歴ブロック
 */
const ExperienceBlock = ({ experience }) => (
  <div className="flex mb-4 relative pl-8">
    {/* タイムラインの縦線とドット */}
    <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${COLORS.border}`}>
      <div className={`w-3 h-3 rounded-full ${COLORS.primaryBg} absolute -left-[5px] top-0`}></div>
    </div>
    <div className="flex-grow">
      <p className="text-xs text-gray-500 mb-0.5">{experience.duration}</p>
      <h3 className="text-md font-semibold">{experience.company} - {experience.role}</h3>
      <ul className="list-none p-0 mt-1 space-y-1">
        {experience.achievements.map((item, index) => (
          <li key={index} className="flex items-start text-sm">
            <span className={`w-1.5 h-1.5 mt-1 mr-2 rounded-full ${COLORS.primaryBg} flex-shrink-0`}></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/**
 * AI分析セクション
 */
const AIAssessmentBlock = ({ assessment }) => (
  <div className={`p-4 rounded-lg ${COLORS.secondaryBg}`}>
    <h3 className="text-md font-semibold mb-1 flex items-center">
      {assessment.title}
    </h3>
    <p className="text-sm italic text-gray-700 leading-relaxed">{assessment.summary}</p>
  </div>
);


/**
 * メインレイアウトコンポーネント
 */
export const ResumePreview = ({ data }) => {
  const { name, title, summary, contact, experiences, skills, aiAssessment } = data;

  return (
    // PDFサイズをシミュレートしたコンテナ (A4縦想定)
    <div className="w-[210mm] min-h-[297mm] p-8 mx-auto bg-white shadow-xl font-sans text-gray-800">

      {/* 1. ヘッダー / 基本情報 */}
      <header className="mb-6 pb-2 border-b border-gray-400">
        <h1 className="text-3xl font-extrabold mb-1">{name}</h1>
        <p className={`text-lg font-medium ${COLORS.primary}`}>{title}</p>
        <p className="text-sm mt-2 text-gray-600">{summary}</p>
        <div className="flex space-x-4 text-xs mt-3 text-gray-500">
          <span>{contact.email}</span>
          <span>{contact.phone}</span>
          <span>GitHub: {contact.github}</span>
        </div>
      </header>

      {/* 2. AI分析セクション */}
      <ResumeSection title="AI Assessment">
        <AIAssessmentBlock assessment={aiAssessment} />
      </ResumeSection>
      
      {/* 3. 職務経歴 */}
      <ResumeSection title="Work Experience">
        {experiences.map((exp, index) => (
          <ExperienceBlock key={index} experience={exp} />
        ))}
      </ResumeSection>

      {/* 4. スキルセット */}
      <ResumeSection title="Technical Skills">
        <SkillTags skills={skills} />
      </ResumeSection>

      {/* 他のセクション (学歴など) は省略 */}

    </div>
  );
};

// 使い方: <ResumePreview data={dummyData} />
// エクスポートして実際のアプリケーションで使用