let revId = 0;

export const getReviews = () => {
    return ([
        {
            id: revId++,
            date: "April 1, 2020",
            user: "Pietro",
            text: "Se n'immundo ci fosse un po di bene, e ciashun si honsiderasse suo fratello, ci sarebbero meno pensieri e meno pene, e il mondo ne sarebbe assai piu' bello."
        },
        {
            id: revId++,
            date: "April 1, 2020",
            user: "Vanni",
            text: "Vivaiddushe, illavhoro, e la liberta'! Rithorneremo! Prima o dopho!"
        },
        {
            id: revId++,
            date: "April 1, 2020",
            user: "President",
            text: "@Pietro Bene Bene noi hondividiamo ma ora siamo davanti alla corte d'assise e lei e' imputato di sedishi omicidi allora..."
        },
    ]);
};

export default getReviews;