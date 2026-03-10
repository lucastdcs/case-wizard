// src/modules/notes/notes-styles.js

// --- CONFIGURAÇÃO DE CORES (Google Official Branding) ---
export const COLORS = {
  blue: "#4285F4",
  red: "#EA4335",
  yellow: "#FBBC05",
  green: "#34A853",
  primary: "#1a73e8",       // Azul Interativo Google
  primaryBg: "#e8f0fe",     // Fundo Azul Claro
  text: "#202124",          // Preto Google
  textSub: "#5f6368",       // Cinza Texto
  border: "#dadce0",        // Borda Padrão
  bgInput: "#f8f9fa",       // Fundo Input (Cinza Gelo)
  surface: "#ffffff",       // Branco Puro
  success: "#34A853",
  warning: "#FBBC05",
  error: "#EA4335"
};

// --- CONSTANTES DE DESIGN (Apple & Material) ---
export const RADIUS = {
  small: "8px",
  medium: "12px",
  large: "20px",
  pill: "100px"
};

export const SHADOW = {
  subtle: "0 1px 3px rgba(0,0,0,0.08)",
  card: "0 4px 12px rgba(0,0,0,0.05)",
  elevated: "0 12px 24px rgba(0,0,0,0.08)",
  apple: "0 20px 40px rgba(0,0,0,0.12)"
};

// Curva de Animação "Líquida" (Apple Style)
export const EASE = "cubic-bezier(0.25, 1, 0.3, 1)";

// =========================================================
//           INPUTS & TEXTAREAS (Interativos)
// =========================================================
export const styleInput = {
  width: "100%",
  padding: "14px 16px", // Aumentado para mais respiro
  borderRadius: RADIUS.medium,
  border: `1.5px solid ${COLORS.border}`, // Borda levemente mais definida
  backgroundColor: COLORS.bgInput,
  fontSize: "14px",
  color: COLORS.text,
  marginBottom: "16px",
  boxSizing: "border-box",
  fontFamily: "'Google Sans', 'Roboto', sans-serif",
  transition: `all 0.25s ${EASE}`,
  outline: "none",
};

export const styleTextarea = {
  ...styleInput,
  minHeight: "120px", // Aumentado
  resize: "vertical",
  lineHeight: "1.6",
};

// =========================================================
//           TEXTOS & LABELS
// =========================================================
export const styleH3 = {
  fontSize: "12px",
  fontWeight: "700",
  color: COLORS.textSub,
  textTransform: "uppercase",
  letterSpacing: "1px",
  margin: "0 0 16px 0",
};

export const styleLabel = {
  display: "block",
  fontSize: "14px",
  fontWeight: "600",
  color: COLORS.text,
  marginBottom: "10px",
  marginTop: "20px",
};

export const styleWarningText = {
  fontSize: "12px",
  color: COLORS.warning, // Usando amarelo Google
  marginTop: "8px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: "500",
};

// =========================================================
//           LISTAS & CHECKBOXES (Cards)
// =========================================================
export const styleCheckboxInput = {
  width: "18px",
  height: "18px",
  marginRight: "12px",
  cursor: "pointer",
  accentColor: COLORS.primary,
};

export const styleCheckboxLabel = {
  display: "flex",
  alignItems: "center",
  marginBottom: "12px",
  fontSize: "14px",
  fontWeight: "500",
  color: COLORS.text,
  cursor: "pointer",
  padding: "16px 20px", // Bem mais espaçoso
  backgroundColor: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  borderRadius: RADIUS.large, // Bem arredondado
  transition: `all 0.3s ${EASE}`,
  userSelect: "none",
  boxShadow: SHADOW.subtle,
};

// =========================================================
//           BOTÕES (Ações)
// =========================================================
export const styleButtonBase = {
  padding: "14px 28px",
  color: "#fff",
  backgroundColor: COLORS.primary,
  border: "none",
  borderRadius: RADIUS.pill,
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 14px 0 rgba(26,115,232,0.39)",
  transition: `all 0.2s ${EASE}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  outline: "none",
};

export const styleOptionalBtn = {
  width: "100%",
  padding: "12px",
  background: "#FFFFFF",
  border: `1.5px dashed ${COLORS.primary}`,
  color: COLORS.primary,
  borderRadius: RADIUS.medium,
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "13px",
  marginBottom: "16px",
  transition: `all 0.2s ${EASE}`,
};

export const styleLinkButton = {
  background: "transparent",
  border: `1px solid ${COLORS.border}`,
  borderRadius: RADIUS.pill,
  color: COLORS.textSub,
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
  padding: "10px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  margin: "20px auto",
  transition: `all 0.2s ${EASE}`,
};
