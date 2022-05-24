class Servers {
	private static instance: Servers;

	public static get Instance(): Servers {
		return this.instance || (this.instance = new Servers());
	}
}

export default Servers.Instance;
