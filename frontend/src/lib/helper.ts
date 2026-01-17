export function formatIDR(value: string | number, withRp = true) {
  // Convert to string and remove any non-digit characters
  const cleanValue = String(value).replace(/\D/g, '');
  
  // If empty after cleaning → return empty or zero
  if (!cleanValue) return withRp ? "Rp0" : "IDR 0";
  
  // Convert to number and format with dot as thousand separator
  const number = Number(cleanValue);
  const formatted = number.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  return withRp ? `Rp${formatted}` : `IDR ${formatted}`;
}