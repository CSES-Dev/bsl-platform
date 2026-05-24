// Replace with real BSL leader data from Sharad.
// `location` and `coordinates` are used only by the MAPPING LEADERS map; they
// are not displayed on the MEET THE TEAM cards.

export type Leader = {
  name: string;
  title: string;
  bio: string;
  email: string;
  image: string;
  location: string;
  coordinates: [number, number]; // [lng, lat]
};

export const leaders: Leader[] = [
  {
    name: "Jane Doe",
    title: "Executive",
    bio: "Placeholder leader bio. Replace with real data.",
    email: "jane@example.com",
    image: "",
    location: "San Francisco, CA",
    coordinates: [-122.4194, 37.7749],
  },
  {
    name: "John Smith",
    title: "Operations Lead",
    bio: "Placeholder leader bio. Replace with real data.",
    email: "john@example.com",
    image: "",
    location: "New York, NY",
    coordinates: [-74.006, 40.7128],
  },
  {
    name: "Alex Chen",
    title: "Strategy Lead",
    bio: "Placeholder leader bio. Replace with real data.",
    email: "alex@example.com",
    image: "",
    location: "Seattle, WA",
    coordinates: [-122.3321, 47.6062],
  },
  {
    name: "Maya Patel",
    title: "Program Lead",
    bio: "Placeholder leader bio. Replace with real data.",
    email: "maya@example.com",
    image: "",
    location: "Austin, TX",
    coordinates: [-97.7431, 30.2672],
  },
  {
    name: "Ryan Kim",
    title: "Operations Lead",
    bio: "Placeholder leader bio. Replace with real data.",
    email: "ryan@example.com",
    image: "",
    location: "Chicago, IL",
    coordinates: [-87.6298, 41.8781],
  },
  {
    name: "Sophia Lee",
    title: "Community Lead",
    bio: "Placeholder leader bio. Replace with real data.",
    email: "sophia@example.com",
    image: "",
    location: "Los Angeles, CA",
    coordinates: [-118.2437, 34.0522],
  },
  {
    name: "Sharad Aggarwal",
    title: "Advisor",
    bio: "Placeholder leader bio. Replace with real data.",
    email: "sharad@example.com",
    image: "",
    location: "Boston, MA",
    coordinates: [-71.0589, 42.3601],
  },
];
