const stats = [
  { number: "20+", label: "Years Experience" },
  { number: "500+", label: "Projects Completed" },
  { number: "100+", label: "Happy Clients" },
  { number: "24/7", label: "Support Available" },
];

const StatsSection = () => {
  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
