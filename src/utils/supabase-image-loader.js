export default function supabaseLoader({ src, width }) {
  return `${src}?width=${width}&quality=75`;
}
