export type EquipmentCategory =
  | "treadmill"
  | "elliptical"
  | "exercise-bike"
  | "rowing-machine"
  | "home-gym"
  | "weight-bench"
  | "strength-machine"
  | "stepper"
  | "cross-trainer"
  | "other";

export const CATEGORY_LABELS: Record<EquipmentCategory, string> = {
  "treadmill": "Treadmill",
  "elliptical": "Elliptical Trainer",
  "exercise-bike": "Exercise Bike",
  "rowing-machine": "Rowing Machine",
  "home-gym": "Home Gym",
  "weight-bench": "Weight Bench",
  "strength-machine": "Strength Machine",
  "stepper": "Stepper / Stair Climber",
  "cross-trainer": "Cross Trainer",
  "other": "Fitness Equipment",
};

export const CATEGORY_ICONS: Record<EquipmentCategory, string> = {
  "treadmill": "🏃",
  "elliptical": "🔄",
  "exercise-bike": "🚴",
  "rowing-machine": "🚣",
  "home-gym": "🏋️",
  "weight-bench": "💪",
  "strength-machine": "⚙️",
  "stepper": "🪜",
  "cross-trainer": "❄️",
  "other": "🏅",
};
