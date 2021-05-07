Dir[File.join(Rails.root, 'db', 'seeds', 'sample_data', '*.rb')].each do |filename|
  require filename
end

# Create main tenant
Seeds::Tenants.seed

default_locale = Tenant.first.default_locale

Admin.create!([
  {email: "admin@user.com", password: 'password', password_confirmation: 'password'}
])

User.create!([
  {email: "test@user.com", password: 'password', password_confirmation: 'password', confirmed_at: DateTime.now, locale: default_locale}
])

Writer.create!([
  {
    email: "writer@user.com", password: 'password', password_confirmation: 'password', activated: true, locale: default_locale, 
    first_name: "Writer", last_name: 'User', quote_from: '', about_description: 'About author', quote_description: 'Author quote'
  },
  {
    email: "writer2@user.com", password: 'password', password_confirmation: 'password', activated: true, locale: default_locale, 
    first_name: "Writer", last_name: 'User 2', quote_from: '', about_description: 'About author', quote_description: 'Author quote'
  }
])

Role.create!([
  {name: 'super_admin'}
])

Assignment.create!([
  {admin: Admin.first, role: Role.first}
])


Seeds::Devices.seed
Seeds::Categories.seed
Seeds::Coupons.seed
Seeds::NewsletterPackages.seed
Seeds::Packages.seed('all')
Seeds::FeaturedPackages.seed
Seeds::SubmissionPartners.seed
Seeds::Booklinks.seed
Seeds::Books.seed
Seeds::WriterDeals.seed
Seeds::BookWriters.seed
Seeds::Metadatums.seed
Seeds::Followers.seed


puts "\**************"
puts "\nDatabase seeded\n"
puts "\**************"

