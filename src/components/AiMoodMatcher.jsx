import React, { useState } from 'react';
import { Sparkles, Send, Bot, AlertCircle } from 'lucide-react';
import { searchMovies } from '../services/tmdb';

const MOOD_FALLBACK_MAP = [
  { keywords: ['action', 'sad', 'revenge'], recommendation: 'John Wick' },
  { keywords: ['happy', 'comedy', 'funny', 'laugh'], recommendation: 'Paddington 2' },
  { keywords: ['scary', 'horror', 'ghost', 'spooky'], recommendation: 'A Quiet Place' },
  { keywords: ['mind', 'sci-fi', 'space', 'mind-bending', 'future'], recommendation: 'Interstellar' },
  { keywords: ['romance', 'love', 'romantic'], recommendation: 'La La Land' },
  { keywords: ['animated', 'family', 'kids'], recommendation: 'Spirited Away' },
  { keywords: ['mystery', 'detective', 'crime'], recommendation: 'Knives Out' }
];

export default function AiMoodMatcher({ onMoviesFound }) {
  const [moodPrompt, setMoodPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [suggestedTitle, setSuggestedTitle] = useState(null);

  const aiKey = import.meta.env.VITE_AI_KEY || import.meta.env.VITE_LLM_KEY;

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    if (!moodPrompt.trim()) return;

    setIsAiLoading(true);
    setAiError(null);
    setSuggestedTitle(null);

    try {
      let recommendedMovie = '';

      if (aiKey) {
        // Live LLM call if environment variable is configured
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${aiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a movie recommendation assistant. Given a user mood prompt, respond ONLY with ONE movie title string. No punctuation, no extra explanation.'
              },
              {
                role: 'user',
                content: moodPrompt
              }
            ],
            temperature: 0.7
          })
        });

        if (!response.ok) {
          throw new Error(`AI Service HTTP Error ${response.status}`);
        }

        const data = await response.json();
        recommendedMovie = (data.choices?.[0]?.message?.content || '').trim().replace(/^["']|["']$/g, '');
      } else {
        // Safe intelligent fallback mood matcher engine when API key is unconfigured
        const lowerPrompt = moodPrompt.toLowerCase();
        const matched = MOOD_FALLBACK_MAP.find((item) =>
          item.keywords.some((kw) => lowerPrompt.includes(kw))
        );

        recommendedMovie = matched ? matched.recommendation : 'Inception';
      }

      if (recommendedMovie) {
        setSuggestedTitle(recommendedMovie);
        const searchResult = await searchMovies(recommendedMovie, 1);
        if (onMoviesFound) {
          onMoviesFound(searchResult.movies, recommendedMovie);
        }
      }
    } catch (err) {
      setAiError(err.message || 'AI Mood Matcher failed to respond.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="ai-mood-card">
      <div className="ai-mood-header">
        <div className="ai-badge">
          <Sparkles size={14} aria-hidden="true" />
          <span>Phase 3 Feature</span>
        </div>
        <h3 className="ai-mood-title">AI Mood Matcher</h3>
        <p className="ai-mood-desc">
          Describe how you feel or what vibe you want, and AI will recommend the perfect movie.
        </p>
      </div>

      <form className="ai-mood-form" onSubmit={handleMoodSubmit}>
        <div className="ai-input-wrapper">
          <Bot className="ai-bot-icon" size={20} aria-hidden="true" />
          <input
            type="text"
            className="ai-mood-input"
            value={moodPrompt}
            onChange={(e) => setMoodPrompt(e.target.value)}
            placeholder="e.g. 'I feel sad but want a high-octane action thriller...'"
            aria-label="Describe your current mood for movie recommendation"
            disabled={isAiLoading}
          />
          <button
            type="submit"
            className="btn btn-ai-submit"
            disabled={isAiLoading || !moodPrompt.trim()}
            aria-label="Ask AI for movie recommendation"
          >
            {isAiLoading ? (
              <span>Analyzing...</span>
            ) : (
              <>
                <span>Match Mood</span>
                <Send size={15} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>

      {!aiKey && (
        <div className="ai-key-notice">
          <AlertCircle size={14} aria-hidden="true" />
          <span>
            <code>VITE_AI_KEY</code> unconfigured. Running in safe built-in mood recommendation mode for QA demo.
          </span>
        </div>
      )}

      {suggestedTitle && (
        <div className="ai-suggestion-result">
          <Sparkles size={16} className="sparkle-gold" aria-hidden="true" />
          <span>
            AI Recommendation: <strong>{suggestedTitle}</strong>
          </span>
        </div>
      )}

      {aiError && <p className="ai-error-text">{aiError}</p>}
    </div>
  );
}
