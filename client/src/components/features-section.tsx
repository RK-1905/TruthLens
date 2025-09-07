import { Shield, TrendingUp } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";

export default function FeaturesSection() {
  const features = [
    {
      icon: <SiGoogle className="w-6 h-6 text-white" />,
      title: "Natural Language AI",
      description: "Leverages Google Cloud's Natural Language API to understand context, sentiment, and extract key entities from content."
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: "Source Verification",
      description: "Cross-references claims with trusted sources using advanced search and machine learning algorithms."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      title: "Credibility Scoring",
      description: "Real-time credibility analysis with detailed breakdowns and confidence intervals for informed decisions."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by Google Cloud AI</h2>
          <p className="text-xl text-muted-foreground">Advanced machine learning models for comprehensive fact-checking</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover-lift" data-testid={`feature-${index}`}>
              <CardContent className="p-6">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
