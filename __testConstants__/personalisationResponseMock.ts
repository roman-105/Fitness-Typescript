export const personalisationResponseMock = {
  questions: [
    {
      question: 'Question 1 Onboarding',
      answer: '6Iaa08o8FJa2ztoWqGuUkv'
    },
    {
      question: 'Question 2 Onboarding',
      answer: 'KEecS026hZbjGGBPVQ8CR'
    },
    {
      question: 'Question 3 Onboarding',
      answer: '4ofASsQFrcJBjTofK698ji'
    },
    {
      question: 'Question 4 Onboarding',
      answer: {
        height: 180,
        weight: 80
      }
    },
    {
      question: 'Question 5 Onboarding',
      answer: ['3LjD0m5tTXEOQQmbX6pum9', '35J4fnm3mtuFHeDkYriA9A', '4qsY6MUEsahVK94NEd7k6E']
    }
  ]
};

export const personalisationQuestionsResponseMock = [
  {
    id: '68KFZF99N8yfbAhG1EtBJI',
    administrativeTitle: 'Question 3 Onboarding',
    question: 'How active are you on a daily basis?',
    explaination:
      'To get workouts and programs with the right level of difficulty, select the option that most closely matches you. This information will help us to calculate your calorie needs as well.',
    type: 'Slider',
    answerOptions: [
      {
        title: 'Inactive',
        description: 'Student or desk job, sitting most of the time during the day',
        id: '2AMW6H3MvEG6UYNlN0GGlI'
      },
      {
        title: 'Lightly active',
        description: 'Your job includes walking around sometimes, e.g. teacher or salesman',
        id: '5CVIkarws1Oqf6OjO6wepA'
      },
      {
        title: 'Moderately active',
        description:
          'You are walking around during the day and sometimes you break a little sweat, e.g. hairdresser or kindergarden teacher',
        id: '4nGYKuI9DZgNumgUwRF8nq'
      },
      {
        title: 'Active',
        description: 'You are on your feet most of the time, e.g. waitress or mailman',
        id: '4ofASsQFrcJBjTofK698ji'
      },
      {
        title: 'Very active',
        description: 'You have a very physical job, e.g. bike messenger or construction worker',
        id: '3aaxhPtLlfIxeYr5neBV4E'
      }
    ]
  },
  {
    id: '7pAguZUK5KyH41dv0Gnb0D',
    administrativeTitle: 'Question 1 Onboarding',
    question: 'What is your personal goal?',
    explaination:
      "We will recommend Training, Nutrition and Lifestyle content regarding the goal that you choose. Don't worry, you can always change it later!",
    type: 'Single Select',
    answerOptions: [
      {
        title: 'Lose weight',
        description: "You want to get rid of those extra kilo's",
        image: {
          url:
            'https://images.ctfassets.net/ztnn01luatek/7LUYsogFgBgvARGC2LOPkH/47b5f0456afc6f811ff6a82acf9eac0f/BF_Toolkit_Icons_50x50_WeightLoss.png'
        },
        id: '3wimJqNaB27pi133VUFdSe'
      },
      {
        title: 'Get stronger',
        description: 'You want to build muscle in an healthy way',
        image: {
          url:
            'https://images.ctfassets.net/ztnn01luatek/6eNlVzda8ktQrbQ19w3SJU/073c79496a59219a246bff1ffc30f9f4/BF_Toolkit_Icons_50x50_GetStronger.png'
        },
        id: '6Iaa08o8FJa2ztoWqGuUkv'
      },
      {
        title: 'Get fitter',
        description: 'You want to get (back) in action to improve your daily activities',
        image: {
          url:
            'https://images.ctfassets.net/ztnn01luatek/23OuPX6xu2oxVHIZQxTZUC/63c030f599cd85fc35d189914a42da88/BF_Toolkit_Icons_50x50_GetFit.png'
        },
        id: '2ougCW8BjTF9MR36SWi777'
      },
      {
        title: 'Improve performance',
        description: 'As an athlete, you want to improve your sport performance',
        image: {
          url:
            'https://images.ctfassets.net/ztnn01luatek/7nZqcpXrSu3HsnNe9vTjGN/3ee5afb037abbf130e67015c87f65ae6/BF_Toolkit_Icons_50x50_Performance.png'
        },
        id: '2Cb0LVpPTDdCa2ZcRz0U6V'
      },
      {
        title: 'Get toned',
        description: 'You want to have a firm body with shaped curves',
        image: {
          url:
            'https://images.ctfassets.net/ztnn01luatek/3RVwnreriN4dvvit3ilDg1/0a0f6cd8ebcb4053856a177a1173259b/BF_Toolkit_Icons_50x50_ShapeTone.png'
        },
        id: '2JzVHS3tm6IU7TVP6VyrUR'
      }
    ]
  },
  {
    id: '2YXgGXYV5q4hkULeAs1wkc',
    administrativeTitle: 'Question 5 Onboarding',
    question: 'What are your fitness preferences?',
    explaination: 'We will select the best content regarding your preferences',
    type: 'Multiple Select',
    answerOptions: [
      {
        title: 'Quick workouts',
        id: '2olujJOA23kfGnKl0R2LoH'
      },
      {
        title: 'Running',
        id: '4Ka0UytEgzUyxnfwWTj00J'
      },
      {
        title: 'Relaxation/Stress relief',
        id: '3jbIMTApidwdRP87xszpnC'
      },
      {
        title: 'Recipes/Healthy food',
        id: '3LjD0m5tTXEOQQmbX6pum9'
      },
      {
        title: 'Cycling',
        id: '4qsY6MUEsahVK94NEd7k6E'
      },
      {
        title: 'Home fitness',
        id: '35J4fnm3mtuFHeDkYriA9A'
      },
      {
        title: 'Group exercises',
        id: '4OicNq11ikRHKkojkNHskG'
      },
      {
        title: 'Personal training',
        id: '4ZCehkrBW7EkKXK9fNygyd'
      }
    ]
  },
  {
    id: 'O9t0MY6OBF9fhdbJxjD2b',
    administrativeTitle: 'Question 4 Onboarding',
    question: 'What is your height and your weight?',
    explaination:
      'It is important to enter your current measurements so you can check your progress in the future and to get the right amount of calories',
    type: 'Height and Weight'
  },
  {
    id: '6GJY688wYapJ081rSbtfXU',
    administrativeTitle: 'Question 2 Onboarding',
    question: 'What is your fitness experience?',
    explaination:
      'Knowing your fitness experience will allow us to show you training content that suits you best.',
    type: 'Single Select',
    answerOptions: [
      {
        title: 'Beginner',
        description: 'I have never been in a gym (or not on regular basis)',
        id: '2odgSqWId7PMUyFaAeJpxC'
      },
      {
        title: 'Intermediate',
        description:
          'I have been to the gym a few times in the last 6 months and I have basic knowledge about equipment and how to perform exercises',
        id: 'KEecS026hZbjGGBPVQ8CR'
      },
      {
        title: 'Advanced',
        description:
          'The gym has been my home for the past 6 months (or more). I love fitness and I know how everything works!',
        id: '6EUMFkwTfT7vp1ZftFu0Qy'
      }
    ]
  },
  {
    id: '2Fr50rR5XZSSbHfOoBs0Re',
    administrativeTitle: 'Test',
    question: 'Test',
    explaination: 'TEst',
    type: 'Single Select',
    answerOptions: [{}]
  }
];
