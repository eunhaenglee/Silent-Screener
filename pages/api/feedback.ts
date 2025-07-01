// pages/api/feedback.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: true, // 기본 바디 파서 활성화
  },
};

type FeedbackResponse = {
  score?: number;
  flow?: string;
  examples?: boolean;
  improvement?: string;
  suggestion?: string;
  error?: string;
  raw?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FeedbackResponse>
) {
  if (req.method !== 'POST') {
    return res.setHeader('Allow', ['POST']).status(405).end();
  }

  const { answer, lang, mode } = req.body as {
    answer: string;
    lang: 'en' | 'jp';
    mode: 'single' | 'summary';
  };

  // ---- Prompt 생성부 (기존 그대로) ----
  const prompt =
    lang === 'jp'
      ? mode === 'summary'
        ? `
あなたは優秀な日本語の面接コーチです。
以下は候補者が全ての質問に対して答えた内容です。
全体を総合的に評価してください。
出力は**必ず以下のJSON形式**で返してください：

{
  "score": 数値 (0〜100),
  "flow": "全体の論理展開に関する1文のコメント",
  "examples": true または false,
  "improvement": "全体としての改善点を1文で",
  "suggestion": "全体を改善する模範的な回答例"
}

回答全文：
${answer}

JSON形式のみを返してください。説明や追加のテキストは不要です。
`
        : `
あなたは優秀な日本語の面接コーチです。
以下の面接質問と回答を評価してください。
出力は**必ず以下のJSON形式**で返してください：

{
  "score": 数値 (0〜100),
  "flow": "論理展開に関する1文のコメント",
  "examples": true または false,
  "improvement": "改善点を1文で",
  "suggestion": "改善された回答例"
}

質問と回答：
${answer}

JSON形式のみを返してください。説明や追加のテキストは不要です。
`
      : mode === 'summary'
      ? `
You are an expert English interview coach.
Below is the full set of answers from the candidate.
Please provide an overall evaluation and summary feedback.

Return your response in the following **strict JSON format**:

{
  "score": number (0-100),
  "flow": "1 sentence comment on overall logical flow",
  "examples": true or false,
  "improvement": "1 sentence advice for overall improvement",
  "suggestion": "an improved version of the entire response"
}

Full answers:
${answer}

Please return only valid JSON. No extra text or explanations.
`
      : `
You are an expert English interview coach.
Evaluate the following single question and answer.

Return your response in this **strict JSON format**:

{
  "score": number (0-100),
  "flow": "1 sentence comment on logical flow",
  "examples": true or false,
  "improvement": "1 sentence advice",
  "suggestion": "a revised example answer"
}

Question and Answer:
${answer}

Please return only valid JSON. No extra text or explanations.
`;

  // ---- OpenAI (Groq) 호출부 ----
  const aiResponse = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
      }),
    }
  );

  if (!aiResponse.ok) {
    console.error('🛑 Groq API error', await aiResponse.text());
    return res.status(502).json({ error: 'Upstream AI service error' });
  }

  const data = await aiResponse.json();
  const content = data.choices?.[0]?.message?.content;

  // ---- JSON 파싱 및 응답 ----
  try {
    const parsed = JSON.parse(content as string);
    return res.status(200).json(parsed);
  } catch (err) {
    console.error('❌ Failed to parse AI output:', content);
    return res.status(500).json({ error: 'Invalid AI JSON', raw: content });
  }
}
