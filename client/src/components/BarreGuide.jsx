const customStyle = {
    borderColor: "rgb(255, 162, 49)",
    fontSize: "14px",
    color: "rgb(255, 162, 49)",
}
export default function BarrGuide({ step1, step2, step3, step4 }) {
    return <div className="d-flex justify-content-around mt-1">
        <div className="barre-guide" style={step1 && customStyle}>Cart</div>
        <div className="barre-guide" style={step2 && customStyle}>Informations</div>
        <div className="barre-guide" style={step3 && customStyle}>Payment Method</div>
        <div className="barre-guide" style={step4 && customStyle}>Order</div>

    </div>
}