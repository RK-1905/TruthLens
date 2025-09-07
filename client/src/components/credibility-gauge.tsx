interface CredibilityGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function CredibilityGauge({ score, size = "md", showLabel = true }: CredibilityGaugeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-chart-3"; // Green
    if (score >= 50) return "text-chart-4"; // Yellow
    return "text-destructive"; // Red
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return "High Credibility";
    if (score >= 50) return "Moderate Credibility";
    return "Low Credibility";
  };

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-40 h-40",
  };

  const strokeDasharray = `${score}, 100`;

  return (
    <div className="relative inline-block">
      <svg
        className={`${sizeClasses[size]} transform -rotate-90`}
        viewBox="0 0 36 36"
        data-testid="credibility-gauge"
      >
        {/* Background circle */}
        <path
          className="text-muted"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        {/* Progress circle */}
        <path
          className={getScoreColor(score)}
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeDasharray={strokeDasharray}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={`text-2xl font-bold ${getScoreColor(score)}`} data-testid="score-value">
            {score}%
          </div>
          {showLabel && (
            <div className="text-xs text-muted-foreground">Credible</div>
          )}
        </div>
      </div>
      {showLabel && (
        <div className={`text-center mt-2 text-sm font-semibold ${getScoreColor(score)}`} data-testid="score-label">
          {getScoreLabel(score)}
        </div>
      )}
    </div>
  );
}
