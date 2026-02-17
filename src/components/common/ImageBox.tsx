import './ImageBox.css'

type ImageBoxProps = {
    imageSrc: string;
    altText: string;
}

export default function ImageBox({ imageSrc, altText }: ImageBoxProps) {
    return (
    <>
        <div className="image-box">
            <img src={imageSrc} alt={altText} className="image" />
        </div>
    </>
    )
}
