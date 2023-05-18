array = %w[United-Airlines Southwest-Airlines Delta Alaska-Airlines Southwest-Airlines JetBlue American-Airlines]

100.times do 
  airline = Airline.create(
    { 
      name: Faker::Company.name,
      image_url: "https://open-flights.s3.amazonaws.com/#{array.sample}.png"
    }
  )

  (1..5).to_a.sample.times do
    Review.create(
      {
          title: Faker::ProgrammingLanguage.name,
          description: Faker::Markdown.emphasis,
          score: (1..5).to_a.sample,
          airline: airline
      }
    )
  end
end