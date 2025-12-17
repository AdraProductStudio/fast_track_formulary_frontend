export default function drugsSearchValidation(params) {
  const errors = [];

  if (!params?.formularyId)
    errors.push("Formulary ID is required");

  if (!params?.label)
    errors.push("Formulary Label is required");

  return { errors };
}
