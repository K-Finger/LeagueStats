import React from 'react';

const Stats = ({ stats }) => {
  if (!stats) {
    return <p style={styles.message}>No stats showing. Try searching!</p>;
  }

  const getTextColor = (label, value) => {
    if (label.includes("CS")) {
      if (value >= 10.00) return "#257A3E"; // Deep Green - Perfect CS
      if (value >= 9.00) return "#6AFF80"; // Pastel Green - High CS
      if (value >= 8.00) return "#CAFFBF"; // Yellow-Green - Good CS
      if (value >= 7.00) return "#FDFFB6"; // Soft Yellow - Decent CS
      if (value >= 6.00) return "#FFD6A5"; // Pastel Orange - Mediocre CS
      if (value >= 4.00) return "#FFADAD"; // Pastel Red - Poor CS
      return "#8B0000"; // Deep Red - Very Poor CS
    }

    if (label.includes("Deaths")) {
      if (value < 1.00) return "#257A3E"; // Deep Green - Unkillable
      if (value < 1.50) return "#6AFF80"; // Pastel Green - Elite Survivability
      if (value < 2.00) return "#CAFFBF"; // Yellow-Green - Good Survivability
      if (value < 3.00) return "#FDFFB6"; // Soft Yellow - Mediocre Survivability
      if (value < 4.50) return "#FFADAD"; // Pastel Red - Poor Survivability
      return "#8B0000"; // Deep Red - Feeder Level
    }

    if (label.includes("Vision")) {
      if (value >= 11.00) return "#257A3E"; // Deep Green - Perfect Vision
      if (value >= 10.00) return "#6AFF80"; // Pastel Green - Excellent Vision
      if (value >= 9.00) return "#CAFFBF"; // Yellow-Green - Good Vision
      if (value >= 8.00) return "#FDFFB6"; // Soft Yellow - Decent Vision
      if (value >= 7.00) return "#FFD6A5"; // Pastel Orange - Mediocre Vision
      if (value >= 5.00) return "#FFADAD"; // Pastel Red - Poor Vision
      return "#8B0000"; // Deep Red - No Vision
    }

    return "#FFFFFF"; // Default text color
};

  const statData = [
    { label: "Deaths / 10 MIN", value: stats.average_deaths_per_min * 10 },
    { label: "CS / MIN", value: stats.average_cs_per_min },
    { label: "Vision / 10 MIN", value: stats.average_vision_score_per_min * 10 },
  ];

  return (
    <div style={styles.statsContainer}>
      {statData.map(({ label, value }, index) => (
        <div key={index} style={styles.card}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z6MZiDRi7Jes3872/database.png" 
            alt={`${label} icon`} 
            style={styles.icon}
          />
          <div style={styles.content}>
            <p style={{ ...styles.value, color: getTextColor(label, value) }}>
              {value !== undefined ? value.toFixed(2) : "N/A"}
            </p>
            <p style={styles.label}>{label}</p>
          </div>
        </div>
      ))}
    </div>
  ); 
};

const styles = {
  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    marginTop: '32px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    width: '133px',
    backgroundColor: '#2E2E38',
    borderRadius: '8px',
    gap: '16px',
    textAlign: 'center',
  },
  icon: {
    width: '40px',
    height: '40px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    width: '100%',
  },
  value: {
    fontFamily: 'Poppins, Inter, sans-serif',
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '120%',
    letterSpacing: '-0.48px',
    margin: 0,
  },
  label: {
    fontFamily: 'Poppins, Inter, sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '140%',
    color: '#FFFFFF',
    margin: 0,
  },
  message: {
    fontFamily: 'Poppins, Inter, sans-serif',
    fontSize: '16px',
    color: '#888',
    marginTop: '20px',
  },
};


export default Stats;
