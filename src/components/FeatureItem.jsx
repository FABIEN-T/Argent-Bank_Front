export default function FeatureItem({ icon, title, paragraph }) {
  return (
    <div className="feature-item">
      <img src={icon} alt="Chat Icon" className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{paragraph}</p>
    </div>
  )
}
