module.exports = [
  'PostalAddress',
  'GeoCoordinates',
  'Place',
  // Place Subclasses
  'Accommodation',
  // Place > Accommodation Subclasses;
  'Apartment',
  'CampingPitch',
  'House',
  // Place > Accommodation > House Subclasses;
  'SingleFamilyResidence',
  // Place > Accommodation continued...
  'Room',
  // Place > Accommodation > Room Subclasses;
  'HotelRoom',
  'MeetingRoom',
  // Place > Accommodation continued...
  'Suite',
  // Place continued...
  'AdministrativeArea',
  // Place > Administrative Area Subclasses;
  'City',
  'Country',
  'State',
  // Place continued...
  'CivicStructure',
  // Place > Administrative Area Subclasses;
  'Airport',
  'Aquarium',
  'Beach',
  'Bridge',
  'BusStation',
  'BusStop',
  'Campground',
  'Cemetery',
  'Crematorium',
  'EventVenue',
  'FireStation',
  'GovernmentBuilding',
  'Hospital',
  'MovieTheater',
  'Museum',
  'MusicVenue',
  'Park',
  'ParkingFacility',
  'PerformingArtsTheater',
  'PlaceOfWorship',
  'Playground',
  'PoliceStation',
  'PublicToilet',
  'RVPark',
  'StadiumOrArena',
  'SubwayStation',
  'TaxiStand',
  'TrainStation',
  'Zoo',
  // Place continued...
  'Landform',
  // Place > Landform Subclasses;
  'BodyOfWater',
  // Place > Landform > Body of Water Subclasses;
  'Canal',
  'LakeBodyOfWater',
  'OceanBodyOfWater',
  'Pond',
  'Reservoir',
  'RiverBodyOfWater',
  'SeaBodyOfWater',
  'Waterfall',
  // Place > Landform continued...
  'Continent',
  'Mountain',
  'Volcano',
  // Place continued...
  'LandmarksOrHistoricalBuildings',
  'LocalBusiness',
  // Place > Local Business Subclasses;
  'AnimalShelter',
  'ArchiveOrganiser',
  'AutomotiveBusiness',
  // Place > Local Business > Automotive Business Subclasses;
  'AutoBodyShop',
  'AutoDealer',
  'AutoPartsStore',
  'AutoRental',
  'AutoRepair',
  'AutoWash',
  'GasStation',
  'MotorcycleDealer',
  'MotorcycleRepair',
  // Place > Local Business continued...
  'ChildCard',
  'Dentist',
  'DryCleaningOrLaundry',
  'EmergencyService',
  // Place > Local Business > Emergency Services Subclasses;
  'FireStation',
  'Hospital',
  'PoliceStation',
  // Place > Local Business continued...
  'EmploymentAgency',
  'EntertainmentBusiness',
  // Place > Entertainment Business Subclasses;
  'AdultEntertainment',
  'AmusementPark',
  'ArtGallery',
  'Casino',
  'ComedyClub',
  'MovieTheater',
  'NightClub',
  // Place > Local Business continued...
  'FinancialService',
  // Place > Financial Service Subclasses;
  'AccountingService',
  'AutomatedTeller',
  'BankOrCreditUnion',
  'InsuranceAgency',
  // Place > Local Business continued...
  'FoodEstablishment',
  // Place > Food Establishment Subclasses;
  'Bakery',
  'BarOrPub',
  'Brewery',
  'CafeOrCoffeeShop',
  'Distillery',
  'FastFoodRestaurant',
  'IceCreamShop',
  'Restaurant',
  'Winery',
  // Place > Local Business continued...
  'GovernmentOffice',
  // Place > Government Office Subclasses;
  'PostOffice',
  // Place > Local Business continued...
  'HealthAndBeautyBusiness',
  // Place > Health and Beauty Business Subclasses;
  'BeautySalon',
  'DaySpa',
  'HairSalon',
  'HealthClub',
  'NailSalon',
  'TattooParlor',
  // Place > Local Business continued...
  'HomeAndConstructionBusiness',
  // Place > Home and Construction Business Subclasses;
  'Electrician',
  'GeneralContractor',
  'HVACBusiness',
  'HousePainter',
  'Locksmith',
  'MovingCompany',
  'Plumber',
  'RoofingContractor',
  // Place > Local Business continued...
  'InternetCafe',
  'LegalService',
  // Place > Legal Service Subclasses;
  'Attorney',
  'Notary',
  // Place > Local Business continued...
  'Library',
  'LodgingBusiness',
  // Place > Lodging Subclasses;
  'BedAndBreakfast',
  'Campground',
  'Hostel',
  'Hotel',
  'Motel',
  'Resort',
  // Place > Local Business continued...
  'MedicalBusiness',
  // Place > Medical Business Subclasses;
  'CommunityHealth',
  'Dentist',
  'Dermatology',
  'DietNutrition',
  'Emergency',
  'Geriatric',
  'Gynecologic',
  'MedicalClinic',
  'Midwifery',
  'Nursing',
  'Obstetric',
  'Oncologic',
  'Optician',
  'Optometric',
  'Otolaryngologic',
  'Pediatric',
  'Pharmacy',
  'Physician',
  'Physiotherapy',
  'PlasticSurgery',
  'Podiatric',
  'PrimaryCare',
  'Psychiatric',
  'PublicHealth',
  // Place > Local Business continued...
  'ProfessionalService',
  'RadioStation',
  'RealEstateAgent',
  'RecyclingCenter',
  'SelfStorage',
  'ShoppingCenter',
  'SportsActivityLocation',
  // Place > Medical Business Subclasses;
  'BowlingAlley',
  'ExerciseGym',
  'GolfCourse',
  'HealthClub',
  'PublicSwimmingPool',
  'SkiResort',
  'SportsClub',
  'StadiumOrArena',
  'TennisComplex',
  // Place > Local Business continued...
  'Store',
  // Place > Store Subclasses;
  'AutoPartsStore',
  'BikeStore',
  'BookStore',
  'ClothingStore',
  'ComputerStore',
  'ConvenienceStore',
  'DepartmentStore',
  'ElectronicsStore',
  'Florist',
  'FurnitureStore',
  'GardenStore',
  'GroceryStore',
  'HardwareStore',
  'HobbyShop',
  'HomeGoodsStore',
  'JewelryStore',
  'LiquorStore',
  'MensClothingStore',
  'MobilePhoneStore',
  'MovieRentalStore',
  'MusicStore',
  'OfficeEquipmentStore',
  'OutletStore',
  'PawnShop',
  'PetStore',
  'ShoeStore',
  'SportingGoodsStore',
  'TireShop',
  'ToyStore',
  'WholesaleStore',
  // Place > Local Business continued...
  'TelevisionStation',
  'TouristInformationCenter',
  'TravelAgency',
  // Place continued...
  'Residence',
  // Place > Residence Subclasses;
  'ApartmentComplex',
  'GatedResidenceCommunity',
  // Place continued...
  'TouristAttraction',
  'TouristDestination',
];
