import { Brain, Cloud, Search, Languages } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";

export default function GoogleCloudSection() {
  const services = [
    {
      icon: <Languages className="w-8 h-8 text-primary" />,
      title: "Natural Language AI",
      description: "Advanced text analysis and entity extraction",
      color: "bg-primary/10"
    },
    {
      icon: <Brain className="w-8 h-8 text-accent" />,
      title: "AutoML",
      description: "Custom machine learning models for fact-checking",
      color: "bg-accent/10"
    },
    {
      icon: <Search className="w-8 h-8 text-chart-3" />,
      title: "Search API",
      description: "Real-time source verification and cross-referencing",
      color: "bg-chart-3/10"
    },
    {
      icon: <Cloud className="w-8 h-8 text-chart-4" />,
      title: "Cloud Functions",
      description: "Serverless processing for scalable analysis",
      color: "bg-chart-4/10"
    }
  ];

  const pipelineSteps = [
    { icon: "📄", title: "Content Input", description: "URL or text submission" },
    { icon: "🤖", title: "AI Processing", description: "Google Cloud analysis" },
    { icon: "🔍", title: "Fact Verification", description: "Source cross-checking" },
    { icon: "📊", title: "Credibility Report", description: "Detailed analysis results" }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-4">
            <SiGoogle className="text-3xl text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Built on Google Cloud</h2>
          </div>
          <p className="text-xl text-muted-foreground">Leveraging cutting-edge AI services for maximum accuracy</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border-border hover-lift text-center" data-testid={`service-${index}`}>
              <CardContent className="p-6">
                <div className={`w-16 h-16 mx-auto mb-4 ${service.color} rounded-lg flex items-center justify-center`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integration Diagram */}
        <Card className="bg-card border-border">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-center mb-8">AI Processing Pipeline</h3>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
              {pipelineSteps.map((step, index) => (
                <div key={index} className="text-center" data-testid={`pipeline-step-${index}`}>
                  <div className="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center mb-3 mx-auto text-2xl">
                    {step.icon}
                  </div>
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  {index < pipelineSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-full transform -translate-y-1/2 translate-x-4">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
