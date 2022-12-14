const names = {
    "đļ": "musical_notes",
    "đŦ": "clapper_board",
    "đ°": "money_bag",
    "đ": "party_popper",
    "â": "red_question_mark",
    "â¨": "sparkles",
    "đĒ": "pinata",
    "đĒ": "magic_wand",
    "đ˛": "dragon_face",
    "đ": "dragon_face_wukko",
    "đ¸": "money_with_wings",
    "âī¸": "gear",
    "âšī¸": "frowning_face",
    "đ": "clipboard",
    "đ": "pumpkin",
    "đ": "christmas_tree",
    "đ¯ī¸": "candle",
    "đē": "cat",
    "đļ": "dog"
}
let sizing = {
    22: 0.4,
    30: 0.7,
    48: 0.9
}
export default function(emoji, size, disablePadding) {
    if (!size) size = 22;
    let padding = size !== 22 ? `margin-right:${sizing[size] ? sizing[size] : "0.4"}rem;` : ``;
    if (disablePadding) padding = 'margin-right:0!important;';
    if (!names[emoji]) emoji = "â";
    return `<img class="emoji" height="${size}" width="${size}" style="${padding}" alt="${emoji}" src="emoji/${names[emoji]}.svg">`
}
