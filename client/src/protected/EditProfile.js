import React from "react";

import { updateProfile } from "../core/api";
import { useApi, useAuth, useForm } from "../hooks";
import { Card, Alert, Input, SubmitButton } from "../components";

export const EditProfile = () => {
  const { profileData, setProfileData } = useAuth();
  const fetchWithAuth = useApi();

  const [handleSubmit, handleChange, getValue, formStatus, validation] =
    useForm({
      initialValues: profileData,
      validate: ({ name }) => ({
        name: name ? null : "Field cannot be empty",
      }),
      onSubmit: async (input) => {
        const data = await fetchWithAuth(updateProfile, input);
        setProfileData(data);
        return "Profile saved";
      },
    });

  return (
    <>
      {formStatus.message && (
        <Alert type={formStatus.type}>{formStatus.message}</Alert>
      )}
      <Card header="Edit profile">
        <form method="post" onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3">
              <Input
                name="name"
                label="Name"
                placeholder="Enter name"
                value={getValue("name")}
                onChange={handleChange("name")}
              />
            </div>

            <div className="mb-3">
              <Input
                name="phoneNumber"
                label="Phone number"
                placeholder="Enter name"
                value={getValue("phoneNumber")}
                onChange={handleChange("phoneNumber")}
              />
            </div>
          </div>

          <SubmitButton
            disabled={!validation.ok}
            submitting={formStatus.type === "submitting"}
          >
            Save profile
          </SubmitButton>
        </form>
      </Card>
    </>
  );
};
