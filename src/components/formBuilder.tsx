// File: src/pages/FormBuilder.tsx
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 4rem 2rem;
  background: #0e101c;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  gap: 3rem;
`;

const Content = styled.div`
  flex: 2;
  max-width: 500px;
`;

const SchemaBox = styled.pre`
  flex: 1;
  background: #181b2f;
  padding: 1.5rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  color: #00f5d4;
  overflow: auto;
  white-space: pre-wrap;
  max-height: 600px;
  box-shadow: 0 0 0 1px #222;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 2.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const RequiredMark = styled.span`
  color: #ff4d4f;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #333;
  background: #1b1e2b;
  color: #fff;
`;

const Select = styled.select`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #333;
  background: #1b1e2b;
  color: #fff;
`;

const Error = styled.span`
  font-size: 0.75rem;
  color: #ff4d4f;
  margin-top: 0.3rem;
`;

const Button = styled.button`
  padding: 0.9rem;
  background: #00f5d4;
  color: #000;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #0ff;
  }
`;

const schema = [
  {
    name: "username",
    label: "Username",
    type: "text",
    required: true
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: ["Admin", "Editor", "Viewer"]
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true
  }
];

export default function FormBuilder() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    schema.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <Wrapper>
      <Content>
        <Title>⚙️ Dynamic Form Builder</Title>
        <Description>
          This dynamic form is generated from a schema. It supports text, email, select, and password inputs. Validation is handled based on required fields.
        </Description>
        <Form onSubmit={handleSubmit}>
          {schema.map((field) => (
            <FormGroup key={field.name}>
              <Label htmlFor={field.name}>
                {field.label} {field.required && <RequiredMark>*</RequiredMark>}
              </Label>
              {field.type === "select" ? (
                <Select
                  name={field.name}
                  onChange={handleChange}
                  value={formData[field.name] || ""}
                >
                  <option value="">Select a role</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </Select>
              ) : (
                <Input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              )}
              {errors[field.name] && <Error>{errors[field.name]}</Error>}
            </FormGroup>
          ))}
          <Button type="submit">Submit</Button>
        </Form>
      </Content>
      <SchemaBox>{JSON.stringify(schema, null, 2)}</SchemaBox>
    </Wrapper>
  );
}
