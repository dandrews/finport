# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

10.times do |i|
  params = {
    title: "Article #{i}",
    content: "Content #{i}: Nam sed nunc libero. Phasellus mollis justo vitae quam fringilla gravida. Integer hendrerit neque id erat condimentum eu iaculis est sagittis. Etiam quis turpis vel ipsum convallis pulvinar a sit amet felis. Etiam dolor ipsum, tincidunt ac pretium ut, tincidunt non odio. Suspendisse placerat vestibulum libero, quis vulputate velit ultrices quis. Donec purus magna, vulputate vitae fringilla eget, accumsan quis lorem. Etiam et orci arcu, nec sollicitudin ante. Sed ornare sagittis lacus non adipiscing. Aenean a enim neque, quis vestibulum eros. Mauris eget sem erat. Proin vel purus at urna lacinia sollicitudin. Nulla faucibus nibh quis odio condimentum eu gravida lorem imperdiet. Praesent fermentum, purus ac auctor lobortis, purus enim rutrum lorem, volutpat sollicitudin lacus orci ut urna. Cras placerat justo at leo fringilla quis vestibulum felis venenatis. Curabitur et nisi sed nibh mattis commodo.",
    source: "http://www.google.com/#{i}"
  }
  Article.create(params)
end
