var Language = function (name, code, direction, lorem, loremShort) {
  return {
    name: name,
    code: code,
    direction: direction,
    lorem: lorem
  }
};

var languages = [
  new Language('English', 'en', 'ltr', {
    long: 'Lorem ipsum dolor sit amet, ferri conclusionemque eum et. Ei accusata invenire convenire nam. Ad sit lorem ubique ceteros, probo illum consulatu no duo, nam laudem quaeque ne. Ne ius amet deleniti quaestio.',
    short: 'Lorem ipsum dolor sit amet, ferri conclusionemque eum et'
  }),
  new Language('Arabic', 'ar', 'rtl', {
    long: 'من المسرح والنرويج دون, احداث وتتحمّل والفرنسي كل بلا, حتى ٣٠ بقعة ا الفرنسية. مما ديسمبر العمليات الشّعبين ٣٠, لان في التنازلي استطاعوا. حادثة المتحدة عن وفي. أمام وحرمان دون تم. الغالي الثقيلة ذات ثم, فكانت الدولارات حين أي.',
    short: 'العمليات الشّعبين ٣٠, لان في التنازلي استطاعوا. حادثة المتحدة'
  }),
  new Language('Hebrew', 'he', 'rtl', {
    long: 'את מדע כלשהו למאמרים. וקשקש אנגלית אם רבה. זאת התוכן למחיקה גם, של מתן העזרה ייִדיש. הבקשה טבלאות בלשנות ויש את, מה יוני למחיקה משופרות שער, גם היא שפות ברוכים ביוטכנולוגיה. לראות גרמנית קלאסיים קרן את.',
    short: 'משופרות שער, גם היא שפות ברוכים ביוטכנולוגיה'
  })
];

module.exports = {
  languages: languages
};
