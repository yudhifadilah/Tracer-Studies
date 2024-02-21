import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Divider, Input, Label, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import ProfileCompletionForm from "./ProfileComplate";

interface SurveyFormProps {
  onSubmit: (answers: Record<string, string>) => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit }) => {
  const { data: session } = useSession();
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!session || !session.user.token) {
      return;
    }

    // Mock API endpoint for survey questions (replace with your actual API endpoint)
    const apiUrl = "https://localhost:8080/api/Bekerja";

    const fetchSurveyQuestions = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setQuestions(data.questions);
        } else {
          console.error("Error fetching survey questions from API");
        }
      } catch (error) {
        console.error("Error fetching survey questions", error);
      }
    };

    fetchSurveyQuestions();
  }, [session]);

  const handleInputChange = (question: string, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      // Mock API endpoint for submitting survey responses (replace with your actual API endpoint)
      const apiUrl = "https://localhost:8080/api/Bekerja";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers,
        }),
      });

      if (response.ok) {
        // Call the onSubmit callback to handle any additional logic
        onSubmit(answers);
      } else {
        console.error("Error submitting survey responses to API");
      }
    } catch (error) {
      console.error("Error submitting survey responses", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleProfileCompletion = () => {
    // Set a flag indicating that the user has completed their profile
    setProfileCompleted(true);
  };

  if (!profileCompleted) {
    return <ProfileCompletionForm onComplete={handleProfileCompletion} />;
  }

  if (questions.length === 0) {
    return <Spinner />;
  }

  return (
    <Card>
      <CardBody>
        {questions.map((question) => (
          <div key={question} className="form-control">
            <Label>{question}</Label>
            <Input
              isRequired
              type="text"
              placeholder="Enter your answer"
              onChange={(e) => handleInputChange(question, e.target.value)}
            />
            <Divider />
          </div>
        ))}
      </CardBody>
      <Divider />
      <Button color="primary" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Survey"}
      </Button>
    </Card>
  );
};

export default SurveyForm;
