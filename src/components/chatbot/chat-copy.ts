/**
 * Every string the chat widget shows or matches, verbatim from softsuave.com's
 * own "Soft Suave - Live Chat" widget (inspected 15 Oct 2026) — the visitor
 * talks to the same assistant, so its wording and its flow cues have to match
 * what the assistant sends.
 */
export const CHAT_COPY = {
  title: "Soft Suave - Live Chat",
  greeting: "Hey there! Let’s get started now, feel free to share what you’re looking for.",
  tooltip: "💬 Hi there! Need help?",
  unread: "You’ve got a message!",
  placeholder: "Enter your message",
  // Shown while a slot picker is open; the box stays usable there so the
  // slot prompt's "Type 'Cancel'" can be followed (BUG-034).
  lockedPlaceholder: "Pick a slot, or type 'Cancel' to quit booking",
  endConfirm: "Are you sure you want to end the session?",
  yes: "Yes",
  no: "No",
  error: "Something didn't go as expected, Kindly refresh and try again!",
  unexpected: "An unexpected error occurred. Try refreshing the page to continue",
  slotPrompt: "Alright! to discuss further, Pick a slot that's convenient for you.<br> (Type 'Cancel' to quit booking)",
  slotEditPrompt: "Go ahead and pick a different slot from the available ones!",
  slotsUnavailable: "Sorry, we couldn't load the available slots. Please try again.",
  skipForNow: "Skip for now",
  editFieldsPrompt: "Could you please select the field you want to edit?",
  micDenied: "I couldn't access your microphone. Please allow mic access, or type your message instead.",
  nothingHeard: "I didn't catch anything. Tap the mic and try again.",
  transcribeFailed: "Couldn't transcribe that, please try again.",
  voiceUnsupported: "Voice chat isn't supported in this browser. Please type your message instead.",
  voiceIdle: "Voice chat ended due to inactivity. Tap the voice button to start again.",
  voicePickSlot: "Please pick a time slot that suits you from the options above.",
  voiceStatus: {
    starting: "Starting voice chat…",
    listening: "Listening…",
    thinking: "Thinking…",
    speaking: "Speaking… tap to interrupt",
    muted: "Muted",
    paused: "Pick a slot above, or tap to talk",
  },
} as const;

/**
 * The assistant's whole-answer markers. `follow_up_needed = False` answers the
 * widget's silent `check_follow_up` probe and is never shown.
 */
export const MARKERS = {
  schedule: "{schedule_meeting = True}",
  editSlot: "{edit_slot = True}",
  noFollowUp: "{follow_up_needed = False}",
} as const;

/** Sent (unseen) after two quiet minutes, once per session. */
export const FOLLOW_UP_QUERY = "check_follow_up";

/**
 * Lines that turn an answer into a question with buttons — matched lower-cased
 * and anywhere in the answer, exactly as the live widget matches them.
 */
export const BUTTON_CUES = {
  yesno: "does everything look good? please choose an option.",
  skip: "thanks! and finally, could you provide your phone number with the country code? (e.g., +91 6380x x2619)",
  optout: "could you share the reason for cancellation? (optional, but helps us improve.)",
  editfields: "which field would you like to edit? available fields: edit_name, edit_email",
} as const;
