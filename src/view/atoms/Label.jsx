export default function Label({ className = '', ...rest }) {
  return <label className={`text-sm font-semibold text-gray-700 ${className}`} {...rest} />;
}
