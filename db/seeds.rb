require 'csv'
Woman.destroy_all
Book.destroy_all
puts 'Creating users...'
# user1 = User.create(username: 'Dana', password: '12345', profile_image: 'https://avatars.githubusercontent.com/u/105557320?v=4')
# user2 = User.create(username: 'Sam', password: '12345', profile_image: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png')
user3 = User.create(username: 'Lana', password: 'abc', profile_image: 'https://cdn-icons-png.flaticon.com/512/194/194938.png')
user4 = User.create(username: 'Bob', password: 'abc', profile_image: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png')
user5 = User.create(username: 'James', password: 'abc', profile_image: 'https://cdn-icons-png.flaticon.com/512/147/147142.png')
puts 'Creating women...'
CSV.foreach('db/womeninstem.csv', headers: true) do |row|
    Woman.create(
        name: row[1], 
        details: row[2],
        image_path: row[3],
        website: row[6]
    )
end

puts 'Creating books...'
CSV.foreach('db/womeninstembooks.csv', headers: true) do |row|
    Book.create(
        title: row[1], 
        author: row[2],
        purchase: row[3],
        book_image: row[4]
    )
end
puts 'Creating my collection...'
# collection1 = MyCollection.create(name: "Xiaoyuan Tu", details:"Xiaoyuan Tu is a co-founder and lead scientist at AiLive Inc. (formerly iKuni Inc.), a Silicon Valley based start-up company focusing on AI effects for computer entertainment. She received her Ph.D degree (96') in Computer Science from the University of Toronto and the Honors M.Eng degree in Electrical and Computer Engineering from McMaster University. Her Honors B.Eng degree was in Control Theory and Automation from TsingHua University in China. Prior to co-founding AiLive, Dr. Tu was a research scientist in the Media and Graphics Research Lab at Intel Corp. from 1997 to 2000 During 1996 and 1997, she was a senior member of the technical staff at SGI. Dr. Tu has received many honors and awards for her technical contributions to the fields of computer animation, behavioral modeling and artificial life. In 1996 she received the prestigious ACM Doctoral Dissertation Award for her Ph.D dissertation \"Artificial Animals for Computer Animation: Biomechanics, Locomotion, Perception, and Behavior\". Although other women have won the runner-up Dissertation Award, Dr. Tu is the first (and currently only) woman to be awarded the first-place Dissertation Award. She also happens to be the first to win from a Canadian University and the first Chinese to receive this special honor. In 1994 she received the Technical Excellence Award from the Canadian Academy of Multimedia and Arts and from 1993 to 1995 her animation work was honored in numerous premier competetions for creative science with digital media, including the Siggraph Electronic Theatre, the Ars Electronica and the Computer Animation Film Festival. Dr. Tu's main research interests are in the modeling, control and simulation of life-like, intelligent virtual characters. Her research spans the areas of autonomous agent architecture design, physics and biomechanics-based modeling, machine learning, computer graphics animation and artificial life.",website: "http://www.dgp.toronto.edu/~tu/",image_path: "http://www.dgp.toronto.edu/~tu/me.jpg")

puts 'Creating books...'


puts 'wishlist...'
# wishlist1 = Wishlist.create(book_image: 'https://m.media-amazon.com/images/I/41zYaFIKQ-L._SX322_BO1,204,203,200_.jpg', purchase: 'https://www.amazon.com/African-American-Women-Pioneers-History/dp/B09VX2BNGS/ref=sr_1_1?crid=1W1I15H7YB62B&keywords=women+in+stem+children+book&qid=1670537272&sprefix=women+in+stem+children+book%2Caps%2C88&sr=8-1')